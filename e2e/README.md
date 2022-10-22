# Mimock e2e tests

The test suites to cover the end-to-end flow for mimock has been set up using [cypress](https://docs.cypress.io/guides/overview/why-cypress). The tests will be run for every push to the main branch, and the same can be tracked [here](https://github.com/arbindo/mimock/actions/workflows/mimock-e2e.yml).

### To install cypress

```shell
npx cypress install
```

### To run the e2e tests locally

```shell
cd e2e

yarn start #This opens the cypress electron app to run tests interactively

yarn test #This runs the tests from the terminal using the default browser in headless mode
```

### To run and monitor the tests in real-time

```shell
cd e2e

yarn run:headed #This spins up a new chrome browser window for running the test suites
```