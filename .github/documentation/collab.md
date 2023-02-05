# How to get setup with the project

## Getting started

### Prerequisites

- [ ] [Install Node.js](https://nodejs.org/en/download/)
- [ ] [Install npm](https://www.npmjs.com/get-npm)
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
- [ ] Install the dependencies using
    ```bash
        npm install
    ```
- [ ] Run the project using
    ```bash
        npm start
    ```
To chnage the website looks:
 - [ ] Git clone the ruby-static repository using
    ```bash
        git clone https://github.com/ruby-network/ruby-static
    ```
- [ ] Change directory to the cloned repository
    ```bash
        cd ruby-static
    ```
- [ ] Install the dependencies using
    ```bash
        npm install
    ```
    - [ ] Switch back to the ruby directory which you cloned earlier

    - [ ] Install the static files using
    ```bash
        npm i (path to ruby-static directory)
    ```
    - [ ] Run the project using
    ```bash
        npm start
    ```
    Any chnages you make to the ruby-static directory will be reflected in the website automatically as long as the project is running
- [ ] Open the browser and go to http://localhost:8080

When you are done making changes:

- [ ] In the ruby-static directory git add, commit and push your changes

- [ ] In the ruby directory first make sure to run
```bash
    npm i github:ruby-network/ruby-static
```
- [ ] Then to make sure you're changes are reflected in our CI

```bash
    rm -rf node_modules/
```
```bash
    rm package-lock.json
```
```bash
    npm i
```
After this you can commit and push your changes to the ruby repository

#### For contributors
- [ ] Fork the repository
- [ ] Make a new branch for your changes
- [ ] Make your changes
- [ ] Commit and push your changes to your fork
- [ ] Make a pull request to the ruby repository and or the ruby-static repository
- [ ] Remeber to follow contribution guidelines and code of conduct

The developers section has some information for contributors as well, but it is not necessary to follow it if you are not a developer.

