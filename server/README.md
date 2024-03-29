# Simple Chat Backend

> Built with Node, Express and Socket.io.

## Build Scripts

### Install Dependencies

```sh
npm install
```

### Start Server on Port 3000

```sh
npm start
```

### Run Linting

```sh
npm run lint
```

### Run Linting with Fix

```sh
npm run lint:fix
```

### Run Unit Tests

```sh
npm test
```

### Run Unit Tests with Coverage Report

```sh
npm run test:coverage
```

### Run Unit Tests with Verbose Results

```sh
npm run test:verbose
```

### Run Unit Tests and Watch for Changes

```sh
npm run test:watch
```

### Build for Production

```sh
npm run build
```

### Generate Documentation

```sh
npm run docs
```

### Remove Output Directories

```sh
npm run clean
```

## Environment

The following environment variables are used throughout the server. Default values are provided via the `docker-compose.yml` file at the project root.

| Variable             | Default                                     | Description                                                                    |
| -------------------- | ------------------------------------------- | ------------------------------------------------------------------------------ |
| PORT                 | `3000`                                      | The server port for web clients to interact with, i.e. `http://localhost:3000` |
| CLIENT_ORIGIN        | `http://localhost:8080`                     | Allowed web client origin for CORS                                             |
| DB_CONNECTION_STRING | `mongodb://mongo:27017/simple-chat`         | Connection string for the MongoDB instance                                     |
| OVERNIGHT_JWT_SECRET | `my super long random string for fake auth` | Secret used by OvernightJS for JWT generation                                  |
| OVERNIGHT_JWT_EXP    | `24h`                                       | JWT token expiration time after creation, used by OvernightJS                  |
