FROM node:20.13.1

WORKDIR /backend

COPY package*.json ./

RUN npm install 

COPY . .

CMD ["npm","run", "start"]

EXPOSE 3000
