# fcc-classroom-mode

## Architecture 

The application currently has a react frontend and an express backend.  The frontend is located inside of the the '/client' folder, while the backend is located inside of the '/server' folder.   Both the client and the server run as seperate web applications, which means that they each have a separate server. The react server is runs on port 8080, while the express server runs on port 8081. 

The react server proxies requests to the express server (see /client/package.json to see how the proxy is defined). 

## Installation Instructions

`npm run setup` to install both server and client applications dependencies.

If running on cloud9, you must rename the .env.development.cloud9 as .env.development.  Note that you should not commit this file to github.  It should be disabled when deploying to a productoin environment 

To run the application, you must start both the client and the server: 

`npm run dev` to start both servers

Or you may run the below script in separate terminals
```
npm run server
```

```
npm run client
```

Setup Database Configuration
```
cp server/config/secret.js.example server/config/secret.js
```

Run Test
```
npm test
```

