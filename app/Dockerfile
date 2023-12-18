FROM node:21.2.0-alpine3.18
RUN mkdir /app
WORKDIR /app
COPY . .
RUN npm install
COPY src/ src
EXPOSE 9000
CMD [ "npm", "start"]
