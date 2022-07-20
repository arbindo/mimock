# mimock

Backend spring-boot api for mimock platform

## Documentation

Click here to view [Swagger UI](http://localhost:8080/swagger-ui/index.html) locally

Click here to view [Open API 3 - Swagger Documentation](http://localhost:8080/v3/api-docs/) locally

## Postman Collection

Import [Mimock.postman_collection.json](Mimock.postman_collection.json) to Postman for testing the APIs. The pre-request
script requires domain whitelisting for accessing the cookies, so
follow [this](https://learning.postman.com/docs/sending-requests/cookies/#whitelisting-domains-for-programmatic-access-of-cookies)
to whitelist the domain which is hosting the mimock backend.

## To Run mimock-api locally

**Requirements**

- Docker
- JRE 8+

**Start postgresql Database container**

The container will initialize the Database with all the required schema and users which will enable development on the
go.

```shell
./mvnw initialize -P startDatabase
```

**Run the spring-boot app locally with dev config**

```shell
./mvnw initialize spring-boot:run -Dapp.profiles=dev
```

## To run checkstyle linter

```shell
./mvnw checkstyle:check
```

## To run the tests locally

```shell
./mvnw clean test -P startDatabase 
```

## Enable prometheus scrapping for mimock

The prometheus metrics for mimock is exposed on `/api/mimock/monitoring/prometheus` endpoint. The [prometheus.yml](../prometheus.yml)  file includes the required config for setting up your own prometheus scrapping for mimock
