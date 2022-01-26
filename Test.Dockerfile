FROM alpine:3.15.0

WORKDIR /home/mimock

COPY ${PWD}/mimock-backend/ .

RUN chmod 755 -R .

RUN apk add openjdk11-jre

RUN sed -i 's/\r$//' mvnw
RUN ./mvnw clean

ENTRYPOINT ["./mvnw", "test", "-Dspring.config.location=classpath:/application.test.yml"]