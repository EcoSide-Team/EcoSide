FROM node:lts-alpine AS source

WORKDIR /app

RUN yarn global add turbo

COPY . .

RUN turbo prune --scope=@ecoside/ui --docker


FROM node:lts-alpine AS build

WORKDIR /app

COPY --from=source /app/out/json/ .
COPY --from=source /app/out/yarn.lock .

RUN yarn install --frozen-lockfile

COPY --from=source /app/out/full/ .

WORKDIR /app/packages/ui

RUN yarn build-storybook


FROM nginx:latest AS serve

COPY --from=build /app/packages/ui/storybook-static/ /usr/share/nginx/html