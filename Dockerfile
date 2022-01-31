FROM alpine:3.15.0

WORKDIR /home/mimock

COPY ${PWD}/mimock-backend/ .

RUN chmod 755 -R .

RUN apk add openjdk11
RUN apk add openjdk11-jre

RUN sed -i 's/\r$//' mvnw
RUN ./mvnw clean package -P packageJar -Dmaven.test.skip=true

EXPOSE 8080

ENTRYPOINT ["java","-jar","./target/mimock-0.0.1.jar"]
