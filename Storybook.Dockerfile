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

COPY ./ ./

RUN yarn install --immutable
RUN yarn run build-storybook

RUN rm -f ${Yarnrc}

FROM nginx:stable-alpine AS runner
COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=deps /app/storybook-static /usr/share/nginx/html

RUN adduser \
  --disabled-password \
  --home /app \
  --gecos '' \
  --uid 10001 \
  app

RUN touch /var/run/nginx.pid && \
    chown -R app: /etc/nginx/ && \
    chown -R app: /var/cache/nginx && \
    chown -R app: /var/run/nginx.pid && \
    chown -R app: /usr/share/nginx/html

USER app

EXPOSE 8080