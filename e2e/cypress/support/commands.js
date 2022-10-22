// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//

Cypress.Commands.overwrite("visit", (originalFn, url = "/", options) => {
  originalFn(url);
});

Cypress.Commands.add("login", (userName, password) => {
  cy.visit("/")
    .clearCookies()
    .get('[data-testid="login-username-input"]')
    .type(userName)
    .get('[data-testid="login-password-input"]')
    .type(password)
    .get('[data-testid="login-submit"]')
    .click();

  cy.wait(2000);
});

Cypress.Commands.add("getByTestId", (testId) => {
  let processedTestId;
  if (testId.includes(">")) {
    processedTestId = testId
      .split(">")
      .map((item) => {
        return `[data-testid="${item.trim().toString()}"]`;
      })
      .join(" > ");
  } else {
    processedTestId = `[data-testid="${testId}"]`;
  }

  cy.get(processedTestId);
});

Cypress.Commands.add("waitForLoader", () => {
  cy.getByTestId("fullpage-loader").should("not.exist");
});
