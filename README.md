# VisitScotland Business Events - Front End Application

## Pre-requisites

- node.js 
- yarn

## Dependencies 

This project depends on a local site running an instance of the dot com brxm project, with the resource api enabled (current working branch https://github.com/visitscotland/dot-com-brxm/tree/business-events-2024 ). It should contain a .env file pointing to the api on that instance, for example:

```bash
BR_RESOURCE_API_ENDPOINT=http://businessevents.local:8080/site/resourceapi
BR_CMS_ORIGIN_LOCATION=http://localhost:8080
```

To enable local and development testing of the RUM user data capture, add the following values to the .env file. Variable values can be found in our AWS account.

```bash
AWS_IDENTITY_POOL_ID=identy-pool-id-here
AWS_RUM_ENPOINT=rum-endpoint-here
AWS_RUM_APPLICATION_ID=rum-app-id-here
```

## Setup

Make sure to install the dependencies:

```bash
yarn
```

## Development Server

Start the development server on `http://localhost:3000`

```bash
yarn dev
```

## How to install node.js

This project needs at least node.js version 18. You can verify if you have a version installed or which version is by executing the following command

```bash
node -v
```
You can find the latest version in [here](https://nodejs.org/en/download). Please download a TLS version to ensure maximum compatibility.

## WIP Documentation

https://github.com/visitscotland/business-events-poc/wiki
