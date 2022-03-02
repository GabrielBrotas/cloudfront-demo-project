FROM node:16-alpine

WORKDIR /usr/src/app

COPY package*.json ./

# RUN npm install glob rimraf
RUN npm install

COPY ./ ./

RUN npm run build

EXPOSE 4000

CMD [ "node", "dist/main.js" ]

