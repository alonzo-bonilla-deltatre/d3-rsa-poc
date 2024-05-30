FROM node:22.2.0-alpine3.20 AS builder
WORKDIR /app

COPY ./package.json ./.yarn/ ./yarn.lock ./.yarnrc.yml ./

RUN yarn install

RUN mkdir -p /npm/src/prd_node_modules

RUN cp -r /app/node_modules/*  /npm/src/prd_node_modules/