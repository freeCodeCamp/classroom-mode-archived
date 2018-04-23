# FCC Classroom Mode

_Proudly built by:_

<a href="https://www.freecodecamp.org/"><img src="https://raw.githubusercontent.com/freeCodeCamp/assets/master/assets/logos/600x72%20Free%20Code%20Camp%20logo%20for%20Medium%20publication.png" title="Free Code Camp" width=350/></a>

## Architecture

The application currently has a react frontend and an express backend.  The frontend is located inside of the the '/client' folder, while the backend is located inside of the '/server' folder.   Both the client and the server run as seperate web applications, which means that they each have a separate server. The react server is runs on port 8080, while the express server runs on port 8083. 

The react server proxies requests to the express server (see /client/package.json to see how the proxy is defined). 

## Install

`npm run setup` to install both server and client applications dependencies.

If running on cloud9, you must rename the .env.development.cloud9 as .env.development. Note that you should not commit this file to github.  It should be disabled when deploying to a productoin environment 

To run the application, you must start both the client and the server: 

`npm run dev` to start both servers

Or you may run the below script in separate terminals
```bash
npm run server
```

```bash
npm run client
```

Setup Database Configuration
```bash
cp server/variables.env.sample server/variables.env
```

Run Test
```bash
npm test
```

## Contributors

We welcome pull requests from freeCodeCamp campers (our students) and seasoned JavaScript developers alike! See the list of [contributors](https://github.com/freeCodeCamp/classroom-mode/contributors) who participated in writing this tool. 

To get started the first thing you're going to want to do is fork this repository over to your personal github.

Next, go ahead and clone the repo from your repository locally. From there you have two steps: 

```bash
git remote add upstream https://github.com/freeCodeCamp/classroom-mode.git
```

Then go ahead fetch the changes.

```bash
git fetch upstream
```

Afterward, you will want to create a new branch locally with `git checkout -b BRANCHNAME`

When you're done and ready for a pull request fetch and merge anything that's been done on the upstream/master into your newly created `BRANCHNAME` and resolve any merge conflicts.
