# Makefile for mimock

APP_CONFIG_FILE := 'classpath:/application.yml'
APP_DB_URL := 'jdbc:postgresql://localhost:5427/mimock_db'

TEST_CONFIG_FILE := 'classpath:/application.test.yml'
TEST_DB_URL := 'jdbc:postgresql://localhost:5427/mimock_db'

cd_backend:
	cd ./mimock-backend

generate-mvnw: cd_backend
	mvn -N io.takari:maven:wrapper; cd ..

start-database:
	docker-compose -f docker-compose.db.yml up

start-app-local: start-database
	./mimock-backend/mvnw clean spring-boot:run -Dspring.config.location=$(APP_CONFIG_FILE) -Dspring.datasource.url=$(APP_DB_URL)

format-check:
	./mimock-backend/mvnw checkstyle:check

format-report:
	./mimock-backend/mvnw  clean site

test-local: start-database
	./mimock-backend/mvnw clean test -Dspring.config.location=$(TEST_CONFIG_FILE) -Dspring.datasource.url=$(TEST_DB_URL)

test-ci:
	docker-compose -f docker-compose.test.yml up --abort-on-container-exit --exit-code-from mimock-test
