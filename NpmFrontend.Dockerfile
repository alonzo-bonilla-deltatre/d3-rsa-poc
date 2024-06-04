FROM node:22.2.0-alpine3.20 AS builder
WORKDIR /app

COPY ./package.json ./yarn.lock ./

# Add authentication to .yarnrc.yml file for azuredevops npm custom packages
ARG token
ARG deltatreVxpToken
ARG Yarnrc=".yarnrc.yml"
RUN echo "nodeLinker: node-modules" >> ${Yarnrc} && \
  echo "npmScopes:" >> ${Yarnrc} && \
  echo "  d3-forge:" >> ${Yarnrc} && \
  echo "    npmAuthToken: ${token}" >> ${Yarnrc} && \
  echo "    npmRegistryServer: 'https://alm.deltatre.it/tfs/D3Alm/_packaging/platforms.team.webplu/npm/registry/'" >> ${Yarnrc} && \
  echo "  deltatre-vxp:" >> ${Yarnrc} && \
  echo "    npmAuthToken: $deltatreVxpToken" >> ${Yarnrc} && \
  echo "    npmRegistryServer: 'https://npm.pkg.github.com/'" >> ${Yarnrc}
# End .yarnrc.yml auth

RUN cat ./.yarnrc.yml

RUN corepack enable && \
  yarn set version 4.2.2 && \
  yarn install --immutable
RUN rm -rf ./.yarnrc.yml

RUN mkdir -p /npm/src/prd_node_modules

RUN cp -r /app/node_modules/*  /npm/src/prd_node_modules/