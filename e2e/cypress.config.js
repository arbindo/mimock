const { defineConfig } = require("cypress");

module.exports = defineConfig({
  projectId: "1j76yz",
  execTimeout: 10000,
  requestTimeout: 10000,
  pageLoadTimeout: 5000,
  taskTimeout: 10000,
  defaultCommandTimeout: 10000,
  e2e: {
    baseUrl: "https://localhost:8080",
    experimentalStudio: true,
    specPattern: "cypress/**/*.cy.{js,ts}",
    setupNodeEvents(on, config) {
      on("task", {});
    },
  },
});
