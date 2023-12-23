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


### Customization
If you want to customize the configuration of the backend a `.env` file needs to be created in the `backend` directory:
```
THEMOVIEDB_API_KEY=you_api_key
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
For me this was just a preference really. I like the material UI design/look, and I've know about React MUI for a while now.

### Backend
#### Testing
While I was doing some research regarding what library/testing framework is the best for testing nodejs applications,
I found out that NodeJs has a [full fledged test runner](https://nodejs.org/docs/latest-v20.x/api/test.html) since version 18.

They even thought about mocking/progressing the timers (`setTimeout`, `setInterval`) so testing `async` methods are really easy.


