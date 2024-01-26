# Business Events Bloomreach Integration Proof of Concept

## Dependencies 

This project depends on a local site running an instance of the dot com brxm project, with the resource api enabled (currently working branch https://github.com/visitscotland/dot-com-brxm/tree/business-events-2024 ). It should contain a .env file pointing to the api on that instance, for example:

```bash
VUE_APP_BRXM_ENDPOINT=http://businessevents.local:8080
```

It also currently requires a local install of the component library, linked directly into the project. This step will no longer be necessary when the exported component library is published.

In the component library project: https://github.com/visitscotland/vs-component-library

On this branch: https://github.com/visitscotland/vs-component-library/tree/spike/287-investigate-exporting-components

```bash
yarn install
yarn build:vite-only
git link
```

Then back in this project:

```bash
git link @visitscotland/component-library
```

## Setup

Make sure to install the dependencies:

```bash
# yarn
yarn install
```

## Development Server

Start the development server on `http://localhost:3000`

```bash
yarn dev
```

## WIP Documentation

https://github.com/visitscotland/business-events-poc/wiki
