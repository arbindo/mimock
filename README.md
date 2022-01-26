# mimock

Utility to set up mock rest api endpoints to mimic actual endpoints

## To start DB locally

```shell
docker-compose -f docker-compose.db.yml -d up
```

## To start app locally

```shell
docker-compose up
```

## For running app with dev config

```shell
--spring.config.location=classpath:/application.dev.yml 
```

## For running tests locally

```shell
./mvnw clean test -Dspring.config.location=classpath:/application.test.yml 
```