FROM node:21.2.0-alpine3.18
RUN mkdir /app
WORKDIR /app
COPY package.json package-lock.json .
RUN npm install
COPY . .
EXPOSE 9000
CMD [ "npm", "start"]
