# Business Events Bloomreach Integration Proof of Concept

## Dependencies 

This project depends on a local site running an instance of the dot com brxm project, with the resource api enabled (current working branch https://github.com/visitscotland/dot-com-brxm/tree/business-events-2024 ). It should contain a .env file pointing to the api on that instance, for example:

```bash
VUE_APP_BRXM_ENDPOINT=http://businessevents.local:8080
```

## Setup

Make sure to install the dependencies:

```bash
# yarn
npm install
```

## Development Server

Start the development server on `http://localhost:3000`

```bash
npm run dev
```

## WIP Documentation

https://github.com/visitscotland/business-events-poc/wiki
