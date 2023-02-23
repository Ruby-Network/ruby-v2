# How to get setup with the project

## Getting started

### Prerequisites

- [ ] [Install Node.js](https://nodejs.org/en/download/)
- [ ] [Install npm](https://www.npmjs.com/get-npm)
- [ ] [Install yarn](https://yarnpkg.com/getting-started/install)
- [ ] [Install git](https://git-scm.com/downloads)
(If you are on Windows, you can use [Git Bash](https://gitforwindows.org/) instead of the default command prompt)
- Alternativley you can install node and npm using nvm
  - Windows: [nvm-windows](https://github.com/coreybutler/nvm-windows)
  - Linux And Mac: [nvm](Ohttps://github.com/nvm-sh/nvm)

### Setup

 #### For developers
- [ ] Clone the repository using
    ```bash
        git clone https://github.com/ruby-network/ruby
    ```
- [ ] Change directory to the cloned repository
    ```bash
        cd ruby
    ```
- [ ] Install yarn using
    ```bash
        npm install -g yarn
    ```
- [ ] Install the dependencies using
    ```bash
        yarn install
    ```
- [ ] Run the project using
    ```bash
        yarn prod
    ```
- [ ] To modify the frontend only, run
    ```bash
        yarn dev
    ```
- [ ] To modify the backend and frontend, run
    ```bash
        yarn prod
    ```
    - this builds the frontend and starts the server
- [ ] To build the frontend only, run
    ```bash
        yarn build
    ```
- [ ] To start the server only without building the frontend, run
    ```bash
        yarn start
    ```





#### For contributors
- [ ] Fork the repository
- [ ] Make a new branch for your changes
- [ ] Make your changes
- [ ] Commit and push your changes to your fork
- [ ] Make a pull request to the ruby-v2 repository
- [ ] Remember to follow contribution guidelines and code of conduct

The developers section has some information for contributors as well, but it is not necessary to follow it if you are not a developer.

