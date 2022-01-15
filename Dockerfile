FROM adoptopenjdk/openjdk11:alpine-jre

WORKDIR /home/mimock

COPY ./mimock-backend .

RUN ./mvnw clean package

EXPOSE 8080

ENTRYPOINT ["java","-jar","./target/mimock-0.0.1.jar"]