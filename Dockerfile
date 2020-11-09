FROM node:carbon

WORKDIR /usr/src/app

COPY ./package*.json ./

RUN npm install

RUN npm install -g nodemon

COPY . .

EXPOSE 20000
CMD [ "npm","start" ]