# Contribution guidelines

Mimock is carted with springboot and React JS. Contributions are welcome for both UI and backend and the following are some guidelines we can follow to create a stable environment for all the contributors

## Tests are must

It always encouraged to have proper unit tests covering all ciritcal scenarios. This is applicable for both UI and backend. Coverage threholds are set in place and if the limits are not met, then the pipeline checks are set to fail

## Automatic checks

Git hooks are available for the UI & backend, which will run the code checks automatically when a commit or push is triggered

- **Pre-commit hoomk** - This is applicable only for UI and the hook will run lint + formatting checks and unit tests for the staged files
- **Pre-push hook** - When a push event is triggered, the hook will run all the chekcs for both UI & backend to ensure the issues are not being leaked into the pipeline

## Workspace setup

### UI (React)

For UI, there are no specific requirements other than `Node 16+` and `yarn`. A few points to note are as follows,

- The UI package is not created using CRA, instead we setup the UI from scratch using webpack and required plugins to make it more customizable
- JSX control statements are added to the package, which lets us avoid conditional boiler plates,
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

  - The project uses `tailwind-styled-components` for styling and it is recommended to use the styled components instead of native html tags with inline styling

### Backend (Springboot)

The backend is powered by springboot and `java 8+` is required for setting up the project. The project relies on `PostgreSQL 13+` for persisting data and the Database is a must to start the application. A few points to note are as follows,

- The required tables are setup using `liquibase` migrations and the contributors are encouraged to add the table related changes are new liquibase changesets. This will ensure that the Database is up to date before the springboot application starts

### Support

Have questions? Good, you can always reach out to the community members [here](https://github.com/arbindo/mimock/discussions)

Happy mocking!

