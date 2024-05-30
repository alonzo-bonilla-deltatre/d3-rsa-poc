FROM node:22.2.0-alpine3.20 AS deps
WORKDIR /app

COPY ./package.json ./yarn.lock ./

# Add authentication to .yarnrc.yml file for azuredecops npm custom packages
ARG Yarnrc=".yarnrc.yml"
RUN echo "npmScopes:" >> ${Yarnrc} && \
  echo "  d3-forge:" >> ${Yarnrc} && \
  echo "    npmAlwaysAuth: true" >> ${Yarnrc} && \
  echo "    npmAuthIdent: RDNBbG06Z2VjM2liYWh6dWdkbTdwM3prejZ3amNlNGNhb2x6ZmlmZGRkY3J4amR2aTRpMm9zM2JkcQ==" >> ${Yarnrc} && \
  echo "    npmRegistryServer: 'https://alm.deltatre.it/tfs/D3Alm/_packaging/platforms.team.webplu/npm/registry/'" >> ${Yarnrc} && \
  echo "  deltatre-vxp:" >> ${Yarnrc} && \
  echo "    npmAuthIdent: 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" >> ${Yarnrc} && \
  echo "    npmRegistryServer: 'https://npm.pkg.github.com/'" >> ${Yarnrc}
# End .yarnrc.yml auth

RUN corepack enable
RUN yarn set version 4.2.2
RUN yarn install

FROM node:22.2.0-alpine3.20 AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY ./ .

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

RUN corepack enable
RUN yarn set version 4.2.2
RUN yarn test
RUN yarn sonar

RUN yarn cross-env NODE_ENV='production' VERSION=$version next build

FROM node:22.2.0-alpine3.20 AS runner
WORKDIR /app

COPY --from=builder /app/next.config.js ./
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/node_modules ./node_modules

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
