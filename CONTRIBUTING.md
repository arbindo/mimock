# Contribution guidelines

Mimock is carted with springboot and React JS. Contributions are welcome for both UI and backend and the following are some guidelines we can follow to create a stable environment for all the contributors

## Tests are a must

It is always encouraged to have proper unit tests covering all critical scenarios. This is applicable for both UI and backend. Coverage thresholds are set in place and if the limits are not met, then the pipeline checks are set to fail

## Automatic checks

Git hooks are available for the UI & backend, which will run the code checks automatically when a commit or push is triggered

- **Pre-commit hook** - This is applicable only for UI and the hook will run lint + formatting checks and unit tests for the staged files
- **Pre-push hook** - When a push event is triggered, the hook will run all the checks for both UI & backend to ensure the issues are not being leaked into the pipeline

## Workspace setup

### UI (React)

For UI, there are no specific requirements other than `Node 16+` and `yarn`. A few points to note are as follows,

- The UI package is not created using CRA, instead, we set up the UI from scratch using webpack and required plugins to make it more customizable
- JSX control statements are added to the package, which lets us avoid conditional boilerplates,
  - E.g:

    ```javascript
    // instead of this
    <>
      { isUserLoggedId ? <div>User is logged in</div> : null
    </>
    
    // jsx control statements will let you do this
    <If condition={isUserLoggedId}>
      <div>User is logged in</div>
    </If>
    ```
    This will come in handy if the conditional block is complicated

  - The project uses `tailwind-styled-components` for styling and it is recommended to use the styled-components instead of native HTML tags with inline styling

### Backend (Springboot)

The backend is powered by springboot and `java 8+` is required for setting up the project. The project relies on `PostgreSQL 13+` for persisting data and the Database is a must to start the application. A few points to note are as follows,

- The repository includes the [Dockerfile.pg](Dockerfile.pg) file to spin up a PostgreSQL container. This will come in handy for backend development

```shell
# To build the image
docker build -t mimock-pg-database . -f Dockerfile.pg

# To start the container
docker run --name mimock-db -d -p 5427:5432 mimock-pg-database
```

- The required tables are set up using `liquibase` migrations and the contributors are encouraged to add the table-related changes as new liquibase changesets. This will ensure that the Database is up to date before the springboot application starts

## Starting the application

**Starting the UI**

Install the dependencies and start the UI

```shell
cd mimock-ui

yarn

yarn start
```

The UI app will be available on [http://localhost:3000](http://localhost:3000)

**Starting the Backend**

The backend can be started using the following command

```shell
cd ./mimock-backend

./mvnw spring-boot:run -Dspring-boot.run.profiles=dev
```

Use the following default user to login

| Username       | Password   | Role    |
| -------------- | ---------- | ------- |
| `mimock_admin` | `password` | `ADMIN` |

## UI Format check + Lint

```shell
yarn format:check

yarn lint:all
```

## Running Tests

**UI Tests**

```shell
yarn test
```

**Backend tests**

```shell
./mvnw -ntp clean initialize verify -P startDatabase -P coverage -Dspring.config.location=classpath:/application.yml
```

**End-to-end tests**

Any breaking change to the UI or backend will need changes to the existing e2e test suites. To run the e2e tests locally, follow [these instructions](https://github.com/arbindo/mimock/blob/main/e2e/README.md)

## Raising a Pull Request

To push your development contributions to mimock, fork this repo and commit your changes to a new branch in the forked repo. Once the changes are finalized, raise a PR to the `main` branch of this repo. The following are some guidelines to get the PRs reviewed with ease

- Ensure the commit messages state the change precisely
- Add the area of change as a prefix to the PR. `E.g: UI: Fix user sorting order`
- Ensure that supporting test cases (unit tests or e2e tests) are in place
- The PR will go through code review from the maintainers. If the PR needs quick attention, then tag `@maintainers` in the discussions

### Support

Have questions? You can reach out to the community members using the following channels

- [Discussions](https://github.com/arbindo/mimock/discussions)
- [Slack](https://mimock.slack.com)

Happy mocking!
