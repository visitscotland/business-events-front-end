# Business Events Bloomreach Integration Proof of Concept

## Setup

Make sure to install the dependencies:

```bash
# npm
npm install
```

## Development Server

Start the development server on `http://localhost:3000`

```bash
npm run dev
```

## Dependencies 

This project depends on a local site running an instance of the dot com brxm project, with the resource api enabled. It should contain a .env file pointing to the api on that instance, for example:

```bash
VUE_APP_BRXM_ENDPOINT=http://localhost:8080/site/resourceapi
```
