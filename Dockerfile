FROM node:alpine
WORKDIR /usr/src/app
COPY package*.json ./
COPY . .
RUN touch .env
RUN echo "PORT=8080" >> .env
RUN echo "URL=https://ruby.motortruck1221.tech" >> .env
RUN yarn
EXPOSE 8080
CMD [ "yarn", "prod" ]