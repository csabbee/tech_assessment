FROM node:20-alpine as setup
LABEL authors="Csaba Valyi"

WORKDIR /app

COPY ./client/package.json .

RUN npm i

FROM setup as build

ARG prefix

WORKDIR /app

COPY ./client/src ./src
COPY ./client/index.html .
COPY ./client/tsconfig.json .
COPY ./client/vite.config.ts .
COPY ./design-tokens ./design-tokens

ENV VITE_BACKEND_PREFIX=$prefix

RUN npm run build

FROM node:20-alpine

WORKDIR /app

COPY ./client/package-serve.json ./package.json
COPY --from=build /app/dist ./dist

RUN npm i

CMD ["npm", "run", "serve"]
