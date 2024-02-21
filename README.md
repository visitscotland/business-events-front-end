# Business Events Bloomreach Integration Proof of Concept

## Pre-requisites

- node.js 
- npm

NOTE - Currently this project does not support yarn, pending an investigation of a bug with the component library export integration. Prefer npm for package management

## Dependencies 

This project depends on a local site running an instance of the dot com brxm project, with the resource api enabled (current working branch https://github.com/visitscotland/dot-com-brxm/tree/business-events-2024 ). It should contain a .env file pointing to the api on that instance, for example:

```bash
VUE_APP_BRXM_ENDPOINT=http://businessevents.local:8080
```

## Setup

Make sure to install the dependencies:

```bash
npm install
```

## Development Server

Start the development server on `http://localhost:3000`

```bash
npm run dev
```

## How to install node.js

This project needs at least node.js version 18. You can verify if you have a version installed or which version is by executing the following command

```bash
node -v
```
You can find the latest version in [here](https://nodejs.org/en/download). Please download a TLS version to ensure maximum compatibility.

## How to install yarn

You can find the official installation guide in this link (https://classic.yarnpkg.com/en/docs/install#windows-stable)

In order to install yarn on windows, you just need to open a terminal with admin privileges and run the following command

```bash
npm install --global yarn
```

## WIP Documentation

https://github.com/visitscotland/business-events-poc/wiki
