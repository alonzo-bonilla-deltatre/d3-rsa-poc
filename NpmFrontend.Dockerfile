FROM amazon/aws-cli:2.16.0 AS aws-login
WORKDIR /app

ENV AWS_ACCESS_KEY_ID=AKIAQ3EGPXNUL5NWASF2
ENV AWS_SECRET_ACCESS_KEY=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
ENV AWS_DEFAULT_REGION=eu-central-1

RUN export CODEARTIFACT_AUTH_TOKEN=`aws codeartifact get-authorization-token --domain deltatre-diva --domain-owner 058264107880 --region eu-central-1 --query authorizationToken --output text`
RUN echo "CODEARTIFACT_AUTH_TOKEN: ${CODEARTIFACT_AUTH_TOKEN}"
RUN echo "${CODEARTIFACT_AUTH_TOKEN}" > ./aws-token.txt

FROM node:22.2.0-alpine3.20 AS builder
WORKDIR /app

COPY ./package.json ./yarn.lock ./
COPY --from=aws-login /app/aws-token.txt ./aws-token.txt
RUN export CODEARTIFACT_AUTH_TOKEN=$(cat ./aws-token.txt) && echo $CODEARTIFACT_AUTH_TOKEN

# Add authentication to .yarnrc.yml file for azuredevops npm custom packages
ARG token
ARG deltatreVxpGitHubToken
ARG Yarnrc=".yarnrc.yml"
RUN echo "nodeLinker: node-modules" >> ${Yarnrc} && \
  echo "npmScopes:" >> ${Yarnrc} && \
  echo "  d3-forge:" >> ${Yarnrc} && \
  echo "    npmAuthToken: ${token}" >> ${Yarnrc} && \
  echo "    npmRegistryServer: 'https://alm.deltatre.it/tfs/D3Alm/_packaging/platforms.team.webplu/npm/registry/'" >> ${Yarnrc}
# End .yarnrc.yml auth

RUN yarn config set npmRegistryServer "https://deltatre-diva-058264107880.d.codeartifact.eu-central-1.amazonaws.com/npm/Diva/"
RUN yarn config set 'npmRegistries["https://deltatre-diva-058264107880.d.codeartifact.eu-central-1.amazonaws.com/npm/Diva/"].npmAuthToken' "${CODEARTIFACT_AUTH_TOKEN}"
RUN yarn config set 'npmRegistries["https://deltatre-diva-058264107880.d.codeartifact.eu-central-1.amazonaws.com/npm/Diva/"].npmAlwaysAuth' "true"

RUN corepack enable && \
  yarn set version 4.2.2 && \
  yarn install --immutable

RUN mkdir -p /npm/src/prd_node_modules

RUN cp -r /app/node_modules/*  /npm/src/prd_node_modules/
RUN cp -r /app/.yarnrc.yml  /npm/.yarnrc.yml