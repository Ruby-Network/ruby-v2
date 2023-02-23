## Self Hosting
---
### Requirements
- [Node.js](https://nodejs.org/en/)
- [Git](https://git-scm.com/downloads)
- [Yarn](https://yarnpkg.com/getting-started/install)
- [NPM](https://www.npmjs.com/get-npm) <br>
## Installation
- Clone the repository
```bash
$ git clone https://github.com/ruby-network/ruby.git
```
- Install the dependencies
```bash
$ yarn
```
- make a copy of the `.env.example` file and rename it to `.env`
```bash
$ cp .env.example .env
```
- Edit the `.env` file and change the `URL` to the url you want to use (leave blank to disable)
- Edit the `.env` file and change the `PORT` to the port you want to use (leave blank to use 8080)
- If you just want to use the default settings you can skip this step
- Start the server
```bash
$ yarn prod
```
- Open your browser and go to `localhost:8080`
## Alternatives for Hosting
### Docker Installation
#### Requirements
- Install docker and docker-compose (if you don't have it already)
#### Installation
- Copy the docker compose example below and paste it into a file called `docker-compose.yml`
```yaml
version: '2'
services:
     ruby:
          restart: unless-stopped
          image: 'ghcr.io/ruby-network/ruby:main'
          ports:
               - 8080:8080   
          #ADVANCED ITEMS BELOW
          #env_file:
          #     - .env.docker  
          #environment:
          #     - URL=${URL}
#networks:
#  default:
#    external:
#      name: default_net
```
 - You can also just simply curl the docker-compose.yml file from github
 ```bash
$ curl https://raw.githubusercontent.com/Ruby-Network/ruby/main/docker-compose.yml > docker-compose.yml
```
- Change `<your port here>` to the port you want to use removing the `<>` around it.
- Run the docker-compose file
```bash
$ docker-compose up -d
```
#### Docker Only Installation
- Run the following command
```bash
$ docker run -d -p <your port here>:8080 --restart unless-stopped --name ruby ghcr.io/ruby-network/ruby
```
- Change `<your port here>` to the port you want to use removing the `<>` around it.
---

#### Advanced docker compose setup

- Make a .env.docker file and paste the following into it
```env
PORT=8080
URL=http://localhost:8080
```
- Change the `PORT` to the port you want to use
- Change the `URL` to the url you want to use (leave blank or delete to disable)
- Change your docker-compose.yml file to look like this
```yaml
version: '2'
services:
     ruby:
          restart: unless-stopped
          image: 'ghcr.io/ruby-network/ruby:main'
          ports:
          #    - <your port here>:8080   
          #ADVANCED ITEMS BELOW
               - ${PORT}:8080
          env_file:
               - .env.docker  
          environment:
               - URL=${URL}
#networks:
#  default:
#    external:
#      name: default_net
```
- Run the docker-compose file
```bash
$ docker-compose up -d
```
Need to use a custom network? Uncomment the networks section and change the name to the name of your network 

---
For more support join Our Discord!

[![Ruby Network Discord](https://invidget.switchblade.xyz/hzCjSFQeeZ?theme=dark)](https://discord.gg/hzCjSFQeeZ)