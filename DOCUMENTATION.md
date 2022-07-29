# Mimock

Mock REST API endpoints in real-time

## Introduction

Mimock is a utility to setup mocks for REST API endpoints to mimic the response of the actual endpoints. This tool will be helpful for testing UI applications locally or in CI/CD pipelines. Mimock follows an interceptor-based pattern which enables the users to setup and use the mocks in real time without any need for re-deployment.

This project is geared towards both open-source and enterprise applications that offer REST API based solutions. Mimock functions as a faster, easier to set up and automate testing utility tool that can be easily integrated into the deliverables pipeline of various projects.

## Purpose

Mimock can be used for setting up mocks for REST endpoints without the hassle of maintaining any code for the mocks. The application exposes a React-based UI which can be used by anyone with no prior coding experience to create and maintain mocks.

If a UI application is built with a configurable origin for the backend it is consuming, then mimock origin can be wired up in its place to serve the required response. This is applicable for backend services as well, which rely on other APIs or services to process a request.

Some examples of the use cases of mimock are as follows

- If your UI (Web or Mobile) relies on an external metered API which incurs a cost based on the total hits, then mimock can be used in its place to mimic that API and serve the response on lower environments or CI/CD pipelines which run UI automation tests.
- If a backend API relies on another endpoint to download a PDF document and if that PDF server's latency is high, which is not bearable for just testing the service locally or while running integration tests on pipelines, then mimock will come in handy for serving the required PDF document.

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
| ---------------- |
| Java 8+          |
| PostgreSQL 13+   |

### Run mimock locally

Ensure that PostgreSQL is installed on the target machine. The downloaded bundle includes `setup_database` script to setup the required user, database and schema for mimock.

```shell
# Script content
# If the 'postgres' user does not exist, use an existing user  `-U <user_name>` to run the SQL script.
psql -h localhost -p 5432 -U postgres -f ./psql_setup.sql
```

`mimock.properties` - The bundle includes the properties file with the required configuration to start mimock. Check the config file and ensure the custom config items are properly setup

