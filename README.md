# Hello Nest

The following components and tools are used in this API:

- [TypeScript](https://www.typescriptlang.org/)
- [NestJS](https://nestjs.com/)
- [MariaDB](https://mariadb.org/)
- [RabbitMQ](https://www.rabbitmq.com/)

## Pre-requisites

The following is required to run the service locally:

- Docker

## Start up

The following command can be used to run the application locally

```bash
docker-compose up
```

or 

```bash
docker-compose up --build --remove-orphans --force-recreatess
```

## Database Migrations

All table additions and updates need to be handled using database migrations.

To create a new migration:

```bash
npm run typeorm:create {File_Name}
```

```bash
npm run typeorm:migrate {File_Name}

```

To revert migrations:

```bash
npm run typeorm:revert
```

To run migrations:

```bash
npm run typeorm:run
```

## Code Lint

All code linting is using [StandardJS](https://standardjs.com/). This is using a module called `standardx` for TypeScript specifics. This can be set up in Visual Code by installing [StandardJS Extension](https://marketplace.visualstudio.com/items?itemName=chenxsan.vscode-standardjs) and setting it to use `standardx`

To run code lint:

```bash
npm run lint
```

To automatically apply lint fixes:

```bash
npm run lint:fix
```

## Testing

The project consists of unit and end-to-end tests. Unit tests should be used to test specific behaviour on any added functions. end-to-end (e2e) tests are for testing HTTP requests and interfaces, to ensure that validation and service implementation is working as expected.

To run unit tests:

```bash
npm run test
```

To run e2e tests:

```
npm run test:e2e
```

## Documentation

All documentation is done via [NestJS's Swagger implementation](https://docs.nestjs.com/openapi/introduction) and is done in by means of decorators.

The documentation is reachable on the following URL:

```
{BASE_URL}/api-docs/577e321c-e236-44fb-b07a-92895e2fe73f
```

## Health Check Endpoints

### Readiness Probe:

```
/health/readiness
```

Expected Response:

```
HTTP 200 text/plain

OK
```

### Health Check:

```
/health
```

Expected Repsonse:

```json
HTTP 200 application/json

{
    "status": "ok",
    "info": {
        "db": {
            "status": "up"
        },
        "microservice-transport": {
            "status": "up"
        }
    },
    "error": {},
    "details": {
        "db": {
            "status": "up"
        },
        "microservice-transport": {
            "status": "up"
        }
    }
}
```