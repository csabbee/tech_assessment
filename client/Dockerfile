FROM node:20-alpine as setup
LABEL authors="Csaba Valyi"

WORKDIR /app

COPY ./client/package.json .

RUN npm i

FROM setup as build

WORKDIR /app

COPY ./client/src ./src
COPY ./client/index.html .
COPY ./client/tsconfig.json .
COPY ./client/vite.config.ts .
COPY ./design-tokens ./design-tokens

RUN npm run build

FROM node:20-alpine

WORKDIR /app

COPY ./client/package-serve.json ./package.json
COPY --from=build /app/dist ./dist

RUN npm i

RUN sed -i"" -e 's+fetch("/search+fetch("/assignment/search+g' /app/dist/assets/index*.js

CMD ["npm", "run", "serve"]
