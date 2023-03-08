FROM node:alpine
WORKDIR /usr/src/app
COPY package*.json ./
COPY . .
RUN apk add --no-cache git
RUN git submodule update --init --recursive
RUN yarn
EXPOSE 8080
CMD [ "yarn", "prod" ]
