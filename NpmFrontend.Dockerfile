FROM amazon/aws-cli:2.16.0 AS aws-diva-login
WORKDIR /app

ARG AWS_ACCESS_KEY_ID
ARG AWS_SECRET_ACCESS_KEY
ARG AWS_DEFAULT_REGION
ENV AWS_ACCESS_KEY_ID=${AWS_ACCESS_KEY_ID}
ENV AWS_SECRET_ACCESS_KEY=${AWS_SECRET_ACCESS_KEY}
ENV AWS_DEFAULT_REGION=${AWS_DEFAULT_REGION}

RUN export CODEARTIFACT_AUTH_TOKEN=`aws codeartifact get-authorization-token --domain deltatre-diva --domain-owner 058264107880 --region eu-central-1 --query authorizationToken --output text` && \
    echo "${CODEARTIFACT_AUTH_TOKEN}" > ./aws-diva-token.txt

FROM node:22.2.0-alpine3.20 AS builder
WORKDIR /app

COPY ./package.json ./yarn.lock ./
COPY --from=aws-diva-login /app/aws-diva-token.txt ./aws-diva-token.txt  

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

RUN mkdir -p /npm/src/prd_node_modules

RUN cp -r /app/node_modules/*  /npm/src/prd_node_modules/
RUN cp -r /app/.yarnrc.yml  /npm/.yarnrc.yml