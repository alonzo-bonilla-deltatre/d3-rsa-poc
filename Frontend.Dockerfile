FROM node:22.2.0-alpine3.20 AS deps
WORKDIR /app

COPY ./package.json ./yarn.lock ./

ARG npm_image
FROM $npm_image as npm-install
COPY --from=npm-install ./npm/src/prd_node_modules ./node_modules
COPY --from=npm-install ./npm/.yarnrc.yml ./.yarnrc.yml

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
