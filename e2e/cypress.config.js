const { defineConfig } = require("cypress");

module.exports = defineConfig({
  projectId: "1j76yz",
  e2e: {
    baseUrl: "https://localhost:8080",
    experimentalStudio: true,
    specPattern: "cypress/**/*.cy.{js,ts}",
    setupNodeEvents(on, config) {
      on("task", {});
    },
  },
});
