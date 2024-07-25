FROM node:22.2.0-alpine3.20 AS deps
WORKDIR /app

RUN corepack enable && \
  yarn set version 4.3.1

RUN apk add --no-cache aws-cli

ARG token
ARG Yarnrc=".yarnrc.yml"

RUN echo "nodeLinker: node-modules" >> ${Yarnrc}

RUN yarn config set npmScopes.d3-forge.npmRegistryServer "https://alm.deltatre.it/tfs/D3Alm/_packaging/platforms.team.webplu/npm/registry/"
RUN yarn config set npmScopes.d3-forge.npmAuthToken ${token}
RUN yarn config set npmScopes.d3-forge.npmAlwaysAuth "true"

ARG AWS_ACCESS_KEY_ID
ARG AWS_SECRET_ACCESS_KEY
ARG AWS_DEFAULT_REGION
ENV AWS_ACCESS_KEY_ID=${AWS_ACCESS_KEY_ID}
ENV AWS_SECRET_ACCESS_KEY=${AWS_SECRET_ACCESS_KEY}
ENV AWS_DEFAULT_REGION=${AWS_DEFAULT_REGION}

RUN aws codeartifact login --tool npm --domain deltatre-diva --domain-owner 058264107880 --repository Diva

RUN yarn config set npmScopes.deltatre-vxp.npmRegistryServer "https://deltatre-diva-058264107880.d.codeartifact.eu-central-1.amazonaws.com/npm/Diva/"
RUN export CODEARTIFACT_AUTH_TOKEN=`aws codeartifact get-authorization-token --domain deltatre-diva --domain-owner 058264107880 --region eu-central-1 --query authorizationToken --output text` && \
    yarn config set npmScopes.deltatre-vxp.npmAuthToken ${CODEARTIFACT_AUTH_TOKEN}
RUN yarn config set npmScopes.deltatre-vxp.npmAlwaysAuth "true"

COPY ./package.json ./yarn.lock ./

RUN yarn install --immutable

FROM node:22.2.0-alpine3.20 AS tests
WORKDIR /app
RUN corepack enable
RUN yarn set version 4.2.2
COPY --from=deps /app/node_modules ./node_modules
COPY ./ .
COPY --from=deps /app/.yarnrc.yml ./.yarnrc.yml

RUN yarn test

FROM node:22.2.0 AS sonar
WORKDIR /app
RUN corepack enable
RUN yarn set version 4.2.2
COPY --from=deps /app/node_modules ./node_modules
COPY ./ .
COPY --from=deps /app/.yarnrc.yml ./.yarnrc.yml
COPY --from=tests /app/test-report.xml ./test-report.xml

# ----- SONARQUBE ---
ARG version=1.0.0
ARG BuildSourceBranchName=refs/heads/master
# in case of PR builds substitute ARG BuildSourceBranchName with the 3 ARG below
ARG PRPullRequestId
ARG PRSourceBranch
ARG PRTargetBranch
ARG TeamProject
ARG RepositoryName
ARG CollectionUri
ARG sonarprojectkey
ARG sonarlogin
ARG version

RUN yarn sonar

FROM node:22.2.0-alpine3.20 AS builder
WORKDIR /app
RUN corepack enable
RUN yarn set version 4.2.2
COPY --from=deps /app/node_modules ./node_modules
COPY ./ .
COPY --from=deps /app/.yarnrc.yml ./.yarnrc.yml

ARG version=1.0.0
ARG version

RUN yarn cross-env NODE_ENV='production' VERSION=$version next build

FROM node:22.2.0-alpine3.20 AS runner
WORKDIR /app

# Install bash
RUN apk add --no-cache bash

COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=deps /app/node_modules ./node_modules

RUN adduser \
  --disabled-password \
  --home /app \
  --gecos '' \
  --uid 10001 \
  app \
  && chown -R app /app
USER app

EXPOSE 3000
ENV PORT 3000

ENV NODE_OPTIONS='--require dd-trace/init'

CMD ["node", "server.js"]
