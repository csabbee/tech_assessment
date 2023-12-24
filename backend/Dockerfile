FROM node:20-alpine as setup
LABEL authors="Csaba Valyi"

WORKDIR /app

COPY ./backend/package.json .

RUN npm i

FROM setup as build

WORKDIR /app

COPY ./backend/src ./src
COPY ./backend/.env .
COPY ./backend/tsconfig.json .

RUN npm run build

FROM node:20-alpine

WORKDIR /app

COPY --from=build /app/dist .
COPY ./backend/package-serve.json ./package.json

RUN npm i

CMD ["npm", "run", "serve"]
