FROM node:lts-alpine AS source

WORKDIR /app

RUN yarn global add turbo

COPY . .

RUN turbo prune --scope=@ecoside/api --docker


FROM node:lts-alpine AS build

WORKDIR /app

COPY --from=source /app/out/json/ .
COPY --from=source /app/out/yarn.lock .

RUN yarn install --frozen-lockfile

COPY --from=source /app/out/full/ .

RUN yarn turbo run build --scope=@ecoside/api --include-dependencies --no-deps


FROM node:lts-alpine AS server

WORKDIR /app

COPY --from=build /app .

RUN yarn install --production --frozen-lockfile

ENV PORT=4000
EXPOSE ${PORT}

CMD node apps/api/build/main.js