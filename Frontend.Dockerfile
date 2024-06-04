FROM amazon/aws-cli:2.16.0 AS aws-diva-login
WORKDIR /app

ENV AWS_ACCESS_KEY_ID=AKIAQ3EGPXNUL5NWASF2
ENV AWS_SECRET_ACCESS_KEY=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
ENV AWS_DEFAULT_REGION=eu-central-1

RUN export CODEARTIFACT_AUTH_TOKEN=`aws codeartifact get-authorization-token --domain deltatre-diva --domain-owner 058264107880 --region eu-central-1 --query authorizationToken --output text` && \
    echo "${CODEARTIFACT_AUTH_TOKEN}" > ./aws-diva-token.txt

FROM node:22.2.0-alpine3.20 AS deps
WORKDIR /app

COPY ./package.json ./yarn.lock ./
COPY --from=aws-aws-diva-login /app/aws-diva-token.txt ./aws-diva-token.txt  

# Add authentication to .yarnrc.yml file for azuredevops npm custom packages
ARG token
ARG Yarnrc=".yarnrc.yml"
RUN export CODEARTIFACT_AUTH_TOKEN=$(cat ./aws-diva-token.txt) && \
  echo "nodeLinker: node-modules" >> ${Yarnrc} && \
  echo "npmScopes:" >> ${Yarnrc} && \
  echo "  d3-forge:" >> ${Yarnrc} && \
  echo "    npmAlwaysAuth: true" >> ${Yarnrc} && \
  echo "    npmAuthToken: ${token}" >> ${Yarnrc} && \
  echo "    npmRegistryServer: 'https://alm.deltatre.it/tfs/D3Alm/_packaging/platforms.team.webplu/npm/registry/'" >> ${Yarnrc} && \
  echo "  deltatre-vxp:" >> ${Yarnrc} && \
  echo "    npmAlwaysAuth: true" >> ${Yarnrc} && \
  echo "    npmAuthToken: ${CODEARTIFACT_AUTH_TOKEN}" >> ${Yarnrc} && \
  echo "    npmRegistryServer: 'https://deltatre-diva-058264107880.d.codeartifact.eu-central-1.amazonaws.com/npm/Diva/'" >> ${Yarnrc}
# End .yarnrc.yml auth

RUN corepack enable && \
  yarn set version 4.2.2 && \
  yarn install --immutable

FROM node:22.2.0-alpine3.20 AS tests
WORKDIR /app
RUN corepack enable
RUN yarn set version 4.2.2
COPY --from=deps /app/node_modules ./node_modules
COPY ./ .
COPY --from=deps /app/.yarnrc.yml ./.yarnrc.yml

RUN yarn test
RUN rm -rf ./.yarnrc.yml

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
