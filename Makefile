start-database:
	docker-compose -f docker-compose.db.yml up

start-app-local:
	docker-compose up

cd_backend:
	cd ./mimock-backend

generate-mvnw: cd_backend
	mvn -N io.takari:maven:wrapper; cd ..

test: cd_backend
	./mvnw clean test -Dspring.config.location=classpath:/application.test.yml
