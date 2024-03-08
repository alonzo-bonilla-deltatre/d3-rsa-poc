FROM node:20-slim AS builder
WORKDIR /app

COPY ./package.json ./yarn.lock ./.yarnrc.yml ./

RUN yarn set version berry && \
    yarn install

RUN mkdir -p /npm/src/prd_node_modules

RUN cp -r /app/node_modules/*  /npm/src/prd_node_modules/