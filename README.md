# Mimock

<img src="https://user-images.githubusercontent.com/47709856/154523128-e9c45f11-b1a6-4dcc-8064-75f6c5af4a43.svg" alt="logo" style="width:200px;text-align:center;"/>

Mimock is an utility tool to setup mocks for REST API endpoints to mimic the actual endpoints. This tool will be helpful to test UI applications locally or in CI/CD pipelines. Mimock follows an interceptor based pattern which enables the developer to test the endpoints without having to restart the application.

This project is geared towards both open-source and enterprise applications which offers REST API based solutions. Mimock acts as a faster, easier to setup and automated testing utility tool which can be easily adopted by different projects into their deliverables pipeline.

Mimock is published under open-source [Apache-2.0 license](LICENSE).

## Features

This section explains the features available in the Mimock application.

### Overview

Unique features offered by the Mimock utility tool is mentioned as follows,

- **Intuitive UI:** Provides an intuitive UI which lets anyone to manage mocks without any coding experience
- **No Re-Deployment:** Mocks can be added in real time and no application restart is required. Mocks are created/updated on-the-go which ensures faster development and turn-around time
- **Access Management:** The platform follows the role based user model and the admin can assign roles to the users to setup and restrict the access
- **Multi-Response:** With the multi-response feature support, setup your mock to serve a normal JSON response or a JPEG image file or even your desired PDF document


## Download Options

### JAR with start-up script

Mimock is a Java based application, hence it requires `Java 8+` to run the application. 

- [**Windows**](https://github.com/arbindo/mimock/archive/refs/tags/mimock-windows.zip)
- [**Linux**](https://github.com/arbindo/mimock/archive/refs/tags/mimock-linux.tar.gz)
- [**MacOS**](https://github.com/arbindo/mimock/archive/refs/tags/mimock-macos.tar.gz)

### Docker image

```shell
docker pull mimock/mimock
```

## Setup Instructions

| **Requirements** |
| - |
| Java 8+ |
| PostgreSQL 13+ |

### Run mimock locally

Ensure PostgreSQL is setup with a user and a schema for mimock to automatically complete the required table setup

`mimock.properties` - The bundle includes the properties file with the required configuration to start mimock. Check the config file and ensure the custom config items are properly setup

Download the bundle for the required platform from [above](#download-options) and run the following command to start mimock 

```shell
java -jar mimock.jar --spring.config.location=./mimock.properties
```

### Run mimock docker container

The [docker-compose.yml](docker-compose.yml) has the required setup to spin up the PostgreSQL and mimock app containers. The environment variables required for the mimock springboot app are available in the [local.env](local.env) file and the same is referred in the docker-compose manifest. Update the required env values and run the following command to start mimock

```shell
docker-compose -f docker-compose.yml up -d
```

### Run mimock within a k8s cluster

The [mimock-k8s](mimock-k8s) directory has sample kubernetes manifest to give an idea of how to setup mimock within a k8s cluster. 

### Run mimock on a CI pipeline

A [demo project](https://github.com/arbindo/demo-app) is available on Github, which simulates a scenario of running a UI automation test by setting up mocks using mimock. The project is a simple web application which relies on two endpoints, one for a JSON response and the other for a webp image. The mocks for the two endpoints are setup within the workflow and the UI automation script captures the results as snapshots, and publishes the same to the [workflow summary](https://github.com/arbindo/demo-app/actions/runs/2685049363)

### Setup metric collection for mimock

The Prometheus metrics for mimock is exposed on `/api/mimock/monitoring/prometheus` endpoint. The [prometheus.yml](../prometheus.yml)  file includes the required config for setting up your own prometheus scrapping for mimock

## Support

- Use [issues](https://github.com/arbindo/mimock/issues) to report bugs or for requesting new features
- Follow [discussions](https://github.com/arbindo/mimock/discussions) to get community updates
- Contributors are most welcome. Read the [guidelines](CONTRIBUTING.md) for more information
