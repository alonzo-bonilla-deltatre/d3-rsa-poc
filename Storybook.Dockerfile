FROM node:22.2.0-alpine3.20 as npm-base
WORKDIR /storybook

COPY ./ ./

ARG npm_image
FROM $npm_image as npm-install
COPY --from=npm-install ./npm/src/prd_node_modules ./node_modules
COPY --from=npm-install ./npm/.yarnrc.yml ./.yarnrc.yml

RUN corepack enable && \
  yarn set version 4.2.2 && \
  yarn install --immutable
RUN yarn run build-storybook

FROM nginx:stable-alpine AS runner
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