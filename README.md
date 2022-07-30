<h1 align="center">
Mimock
</h1>

<div align="center">
<p align="center">
<img src="https://user-images.githubusercontent.com/47709856/154523128-e9c45f11-b1a6-4dcc-8064-75f6c5af4a43.svg" alt="logo" style="width:150px;text-align:center;" />
</p>
<p align="center">
Setup mocks for REST endpoints
</p>

<div style="display: flex;" align="center">
  <a href="https://codecov.io/gh/arbindo/mimock" > 
   <img src="https://codecov.io/gh/arbindo/mimock/branch/main/graph/badge.svg?token=OD0SWFC9BV"/> 
  </a>

  <a href="https://github.com/arbindo/mimock/actions/workflows/mimock-ui.yml">
    <img src="https://github.com/arbindo/mimock/actions/workflows/mimock-ui.yml/badge.svg" />
  </a>

  <a href="https://github.com/arbindo/mimock/actions/workflows/mimock-backend.yml">
    <img src="https://github.com/arbindo/mimock/actions/workflows/mimock-backend.yml/badge.svg" />
  </a>

  <a href="https://hub.docker.com/r/mimock/mimock">
    <img src="https://img.shields.io/static/v1?label=mimock/mimock&message=v0.0.1&color=blue&logo=docker" />
  </a>
</div>

<hr />
</div>

## Overview

Mimock is a utility to setup mocks for REST API endpoints to mimic the response of the actual endpoints. This tool will be helpful for testing UI applications locally or in CI/CD pipelines. Mimock follows an interceptor-based pattern which enables the users to setup and use the mocks in real time without any need for re-deployment.

This project is geared towards both open-source and enterprise applications that offer REST API based solutions. Mimock functions as a faster, easier to set up and automate testing utility tool that can be easily integrated into the deliverables pipeline of various projects.

Mimock is published under the open-source [Apache-2.0 license](LICENSE).

<p align="center">
<img src="https://user-images.githubusercontent.com/47709856/180043326-c23999de-17e7-4fe4-a611-7896e7289ca0.png" alt="mock-dashboard" style="width:680px;" />
</p>

## Features

Some of the key features offered by the Mimock are as follows

- **Intuitive UI:** Provides an intuitive UI which lets anyone manage mocks without any coding experience.
- **No Re-Deployment:** Mocks can be added in real time, and no application restart is required. Mocks are created and updated on-the-go, which ensures faster development and turn-around time.
- **Access Management:** The platform follows a role-based user management model and the admin can assign roles to the users to setup and restrict their access.
- **Support for multiple response types:** Mimock supports both text and binary response for mocks. So if you want a mock to serve a normal JSON response or a JPEG image file or a PDF document, it can be done in a jiffy.

## Download Options

### JAR with start-up script

Mimock is a Java based application, hence it requires `Java 8+` to run the application. 

- [**Windows**](https://github.com/arbindo/mimock/releases/download/alpha-v0.0.1/mimock-0.0.1.zip)
- [**Linux**](https://github.com/arbindo/mimock/releases/download/alpha-v0.0.1/mimock-0.0.1.tar.gz)
- [**MacOS**](https://github.com/arbindo/mimock/releases/download/alpha-v0.0.1/mimock-0.0.1.tar.gz)

### Docker image

There are two variants of docker images available for mimock

- `complete` version [recommended]

The docker image with the `latest` tag includes all the required artifacts to use mimock with no additional setup. The container can be directly started to use the application and this variant is best suited for local developments workflows. 

```shell
docker pull mimock/mimock:latest

docker run --name mimock -d -p <destination port>:8080 mimock/mimock:latest

# Once the container is ready, mimock will be available on https://localhost:<destination port>
```

- `slim` version

The slim variant includes only the jar file of the application. The database and keystore setup need to be done by the user, and the required environment variables must be passed to run the container. This image variant is intended for a highly customized setup

```shell
docker pull mimock/mimock:slim

# Ensure that PostgreSQL Database is setup before starting the container
# The Dockerfile.pg has a minimal setup for spinning up a DB container

docker run --name mimock-slim -d -p <destination port>:8080 \
 -e MIMOCK_LOG_LEVEL=INFO \
 -e MIMOCK_KEYSTORE_ENABLE=false \
 -e MIMOCK_DB_SCHEMA=mimock_schema_dev \
 -e MIMOCK_DB_URL=jdbc:postgresql://mimock-db:5432/mimock_db \
 -e MIMOCK_DB_USER=mimock \
 -e MIMOCK_DB_PASSWORD=<db password> \
 -e MIMOCK_JWT_EXPIRY_DURATION=24h \
 -e MIMOCK_JWT_SECRET=<key with 32 characters> \
 -e MIMOCK_CORS_ORIGINS=http://localhost:3001 \
 -e MIMOCK_CORS_METHODS=GET,POST,PUT,DELETE,OPTIONS \
 -e MIMOCK_CORS_ALLOWED_HEADERS=Authorization,Content-Type,X-Requested-With,Accept,X-XSRF-TOKEN \
 -e MIMOCK_CORS_EXPOSED_HEADERS=Cache-Control,Content-Language,Content-Length,Content-Type,Content-Disposition,Expires,Last-Modified,Pragma \
 mimock/mimock:slim
 
 # Once the container is ready, mimock will be available on http://localhost:<destination port>
```

### Docker setup using docker-compose file

If docker-compose is preferred, then the [docker-compose.yml](docker-compose.yml) file includes the services to setup the DB and the app container.

```shell
docker-compose up -d

# Destination port can be updated to the desired value if another service is running on port 8080
#     ports:
#      - "<desired port>:8080"

# Mimock will be available on https://localhost:8080
```

## Initial

## Setup Instructions

| **Requirements** |
| - |
| Java 8+ |
| PostgreSQL 13+ |

### Run mimock locally

Ensure PostgreSQL is setup with a user and a schema for mimock to automatically complete the required table setup.

`mimock.properties` - The bundle includes the properties file with the required configuration to start mimock. Check the config file and ensure the custom config items are properly setup.

Download the platform-specific bundle from [above]. (#download-options) and run the following command to start mimock.

```shell
java -jar mimock.jar --spring.config.location=./mimock.properties
```

### Run mimock within a k8s cluster

The [mimock-k8s](mimock-k8s) directory has a set of kubernetes manifest files to give an idea of how to setup mimock within a k8s cluster.

### Run mimock in a CI pipeline

A [demo project](https://github.com/arbindo/demo-app) is available on Github, which simulates a scenario of running an UI automation test by setting up mocks using mimock. The project is a simple web application which relies on two endpoints, one for a `json` response and the other for a `webp` image. The mocks for both the endpoints are setup within the workflow and the UI automation script captures the results as snapshots, and publishes the same to the [workflow summary](https://github.com/arbindo/demo-app/actions/runs/2685049363)

## Support

- Use [issues](https://github.com/arbindo/mimock/issues) to report bugs or for requesting new features
- Follow [discussions](https://github.com/arbindo/mimock/discussions) to get community updates
- Contributors are most welcome. Read the [guidelines](CONTRIBUTING.md) for more information
