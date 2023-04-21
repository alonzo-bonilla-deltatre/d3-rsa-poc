FROM node:18 as npm-base
WORKDIR /storybook

COPY ./ ./

RUN yarn install --frozen-lockfile
RUN yarn run build-storybook

FROM nginx:alpine
COPY --from=npm-base /storybook/storybook-static /usr/share/nginx/html
RUN ls /usr/share/nginx/html
RUN ls /usr/share/nginx/html/sb-manager