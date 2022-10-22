import users from "../test-data/users.json";
import roles from "../test-data/userRoles.json";
import queries from "../support/extensions/pgQueries";

describe("Manager", () => {
  before(() => {
    const { userName, name } = users[roles.manager.toLowerCase()];

    cy.task("queryTestDb", queries.deleteNonAdminUsers);

    cy.task(
      "queryTestDb",
      `
        insert into users(user_id, name, user_name, password, is_user_active, role_id, created_at)
        values (gen_random_uuid(), '${name}', '${userName}', '$2a$12$ZlN1NFw1WRhLb7Hn1BSFt.W.PkWjRa/I598Aab/WuXP4PM0QH9yau', 
        true, (select id from user_roles where role_name = 'MANAGER') , current_timestamp)
     `
    );
  });

  after(() => {
    cy.task("queryTestDb", queries.deleteNonAdminUsers);
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
      .waitForLoader()
      .getByTestId("update-password-container")
      .should("exist");
  });
});
