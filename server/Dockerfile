FROM node:21.2.0-alpine3.18
RUN mkdir /app
WORKDIR /app
COPY . .
RUN npm install
EXPOSE 5000
CMD [ "npm", "start"]
