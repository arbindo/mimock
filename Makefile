# Makefile for mimock

APP_CONFIG_FILE := 'classpath:/application.yml'
APP_DB_URL := 'jdbc:postgresql://localhost:5427/mimock_db'

TEST_CONFIG_FILE := 'classpath:/application.test.yml'
TEST_DB_URL := 'jdbc:postgresql://localhost:5427/mimock_db'

STATIC_DIR := '../mimock-backend/src/main/resources/static/mimock-ui'
VERSION := '0.0.1-alpha'

cd_backend:
	cd ./mimock-backend

generate-mvnw: cd_backend
	mvn -N io.takari:maven:wrapper; cd ..

create-network:
	docker network create mimock-network

start-database: create-network
	docker build -t mimock-pg-database . -f Dockerfile.pg && \
	docker run --name mimock-db -p 5427:5432 --network mimock-network -d mimock-pg-database

start-app-local: start-database
	./mimock-backend/mvnw clean spring-boot:run -Dspring.config.location=$(APP_CONFIG_FILE) -Dspring.datasource.url=$(APP_DB_URL)

format-check:
	./mimock-backend/mvnw checkstyle:check

format-report:
	./mimock-backend/mvnw  clean site

test-local: start-database
	./mimock-backend/mvnw clean test -Dspring.config.location=$(TEST_CONFIG_FILE) -Dspring.datasource.url=$(TEST_DB_URL) -P startDatabase

test-ci:
	docker-compose -f docker-compose.test.yml up --abort-on-container-exit --exit-code-from mimock-test

bundle-app: start-database
	cd ./mimock-ui && yarn && yarn test && NODE_NEV=production yarn build && \
	mkdir -p $(STATIC_DIR) && \
	mv ./dist/* ../mimock-backend/src/main/resources/static/mimock-ui/ && cd .. && \
	cd ./mimock-backend && ./mvnw -ntp clean package && cd ..

buid-docker-image:
	docker build -t mimock/mimock:$(VERSION) . -f ./Dockerfile.min

generate-keystore:
	keytool -genkeypair -noprompt \
	-alias mimock \
	-keyalg RSA \
	-keysize 4096 \
	-storetype PKCS12 \
	-dname "CN=mimock.io, OU=mimock, O=airbindo, L=CH, S=TN, C=IN" \
	-keystore mimock-keystore.p12 \
	-validity 3650 \
	-keypass ironclaw \
	-storepass ironclaw && \
	mv mimock-keystore.p12 ./mimock-backend/src/main/resources/keystore

start-app-container: start-database generate-keystore bundle-app buid-docker-image
	docker run --name mimock -p 8080:8080 --network mimock-network \
		-e MIOMCK_KEYSTORE_ENABLE=true \
		-e MIMOCK_KEYSTORE_PATH=classpath:/keystore/mimock-keystore.p12 \
		-e MIOMCK_KEYSTORE_PASSWORD=ironclaw \
		-e MIMOCK_DB_SCHEMA=mimock_schema_dev \
		-e MIMOCK_DB_URL=jdbc:postgresql://mimock-db:5432/mimock_db \
		-e MIMOCK_DB_USER=mimock \
		-e MIMOCK_DB_PASSWORD=ironclaw \
		-e MIMOCK_JWT_EXPIRY_IN_SECONDS=3600 \
		-e MIMOCK_JWT_SECRET=C4BE6B45CBBD4CBADFE5E22F4BCDBAF8 \
		-e MIMOCK_LOG_LEVEL=INFO \
		mimock/mimock:$(VERSION)