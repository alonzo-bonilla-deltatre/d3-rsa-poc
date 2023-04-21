FROM node:18 as npm-base
WORKDIR /storybook

COPY ./ ./

RUN yarn install --frozen-lockfile
RUN yarn run build-storybook

FROM nginx:alpine
COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=npm-base /storybook/storybook-static/ /usr/share/nginx/html/