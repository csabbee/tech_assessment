FROM node:20-alpine
LABEL authors="csabbee"

ENV PORT=3333

WORKDIR /app

COPY ./backend ./backend
COPY ./client ./client
COPY ./design-tokens ./design-tokens

COPY ./package.json ./
COPY ./package-lock.json ./
COPY ./tsconfig.json ./

RUN npm i
RUN npm run build -w backend
RUN npm run build -w client

CMD ["npm", "run", "serve"]
