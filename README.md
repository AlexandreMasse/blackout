# Blackout

### :iphone: :desktop_computer: :iphone:

This project is a multi-player and cross-device game experiment about net neutrality.

Made with :heart: and :
- [React](https://reactjs.org/)
- [Redux](https://redux.js.org/)
- [Pixi](http://www.pixijs.com/)
- [Node](https://nodejs.org/en/)
- [SocketIO](https://socket.io/)


## Installation

### Client

1. Go to `client/` folder
 
2. Install dependencies

    ``` bash
    yarn install
    ```

3. Run app
    
    ``` bash
    yarn start
    ```
 
### Server

1. Go to `server/` folder

2. Install dependencies

    ``` bash
    yarn install
    ```

3. Run server

    ``` bash
    yarn server
    ```

### Client / Server

> Optional : If you want to run client and server with one command follow this step

1. Go to `/` folder

2. Install dependencies

    ``` bash
    yarn install
    ```
    
3. Run client and server

    ``` bash
    yarn dev
    ```


## Deploy

### Client

1. Go to `client/` folder
 
2. Build app 

    ``` bash
    yarn build
    ```

### Server

1. Go to `server/` folder

2. Build server

    ``` bash
    yarn build
    ```
    
3. Commit your changes (and your build folder)

4. Go to `/` folder

5. Push build folder to heroku

    ``` bash
    git subtree push --prefix server/build heroku master
    ```
    