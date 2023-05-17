FROM node:18-buster AS deps
WORKDIR /app

COPY ./package.json ./yarn.lock ./
RUN yarn install --pure-lockfile

FROM node:18-buster AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY ./ .

# ----- SONARQUBE ---
ARG version=1.0.0
ARG BuildSourceBranchName=refs/heads/master
# in case of PR builds substitute ARG BuildSourceBranchName with the 3 ARG below
ARG PRPullRequestId
ARG PRSourceBranch
ARG PRTargetBranch
ARG TeamProject
ARG RepositoryName
ARG CollectionUri
ARG sonarprojectkey
ARG sonarlogin

RUN yarn test
RUN yarn sonar

ARG yarnBuildCommand
RUN $yarnBuildCommand

FROM node:18-buster AS runner
WORKDIR /app

COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./.next/standalone

EXPOSE 3000
ENV PORT 3000

CMD ["yarn", "start"]