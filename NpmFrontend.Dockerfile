FROM node:22.2.0-alpine3.20 AS builder
WORKDIR /app

COPY ./package.json ./yarn.lock ./
#COPY ./yarnrc.yml ./.yarnrc.yml

# Add authentication to .yarnrc.yml file for azuredecops npm custom packages
ARG Yarnrc=".yarnrc.yml"
ARG token
RUN echo "npmScopes:" >> ${Yarnrc} && \
  echo "  d3-forge:" >> ${Yarnrc} && \
  echo "    npmAlwaysAuth: true" >> ${Yarnrc} && \
  echo "    npmAuthIdent: ${token}" >> ${Yarnrc} && \
  echo "    npmRegistryServer: 'https://alm.deltatre.it/tfs/D3Alm/_packaging/platforms.team.webplu/npm/registry/'" >> ${Yarnrc} && \
  echo "  deltatre-vxp:" >> ${Yarnrc} && \
  echo "    npmAlwaysAuth: true" >> ${Yarnrc} && \
  echo "    npmAuthIdent: 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" >> ${Yarnrc} && \
  echo "    npmRegistryServer: 'https://npm.pkg.github.com/'" >> ${Yarnrc}
# End .yarnrc.yml auth

RUN cat ./.yarnrc.yml

RUN corepack enable
RUN yarn set version 4.2.2
RUN yarn install

RUN mkdir -p /npm/src/prd_node_modules

RUN cp -r /app/node_modules/*  /npm/src/prd_node_modules/