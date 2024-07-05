FROM node:latest

WORKDIR /backend

RUN rm -rf node_modules

COPY package*.json ./

RUN npm install 

COPY . .

CMD ["npm","run", "start"]

EXPOSE 3000
