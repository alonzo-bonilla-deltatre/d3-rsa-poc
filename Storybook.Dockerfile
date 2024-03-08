FROM node:20-slim as npm-base
WORKDIR /storybook

COPY ./ ./

RUN yarn set version berry && \
    yarn install && \
    yarn run build-storybook

FROM nginx:alpine
COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=npm-base /storybook/storybook-static /usr/share/nginx/html