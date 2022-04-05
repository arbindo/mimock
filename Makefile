# Makefile for mimock

APP_CONFIG_FILE := 'classpath:/application.yml'
APP_DB_URL := 'jdbc:postgresql://localhost:5427/mimock_db'

TEST_CONFIG_FILE := 'classpath:/application.test.yml'
TEST_DB_URL := 'jdbc:postgresql://localhost:5427/mimock_db'

STATIC_DIR := '../mimock-backend/src/main/resources/static/mimock-ui'

cd_backend:
	cd ./mimock-backend

generate-mvnw: cd_backend
	mvn -N io.takari:maven:wrapper; cd ..

start-database:
	docker build -t mimock-pg-database . -f Dockerfile.pg && \
	docker run --name mimock-db -p 5427:5432 -d mimock-pg-database

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
	cd ./mimock-ui && yarn && yarn test && yarn build && \
	mkdir -p $(STATIC_DIR) && \
	mv ./dist/* ../mimock-backend/src/main/resources/static/mimock-ui/ && cd .. && \
	cd ./mimock-backend && ./mvnw clean package && cd ..
