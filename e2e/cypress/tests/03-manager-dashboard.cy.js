import users from "../test-data/users.json";
import roles from "../test-data/userRoles.json";

describe("Manager", () => {
  before(() => {
    cy.addUser(roles.manager);
  });

  after(() => {
    cy.deleteUser(roles.manager);
  });

  beforeEach(() => {
    const { userName, password } = users[roles.manager.toLowerCase()];
    cy.login(userName, password);
  });

  it("should land on dashboard", () => {
    cy.waitForLoader();

    cy.getByTestId("list-empty-container").should(
      "have.text",
      "No mocks to display!!!"
    );
    cy.getByTestId("menu-item-mocks").should("have.text", "MOCKS");
    cy.getByTestId("menu-item-users").should("not.exist");
  });

  it("should not be permitted to access user management", () => {
    cy.visit("/mimock-ui/admin/users");
    cy.getByTestId("permission-error-home-link").click();
    cy.waitForLoader();

    cy.getByTestId("list-empty-container").should(
      "have.text",
      "No mocks to display!!!"
    );
  });

  it("should update current password", () => {
    const newPassword = "password1";

    cy.getByTestId("menu-option-settings")
      .click()
      .waitForLoader()
      .getByTestId("update-password-btn")
      .click();

    cy.getByTestId("new-password-input")
      .type(newPassword)
      .getByTestId("confirm-password-input")
      .type(newPassword)
      .getByTestId("password-update-confirm-button")
      .click()
      .get(".rnc__notification-message")
      .click({ multiple: true })
      .getByTestId("menu-option-logout")
      .click()
      .waitForLoader();

    const { userName, password } = users.manager;
    cy.getByTestId("login-username-input")
      .type(userName)
      .getByTestId("login-password-input")
      .type(newPassword)
      .getByTestId("login-submit")
      .click()
      .waitForLoader();

    cy.getByTestId("menu-option-settings")
      .click()
      .waitForLoader()
      .getByTestId("update-password-btn")
      .click();

    cy.getByTestId("new-password-input")
      .type(password)
      .getByTestId("confirm-password-input")
      .type(password)
      .getByTestId("password-update-confirm-button")
      .click()
      .get(".rnc__notification-message")
      .click({ multiple: true });
  });
});
