# Makefile for mimock

APP_CONFIG_FILE := 'classpath:/application.yml'
APP_DB_URL := 'jdbc:postgresql://localhost:5427/mimock_db'

TEST_CONFIG_FILE := 'classpath:/application.test.yml'
TEST_DB_URL := 'jdbc:postgresql://localhost:5427/mimock_db'

STATIC_DIR := '../mimock-backend/src/main/resources/static/mimock-ui'
VERSION := $$MIMOCK_CURRENT_VERSION

ifdef SKIP_TESTS
BUILD_BACKEND := cd ./mimock-backend && ./gradlew build -x test && cd ..
BUILD_UI := cd ./mimock-ui && yarn && NODE_NEV=production yarn build
else
BUILD_UI := cd ./mimock-ui && yarn && yarn test && NODE_NEV=production yarn build
BUILD_BACKEND := cd ./mimock-backend && ./gradlew build && cd ..
endif

cd_backend:
	cd ./mimock-backend

generate-mvnw: cd_backend
	mvn -N io.takari:maven:wrapper; cd ..

create-network:
	@docker network inspect mimock-network >/dev/null 2>&1 || \
    docker network create mimock-network

start-database: create-network
	@docker build -t mimock-pg-database . -f Dockerfile.pg
	@docker inspect mimock-db --format "imageName: {{.Id}}" || docker run --name mimock-db -p 5432:5432 --network mimock-network -d mimock-pg-database

start-app-local: start-database
	./mimock-backend/gradlew bootRun -Dspring.config.location=$(APP_CONFIG_FILE) -Dspring.datasource.url=$(APP_DB_URL)

format-check:
	./mimock-backend/gradlew checkstyleMain

test-local: start-database
	./mimock-backend/gradlew test -Dspring.config.location=$(TEST_CONFIG_FILE) -Dspring.datasource.url=$(TEST_DB_URL) -P startDatabase

test-ci:
	docker-compose -f docker-compose.test.yml up --abort-on-container-exit --exit-code-from mimock-test

build-app:
	@echo "Building mimock bundle" && \
	$(BUILD_UI) && \
	mkdir -p $(STATIC_DIR) && \
	mv ./dist/* ../mimock-backend/src/main/resources/static/mimock-ui/ && cd .. && \
	$(BUILD_BACKEND)

bundle-app: start-database build-app

build-docker-image:
	@echo "Building docker image" && \
	docker build -t mimock/mimock:$(VERSION) . -f ./Dockerfile.slim

generate-keystore:
	@echo "Generating keystore" && \
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

start-app-container: generate-keystore bundle-app build-docker-image
	@echo "Starting mimock docker container" && \
	docker run -d --name mimock -p 8080:8080 --network mimock-network \
		--env MIMOCK_KEYSTORE_ENABLE=true \
		--env MIMOCK_KEYSTORE_PATH=classpath:/keystore/mimock-keystore.p12 \
		--env MIMOCK_KEYSTORE_PASSWORD=ironclaw \
		--env MIMOCK_DB_SCHEMA=mimock_schema_dev \
		--env MIMOCK_DB_URL=jdbc:postgresql://mimock-db:5432/mimock_db \
		--env MIMOCK_DB_USER=mimock \
		--env MIMOCK_DB_PASSWORD=ironclaw \
		--env MIMOCK_LOG_LEVEL=INFO \
		mimock/mimock:$(VERSION)
