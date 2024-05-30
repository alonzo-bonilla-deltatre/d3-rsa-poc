FROM node:lts-alpine3.20 AS builder
WORKDIR /app

COPY ./package.json ./yarn.lock ./.yarnrc.yml ./

RUN apk update && apk add curl bash
RUN curl -o- -L https://yarnpkg.com/install.sh
RUN yarn set version stable && yarn install

RUN mkdir -p /npm/src/prd_node_modules

RUN cp -r /app/node_modules/*  /npm/src/prd_node_modules/