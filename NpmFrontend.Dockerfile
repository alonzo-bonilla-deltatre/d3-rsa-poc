FROM node:18-buster AS builder
WORKDIR /app

COPY ./package.json ./yarn.lock ./
RUN  yarn install --pure-lockfile --modules-folder prd_node_modules

RUN mkdir -p /npm/src/prd_node_modules

RUN cp -r /app/node_modules/*  /npm/src/prd_node_modules/