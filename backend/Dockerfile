FROM node:16-alpine

WORKDIR /app

COPY package*.json /app/

RUN npm install

COPY . .

ENV PORT 10000

EXPOSE ${PORT}
CMD [ "node", "index.js" ]