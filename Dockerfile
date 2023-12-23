FROM node:20-alpine
LABEL authors="csabbee"

WORKDIR /app

COPY ./backend ./backend
COPY ./client ./client
COPY ./design-tokens ./design-tokens

COPY ./package.json ./
COPY ./package-lock.json ./
COPY ./tsconfig.json ./

RUN npm i

CMD ["npm", "run", "dev"]
