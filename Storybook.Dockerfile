FROM node:18-alpine as npm-base
WORKDIR /storybook

COPY ./ ./

RUN yarn install --frozen-lockfile --silent &> /dev/null && \
    yarn run build-storybook

FROM nginx:alpine
COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=npm-base /storybook/storybook-static /usr/share/nginx/html