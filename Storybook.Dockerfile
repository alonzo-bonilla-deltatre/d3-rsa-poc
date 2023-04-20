FROM node:18-alpine as npm-base
WORKDIR /storybook

COPY ./ ./

RUN yarn install --frozen-lockfile --silent && \
    yarn run build-storybook

FROM nginx:alpine
COPY --from=npm-base /storybook/storybook-static /usr/share/nginx/html