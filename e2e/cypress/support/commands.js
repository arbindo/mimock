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
  cy.viewport(1280, 1000);
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
  cy.get(`[data-testid="${testId}"]`);
});

Cypress.Commands.add("waitForLoader", () => {
  cy.getByTestId("fullpage-loader").should("not.exist");
});
