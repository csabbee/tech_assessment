# Documentation

The deployed application can be reached [here](https://rpi1.sslprvy.hu/assignment/)

## Structure
The application utilizes monorepo structure and uses [npm workspaces](https://docs.npmjs.com/cli/v10/using-npm/workspaces)


## Setup for development
```bash
npm i
npm run dev
```
This will start both the `client` and the `backend` part of the application

After that you can reach the application here: [http://localhost:3000](http://localhost:3000)

### SCSS
SCSS module system is being utilized and since we are using typescript we need type definitions for them,
otherwise TS would complain that what wea are trying to import is not exported from the given file.

This is where `typed-scss-modules` comes handy, it will generate the `.d.ts` file for every `.scss` file

The only caveat right now is that you have to run it by hand when you are creating a new `scss` file
or modifying the class names

```bash
npm run build:typed-scss
```

### Customization
If you want to customize the configuration of the backend a `.env` file needs to be created in the `backend` directory:
```
THEMOVIEDB_API_KEY=your_api_key
THEMOVIEDB_URL=https://api.themoviedb.org/3
THEMOVIEDB_IMAGE_URL=https://image.tmdb.org/t/p
PORT=3000
# 2 * 60 * 1000 -> 2 min
CACHE_INVALIDATION=120000
NODE_ENV=dev
```

### Running tests
```bash
npm test
```

## Considerations

### Frontend

#### CRA vs Vite
```
CRA Pros:
- Out of the box templates
- Quick setup

CRA Cons:
- Hard to configure (practically you need an additional library: CRACO)
```
```
VITE Pros:
- Lot of different tempaltes
- Lightning fast startup time
- Much, MUCH easier to configure 
```

I wanted to use `scss` for styling and utilize its module system, but I was unable to make it work with CRA.
Eventually that's why I decided to use `Vite`

#### React MUI
For me this was just a preference really. I like the material UI design/look, and I've known about React MUI for a while now.

### Backend
#### Testing
While I was doing some research regarding what library/testing framework is the best for testing nodejs applications,
I found out that NodeJs has a [full fledged test runner](https://nodejs.org/docs/latest-v20.x/api/test.html) since version 18.

They even thought about mocking/progressing the timers (`setTimeout`, `setInterval`) so testing `async` methods are really easy.

### Future improvements
It took me more time than it should have to configure and deploy the application so a couple of things
that should have been done get to put here on the list

1. Mobile view: Right now that is nonexistent
   1. ✅ Create basic mobile view
   2. Better placement for pagination
2. A streamlined deployment process: Currently the deployment is happening by hand.
   1. ✅ Split the docker containers into client and frontend
   2. ✅ Create `docker-compose` configuration
   3. Solve the reverse proxy issue (need to replace urls in the client by hand)
3. The endpoint to get the cache statistics is [defined](https://rpi1.sslprvy.hu/assignment/cache-stats), a place where it can be viewed would be nice
4. Error handling
   1. Modify backend end point to send back error messages when something happens
   2. Display this error in place of the cache notification
5. Fix the hanging test case in `cache.test.ts` (TODO is added)
