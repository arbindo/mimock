# Mimock

Mock REST API endpoints in real-time

## Introduction

Mimock is an utility tool to setup mocks for REST API endpoints to mimic the actual endpoints. This tool will be helpful to test UI applications locally or in CI/CD pipelines. Mimock follows an interceptor based pattern which enables the developer to test the endpoints without having to restart the application.

This project is geared towards both open-source and enterprise applications which offers REST API based solutions. Mimock acts as a faster, easier to setup and automated testing utility tool which can be easily adopted by different projects into their deliverables pipeline.

Mimock is published under open-source [Apache-2.0 license](LICENSE).

## Purpose

Mimock is developed for the purpose of setting up mocks for REST endpoints without the hassle of maintaining any code for the mocks. The application exposes a React based UI which can be used by anyone with no prior coding experience to create and maintain mocks. 

If an UI application is build with configurable origin for the backend it is consuming, then mimock can be wired up in its place to serve the required reponse. This is applicable for backend services as well which rely on other API or services to process a request. 

Some example use cases are as follows,

- If your UI (Web or Mobile) relies on an external metered API which incurs cost based on the total hits, then mimock can be used in its place to mimick that API and serve the response on lower environments or CI/CD pipelines which runs UI automation tests
- If a backend API relies on another endpoint to download a PDF document and if that PDF server's latency is high which is not bearable for just testing the service locally or while running integration tests on pipelines, then mimock will come in handy for serving the required PDF document

## Download Options

### JAR with startup script

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

### Setup to run mimock locally

Ensure PostgreSQL is setup with an user and a schema for mimock to automatically complete the required table setup

`mimock.properties` - The bundle includes the properties file with the required configuration to start mimock. Check the config file and ensure the custom config items are properly setup

Download the bundle for the required platform from [above](#download-options) and run the following command to start mimock 

```shell
java -jar mimock.jar --spring.config.location=./mimock.properties
```

## Features

This section explains the features available in the Mimock application.

### Overview

Unique features offered by the Mimock utility tool is mentioned as follows,

- **Intuitive UI:** Provides an intuitive UI which lets anyone to manage mocks without any coding experience
- **No Re-Deployment:** Mocks can be added in real time and no application restart is required. Mocks are created/updated on-the-go which ensures faster development and turn-around time
- **Access Management:** The platform follows the role based user model and the admin can assign roles to the users to setup and restrict the access
- **Multi-Response:** With the multi-response feature support, setup your mock to serve a normal JSON response or a JPEG image file or even your desired PDF document

### Definitions and Explanations

#### User

User is the important entity for the Access management on this platform. The user can login to the platform to use the features both via API and UI.

#### UserRole

User role indicates the role for the particular user. Access management for this platform is role based and the user is mapped to one of the role as mentioned below,

    - ADMIN - A person who has access to all features of the platform and has control over the other users of the platform for access management. It is the super-user behaviour.
    - MANAGER - A person who has access to all features of the platform.
    - VIEWER - A person who has read-only access to the platform.

#### Mock

This is the primary resource of the platform.

A mock can have a name, description, route, httpMethod and so on as mentioned in the API model of the Mock entity.

The structure of mock entity mimics the actual endpoint. The mocks will be setup by the user via API or UI based upon their requirements. Whenever the actual endpoints are called, the request is intercepted and the stored mocked entity is called to test the API behaviour and expected response results.

#### Platform Settings

This entity contains the feature control of the platform for the every user.

Currently there is a single platform setting common for all users but in the upcoming releases these platform settings will be converted to an each user-specific setting and this will be permitted/restricted by the access management policies decided by the developers who are using the tool.

Some of the current settings include export/import of mocks, auto flush of recycle bin and so on.

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
