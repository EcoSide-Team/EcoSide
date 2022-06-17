FROM node:lts-alpine AS source

WORKDIR /app

RUN yarn global add turbo

COPY . .

RUN turbo prune --scope=@ecoside/client --docker


FROM node:lts-alpine AS build

WORKDIR /app

COPY --from=source /app/out/json/ .
COPY --from=source /app/out/yarn.lock .

RUN yarn install --frozen-lockfile

COPY --from=source /app/out/full/ .

RUN yarn turbo run build --scope=@ecoside/client --include-dependencies --no-deps


FROM nginx:latest AS serve

COPY ./apps/client/nginx.conf /etc/nginx/nginx.conf

COPY --from=build /app/apps/client/build/ /usr/share/nginx/html