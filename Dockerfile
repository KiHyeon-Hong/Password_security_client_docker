FROM node:14

WORKDIR /usr/src

COPY package*.json ./
RUN npm install
COPY . .

EXPOSE 65002

CMD [ "node", "mainController.js" ]