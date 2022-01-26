# mimock

Backend spring-boot api for mimock

## To start postgresql DB container

```shell
./mvnw initialize -P startDatabase
```

## To start app container service

```shell
docker-compose up
```

## For running app locally with dev config

```shell
./mvnw initialize spring-boot:run -Dapp.profiles=dev -P startDatabase
```

## For running tests locally

```shell
./mvnw clean initialize test -P startDatabase 
```
