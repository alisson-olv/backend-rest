FROM node:20.13.1

WORKDIR /backend

RUN rm -rf node_modules

COPY package*.json ./

RUN npm install 

COPY . .

CMD ["npm","run", "start"]

EXPOSE 3000
