import users from "../test-data/users.json";
import queries from "../support/extensions/pgQueries";

describe("Admin", () => {
  before(() => {
    cy.task("queryTestDb", queries.deleteNonAdminUsers);
  });

  after(() => {
    cy.task("queryTestDb", queries.deleteNonAdminUsers);
  });

  beforeEach(() => {
    const { userName, password } = users.admin;
    cy.login(userName, password);
  });

  it("should land on dashboard", () => {
    cy.waitForLoader();

    cy.getByTestId("list-empty-container").should(
      "have.text",
      "No mocks to display!!!"
    );
    cy.getByTestId("menu-item-mocks").should("have.text", "MOCKS");
    cy.getByTestId("menu-item-users").should("have.text", "USERS");
  });

  it("should create and activate new user", () => {
    cy.getByTestId("menu-item-users").click().waitForLoader();
    cy.getByTestId("no-users-error").should(
      "have.text",
      'No users found. Click on "ADD USER" to create a new user'
    );

    cy.getByTestId("add-user-btn")
      .click()
      .getByTestId("input-name")
      .type("Manager")
      .getByTestId("input-userName")
      .type("manager")
      .getByTestId("input-password")
      .type("password")
      .getByTestId("input-confirmPassword")
      .type("password")
      .getByTestId("input-role")
      .select("MANAGER")
      .getByTestId("add-user-submit-button")
      .click();

    cy.waitForLoader()
      .getByTestId("edit-manager")
      .click()
      .get(".jss10")
      .check();

    cy.getByTestId("go-back-btn").click();
    cy.getByTestId("status-label-true").should("exist");
  });

  it("should update existing user role", () => {
    cy.visit("/mimock-ui/admin/users");

    cy.waitForLoader()
      .getByTestId("edit-manager")
      .click()
      .waitForLoader()
      .getByTestId("input-role")
      .select("VIEWER")
      .getByTestId("update-role-btn")
      .click()
      .getByTestId("confirmation-modal-confirm-btn")
      .click();

    cy.getByTestId("go-back-btn")
      .click()
      .waitForLoader()
      .getByTestId("role-pill-VIEWER")
      .should("have.text", "VIEWER");
  });

  it("should update existing user password", () => {
    const newPassword = "viewer123";

    cy.visit("/mimock-ui/admin/users");

    cy.waitForLoader()
      .getByTestId("edit-manager")
      .click()
      .waitForLoader()
      .getByTestId("update-password-btn")
      .click()
      .getByTestId("new-password-input")
      .type(newPassword)
      .getByTestId("confirm-password-input")
      .type(newPassword)
      .getByTestId("password-update-confirm-button")
      .click()
      .waitForLoader()
      .getByTestId("password-updated-date")
      .should("exist");
  });

  it("should delete existing user", () => {
    cy.getByTestId("menu-item-users")
      .click()
      .getByTestId("delete-manager")
      .click()
      .getByTestId("confirmation-modal-cancel-btn")
      .click()
      .getByTestId("delete-manager")
      .click()
      .getByTestId("confirmation-modal-confirm-btn")
      .click()
      .waitForLoader();

    cy.getByTestId("no-users-error").should("exist");
  });

  it("should update password", () => {
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

    const { userName, password } = users.admin;
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
      .click()
      .getByTestId("new-password-input")
      .type(password)
      .getByTestId("confirm-password-input")
      .type(password)
      .getByTestId("password-update-confirm-button")
      .click();
  });
});
