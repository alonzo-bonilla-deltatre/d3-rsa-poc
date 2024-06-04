FROM node:22.2.0-alpine3.20 as npm-base
WORKDIR /storybook

COPY ./ ./
RUN rm -rf ./.yarnrc.yml

# Add authentication to .yarnrc.yml file for azuredevops npm custom packages
ARG token
ARG deltatreVxpToken
ARG Yarnrc=".yarnrc.yml"
RUN echo "nodeLinker: node-modules" >> ${Yarnrc} && \
  echo "npmScopes:" >> ${Yarnrc} && \
  echo "  d3-forge:" >> ${Yarnrc} && \
  echo "    npmAlwaysAuth: true" >> ${Yarnrc} && \
  echo "    npmAuthIdent: $(echo -n ${token} | base64)" >> ${Yarnrc} && \
  echo "    npmRegistryServer: 'https://alm.deltatre.it/tfs/D3Alm/_packaging/platforms.team.webplu/npm/registry/'" >> ${Yarnrc} && \
  echo "  deltatre-vxp:" >> ${Yarnrc} && \
  echo "    npmAuthToken: $(echo -n ${deltatreVxpToken} | base64)" >> ${Yarnrc} && \
  echo "    npmRegistryServer: 'https://npm.pkg.github.com/'" >> ${Yarnrc}
# End .yarnrc.yml auth

RUN corepack enable && \
  yarn set version 4.2.2 && \
  yarn install --immutable
RUN yarn run build-storybook

FROM nginx:stable-alpine
COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=npm-base /storybook/storybook-static /usr/share/nginx/html

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