Download the bundle for the required platform from [above](#download-options) and run the following command to start mimock 

```shell
java -jar mimock.jar --spring.config.location=./mimock.properties
```

### Run mimock docker container

The [docker-compose.yml](docker-compose.yml) has the required setup to spin up the PostgreSQL and mimock app containers. The environment variables required for the mimock springboot app are available in the [local.env](local.env) file and the same is referred in the docker-compose manifest.

Before running the service, a new keystore must be generated and placed in the root where the `docker-compose.yml` file is located. If you already have a signed certificate, then the same can be used to generate a new keystore.

```shell
# To generate a new keystore
keytool -genkey -v -keystore <.jks file path> -keyalg RSA -keysize 2048 -validity 10000 -alias <alias name> -storepass <store password> -keypass <key password> -storetype jks

# Start the service
docker-compose -f docker-compose.yml up -d
```

### Run mimock within a k8s cluster

The [mimock-k8s](mimock-k8s) directory has a set of kubernetes manifest files to give an idea of how to setup mimock within a k8s cluster.


### Run mimock on a CI pipeline

A [demo project](https://github.com/arbindo/demo-app) is available on Github, which simulates a scenario of running an UI automation test by setting up mocks using mimock. The project is a simple web application which relies on two endpoints, one for a `json` response and the other for a `webp` image. The mocks for both the endpoints are setup within the workflow and the UI automation script captures the results as snapshots, and publishes the same to the [workflow summary](https://github.com/arbindo/demo-app/actions/runs/2685049363)

### Setup metric collection for mimock

The Prometheus metrics for mimock is exposed on `/api/mimock/monitoring/prometheus`. The [prometheus.yml](prometheus.yml) file includes the required config for setting up your own prometheus scrapping for mimock

## How to login?

Mimock follows a role-based user management system and the services can be accessed only by an authenticated user. To handle initial application setup, a default ADMIN user is created, which can be used to create other users.

|Username|Password|Role|
|--|--|--|
|`mimock_admin`|`password`|`ADMIN`|

More details about user roles are available [here](#userrole)

>It is recommended to create a new ADMIN user and then use that to delete the default `mimock_admin` user

## Features

Some of the key features offered by the Mimock are as follows

- **Intuitive UI:** Provides an intuitive UI which lets anyone manage mocks without any coding experience.
- **No Re-Deployment:** Mocks can be added in real time, and no application restart is required. Mocks are created and updated on-the-go, which ensures faster development and turn-around time.
- **Access Management:** The platform follows a role-based user management model and the admin can assign roles to the users to setup and restrict their access.
- **Support for multiple response types:** Mimock supports both text and binary response for mocks. So if you want a mock to serve a normal JSON response or a JPEG image file or a PDF document, it can be done in a jiffy.

## Definitions and Explanations

#### User

Mimock uses secured endpoints, which allows only authenticated users to access the API endpoints or the UI functionalities. It is not possible to use mimock without an existing user.

#### UserRole

User role indicates the role assigned to the user. Access management for this platform is role-based, and the defenition of the roles are as follows

    - **ADMIN** - has access to all features of the platform and has control over the other users of the platform for access management. Admin users can create, edit or delete existing user, and also inherits the permission to manage all the mocks.
    - **MANAGER** - inherits the permission to manage mocks (create, edit and delete), but user management is not within the scope of the manager.
    - **VIEWER** - inhertis view only access to mocks. A viewer cannot manage mocks or users.

#### Mock

This is the primary resource of the platform.

A mock can have a name, description, route, httpMethod and other REST api oriented fields.

The structure of the mock entity mimics the actual endpoint. The mocks can be setup and managed by the user (ADMIN or MANAGER) via the API or the UI. Mimock performs mock matching based on the route, http method, and the query parameters. If an existing match is found based on the mentioned fields, then the next level of comparison will be performed based on the available request body and request headers. Upon performing a complete match, the platform will respond with the expected HTTP response (text-based response or binary files).

#### Platform Settings

This entity contains the feature control of the platform for every user.

Currently there is a single platform setting common for all users but in the upcoming releases these platform settings will be converted to user-specific setting and this will be permitted/restricted by the access management policies decided by the users who are using the tool.

The currently supported platform settings include export/import of mocks and auto flush of recycle bin.

### APIs

### A. User management

Handles operations related to user management.

#### 1. Add new user

`POST /api/mimock/v1/admin/users`

Adds a new user to mimock

```java

@AllArgsConstructor
@Builder
@Getter
public class AddUserRequest {
    @NotBlank(message = "Name of the user cannot be empty")
    @Schema(example = "Gandalf", description = "Name of the user")
    @Size(min = 4, max = 24)
    @Pattern(regexp = "[a-zA-Z][a-zA-Z0-9 ]{3,24}", message = "Name must contain only alphabets")
    private String name;

    @NotBlank(message = "Username cannot be empty")
    @Schema(example = "mithrandir_69", description = "Unique user name for the user")
    @Size(min = 4, message = "User name must be at least 6 characters long")
    @Size(max = 24, message = "User name cannot be more than 24 characters")
    @Pattern(regexp = "[a-zA-Z][a-zA-Z0-9_]{3,24}", message = "User name must contain only alphanumeric characters")
    private String userName;

    @NotBlank(message = "Password cannot be empty")
    @Schema(
            example = "$2a$12$GekvNjpI6TOSDXJRYMNzguU4edoaHaTXs1jvHELi27AW2zsNopTxm",
            description = "BCrypt encoded password"
    )
    @Size(min = 8, message = "Password must be at least 8 characters long")
    @Size(max = 128, message = "Password cannot be more than 128 characters long")
    @ValidPassword
    private String password;

    @ValidRole
    @Schema(example = "ADMIN", description = "Role of the user")
    private String userRole;
}

```

#### 2. List all users

`GET /api/mimock/v1/admin/users`

Returns all the existing users who are not deleted

#### 3. List user info

`GET /api/mimock/v1/admin/users/user-info`

Returns the user info for an user

#### 4. Update user role

`PUT /api/mimock/v1/admin/users/update-role`

Updates the user role

```java
@AllArgsConstructor
@Builder
@Getter
public class UpdateUserRoleRequest {
    @NotBlank(message = "Username cannot be empty")
    @Schema(example = "frodo1", description = "Unique user name for the user")
    @Size(min = 6, message = "User name must be at least 6 characters long")
    @Size(max = 128, message = "User name cannot be more than 128 characters")
    private String userName;

    @ValidRole
    @Schema(example = "ADMIN", description = "Role of the user")
    private String userRole;
}
```

#### 5. Update user password

`PUT /api/mimock/v1/admin/users/update-password`

Updates the user password

```java
@AllArgsConstructor
@Builder
@Getter
public class UpdatePasswordRequest {
    @NotBlank(message = "Username cannot be empty")
    @Schema(example = "mimock_admin", description = "Unique user name for the user")
    @Size(min = 6, message = "User name must be at least 6 characters long")
    @Size(max = 128, message = "User name cannot be more than 128 characters")
    private String userName;

    @NotBlank(message = "Password cannot be empty")
    @Schema(
            example = "$2a$12$GekvNjpI6TOSDXJRYMNzguU4edoaHaTXs1jvHELi27AW2zsNopTxm",
            description = "BCrypt encoded password"
    )
    @ValidPassword
    private String password;
}
```

#### 6. Update user activation status

`PUT /api/mimock/v1/admin/users/update-activation`

To enable or disable a user account

```java
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Getter
public class UserActivationRequest {
    @NotNull(message = "User status is mandatory")
    @Schema(description = "Activation status for the user", example = "true")
    private Boolean isUserActive;

    @NotBlank(message = "Username cannot be empty")
    @Size(min = 6, message = "User name must be at least 6 characters long")
    @Size(max = 128, message = "User name cannot be more than 128 characters")
    @Schema(description = "Username for which the activation status need to be set", example = "mimock_admin")
    private String userName;
}
```

#### 7. Delete user based on user name

`DELETE /api/mimock/v1/admin/users/delete-user`

Delete user based on the username

### B. Platform Settings

Handles operations related to platform settings.

#### 1. List Platform settings

`GET /api/mimock/v1/platform-settings`

Returns all supported platform settings in Mimock Platform.

#### 2. Update Platform settings

`PUT /api/mimock/v1/platform-settings`

Updates the default platform settings. This API will be extensible in future.

```java
@Getter
@Setter
@Builder
public class PlatformSettingsRequest {

    @Schema(example = "true", description = "Export and Import Feature Enabled/Disabled")
    private Boolean isExportImportEnabled;

    @Schema(example = "true", description = "Flush Bin CRON Feature Enabled/Disabled")
    private Boolean isFlushBinCronEnabled;

}
```

### C. Mock Management

Handles operation related to mock resource

#### 1. Create Mock

`POST /api/mimock/v1/mocks`

Creates a mock as per the given data in multi-part form.

| Column                      | Type                      | Description                                                            |
| --------------------------- | ------------------------- | ---------------------------------------------------------------------- |
| name                        | string (required)         | Uniquely identifiable name for the mimock                              |
| description                 | string (required)         | Custom Description of the Mock                                         |
| route                       | string (required)         | Route of the mock                                                      |
| httpMethod                  | string (required)         | Name of the HTTP Method                                                |
| statusCode                  | integer($int32)(required) | Expected status code of the mock                                       |
| responseContentType         | string                    | Name of the Response Content Type                                      |
| queryParams                 | string                    | Associated query params of the mock                                    |
| requestHeader               | string                    | Request headers for the mock                                           |
| shouldDoExactHeaderMatching | boolean                   | Decides whether request headers need to be matched strictly or loosely |
| responseHeaders             | string                    | Response headers to be sent after invoking the mock endpoint           |
| requestBody                 | string                    | Request body for the mock                                              |
| requestBodyType             | string                    | Request body type                                                      |
| expectedTextResponse        | string                    | Represents the expected textual response                               |
| binaryFile                  | string($binary)           | Binary file                                                            |
| headerMatchingSetToStrict   | boolean                   | Headers match exact or not                                             |

#### 2. Get Mock

`GET /api/mimock/v1/mocks/{mockId}`

Get mock based on the given mockId.

#### 3. Update Mock

`PUT /api/mimock/v1/mocks/{mockId}`

Updates mock for the given mockId using the data in multi-part form.

| Column                      | Type                      | Description                                                            |
| --------------------------- | ------------------------- | ---------------------------------------------------------------------- |
| mockId                      | string (required)         | Unique mock identifier                                                 |
| name                        | string (required)         | Uniquely identifiable name for the mimock                              |
| description                 | string (required)         | Custom Description of the Mock                                         |
| route                       | string (required)         | Route of the mock                                                      |
| httpMethod                  | string (required)         | Name of the HTTP Method                                                |
| statusCode                  | integer($int32)(required) | Expected status code of the mock                                       |
| responseContentType         | string                    | Name of the Response Content Type                                      |
| queryParams                 | string                    | Associated query params of the mock                                    |
| requestHeader               | string                    | Request headers for the mock                                           |
| shouldDoExactHeaderMatching | boolean                   | Decides whether request headers need to be matched strictly or loosely |
| responseHeaders             | string                    | Response headers to be sent after invoking the mock endpoint           |
| requestBody                 | string                    | Request body for the mock                                              |
| requestBodyType             | string                    | Request body type                                                      |
| expectedTextResponse        | string                    | Represents the expected textual response                               |
| binaryFile                  | string($binary)           | Binary file                                                            |
| headerMatchingSetToStrict   | boolean                   | Headers match exact or not                                             |

#### 4. Delete Mock

`DELETE /api/mimock/v1/mocks/{mockId}`

Performs soft delete on mock based on the given mockId.

#### 5. List Mocks

`GET /api/mimock/v1/mocks`

Returns all mocks in the mimock platform.

#### 6. Delete Mocks

`DELETE /api/mimock/v1/mocks`

Delete all mocks in the mimock platform.

#### 7. Archive Mock

`POST /api/mimock/v1/mocks/{mockId}:archive`

Archives a mock based on the given mockId.

#### 8. Unarchive Mock

`POST /api/mimock/v1/mocks/{mockId}:unarchive`

Unarchives a mock based on the given mockId.

#### 9. List Mocks as Pageable

`GET /api/mimock/v1/mocks/filter`

List all mocks in pageable format and filter based on the filter if provided.

#### 10. Export Mocks

`GET /api/mimock/v1/mocks/csv/export`

Exports the mocks in CSV file format.

#### 11. Export Mock CSV template

`GET /api/mimock/v1/mocks/csv/template/export`

Exports the mock template CSV file which can used while import operation.

#### 12. Force delete mock

`DELETE /api/mimock/v1/mocks/{mockId}:forceDelete`

Performs hard delete on mock based on the given mockId.

### D. User Authentication

Handles operations related to user authentication.

#### 1. Authenticate User

`POST /api/mimock/v1/user/authenticate`

Authenticates the user and returns the auth token.

Accepts AuthenticateUserRequest and returns the JWT auth token.

```java

@AllArgsConstructor
@Builder
@Getter
public class AuthenticateUserRequest {

    @NotBlank(message = "Username cannot be empty")
    @Schema(example = "bruce_wayne", description = "Unique user name for the user")
    @Size(min = 6, message = "User name must be at least 6 characters long")
    @Size(max = 128, message = "User name cannot be more than 128 characters")
    private String userName;

    @NotBlank(message = "Password cannot be empty")
    @Schema(example = "batman@123", description = "Password entered by the user")
    private String password;
}

```

#### 2. Validate user auth token

`GET /api/mimock/v1/auth-token/validate`

Validates if the auth token is valid for use or not.

#### Static Records

Lists all available static records used by the project.

#### 1. List all user roles

`GET /api/mimock/v1/static-records/user-roles`

Returns all the existing users roles in Mimock Platform.

#### 2. List response content types

`GET /api/mimock/v1/static-records/response-content-types`

Returns all supported Response Content Types in Mimock Platform.

#### 3. List Http Methods

`GET /api/mimock/v1/static-records/http-methods`

Returns all supported HTTP Methods in Mimock Platform.

#### 4. List Entity Status

`GET /api/mimock/v1/static-records/entity-status`

Returns all supported Entity Status in Mimock Platform.
