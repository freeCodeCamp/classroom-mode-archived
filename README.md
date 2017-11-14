# fcc-classroom-mode

## Architecture 

The application currently has a react frontend and an express backend.  The frontend is located inside of the the '/client' folder, while the backend is located inside of the '/server' folder.   Both the client and the server run as seperate web applications, which means that they each have a separate server. The react server is runs on port 8080, while the express server runs on port 8081. 

The react server proxies requests to the express server (see /client/package.json to see how the proxy is defined). 

## Installation Instructions

Inside the /client folder, run 

```
npm install
```


Inside the /server folder, run 

```
npm install
```

If running on cloud9, you must rename the .env.development.cloud9 as .env.development


To run the application, you must start both the client and the server: 

Naviagate to the /client folder, and then run

```
npm start
```

Navigate to the /server folder, and then run

```
PORT=8081 npm start
```


