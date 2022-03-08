# mimock

Backend spring-boot api for mimock platform

## Documentation

Click here to view [Swagger UI](http://localhost:8080/swagger-ui/index.html)

Click here to view [Open API 3 - Swagger Documentation](http://localhost:8080/v3/api-docs/)

## Postman Collection

Import [Mimock.postman_collection.json](Mimock.postman_collection.json) to Postman for testing the APIs. The pre-request script requires domain whitelisting for accessing the cookies, so follow [this](https://learning.postman.com/docs/sending-requests/cookies/#whitelisting-domains-for-programmatic-access-of-cookies) to whitelist the domain which is hosting the mimock backend.

## To start postgresql DB container

```shell
./mvnw initialize -P startDatabase
```

## To start app container service

```shell
docker-compose up
```

## To run the spring-boot app locally with dev config

```shell
./mvnw initialize spring-boot:run -Dapp.profiles=dev -P startDatabase
```
## To run checkstyle linter

```shell
./mvnw checkstyle:check
```

## To run the tests locally

```shell
./mvnw clean test -P startDatabase 
```
