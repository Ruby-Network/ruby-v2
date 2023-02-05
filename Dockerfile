FROM node:alpine
WORKDIR /usr/src/app
COPY package*.json ./
COPY . .
RUN yarn
RUN yarn build
EXPOSE 8080
CMD [ "yarn", "start" ]