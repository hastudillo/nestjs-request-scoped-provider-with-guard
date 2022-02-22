## Description

This project is a minimal example of application built on [NestJS](https://nestjs.com/) using a custom and request scoped provider and a guard.

- The custom provider allows to choose a connection to a MongoDB instance from the pool (for the sake of simplicity it will be always the same, accordingly to a `MONGO_URL` variable) in order to inject a model in an ordinary service.
- The connection is opened (if needed) with a middleware instead of a guard.

It has been inspired by this stub: https://stackoverflow.com/a/59765659

The guard implemented is executed after the middleware and the custom provider get access to the database, which is not ideal.
So that it may not be suitable to authenticate the user logged in a FE application (usually via bearer token and passport).

## Installation

```bash
$ npm install
```

## Running the app

NOTE: before running the application make sure to set the following environment variables:

- `MONGO_URL`

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```
