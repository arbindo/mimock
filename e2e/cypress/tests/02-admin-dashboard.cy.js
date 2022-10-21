import users from "../test-data/users.json";

describe("Admin", () => {
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
    cy.getByTestId("menu-item-users").click();
    cy.waitForLoader();
    cy.getByTestId("no-users-error").should(
      "have.text",
      'No users found. Click on "ADD USER" to create a new user'
    );
    cy.getByTestId("add-user-btn").click();

    cy.getByTestId("input-name").type("Manager");
    cy.getByTestId("input-userName").type("manager");
    cy.getByTestId("input-password").type("password");
    cy.getByTestId("input-confirmPassword").type("password");
    cy.getByTestId("input-role").select("MANAGER");
    cy.getByTestId("add-user-submit-button").click();

    cy.getByTestId("edit-manager").click();
    cy.get(".jss10").check();
    cy.get(".rnc__notification-title").click({ multiple: true });

    cy.getByTestId("go-back-btn").click();
    cy.getByTestId("status-label-true").should("exist");
  });

  it("should delete existing user", () => {
    cy.getByTestId("menu-item-users").click();

    cy.getByTestId("delete-manager").click();
    cy.getByTestId("confirmation-modal-cancel-btn").click();
    cy.getByTestId("delete-manager").click();
    cy.getByTestId("confirmation-modal-confirm-btn").click();
    cy.get(".rnc__notification-title").click({ multiple: true });

    cy.getByTestId("no-users-error").should("exist");
  });
});
