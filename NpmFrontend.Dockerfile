FROM node:22.2.0-alpine3.20 AS builder
WORKDIR /app

COPY ./ .

RUN corepack enable
RUN yarn set version 4.2.2
RUN yarn install --immutable

RUN mkdir -p /npm/src/prd_node_modules

RUN cp -r /app/node_modules/*  /npm/src/prd_node_modules/