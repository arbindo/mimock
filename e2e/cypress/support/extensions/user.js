import users from "../../test-data/users.json";

Cypress.Commands.add("addUser", (roleName) => {
  const admin = users.admin;
  const { userName, name, password } = users[roleName.toLowerCase()];

  cy.login(admin.userName, admin.password)
    .waitForLoader()
    .visit("/mimock-ui/admin/users")
    .waitForLoader();

  cy.getByTestId("add-user-btn")
    .click()
    .getByTestId("input-name")
    .type(name)
    .getByTestId("input-userName")
    .type(userName)
    .getByTestId("input-password")
    .type(password)
    .getByTestId("input-confirmPassword")
    .type(password)
    .getByTestId("input-role")
    .select(roleName.toString())
    .getByTestId("add-user-submit-button")
    .click()
    .waitForLoader();

  cy.getByTestId("edit-manager")
    .click()
    .get(".jss10")
    .check()
    .get(".rnc__notification-title")
    .click({ multiple: true });
});

Cypress.Commands.add("deleteUser", () => {
  const admin = users.admin;

  cy.login(admin.userName, admin.password)
    .waitForLoader()
    .visit("/mimock-ui/admin/users")
    .waitForLoader();

  cy.getByTestId("delete-manager")
    .click()
    .getByTestId("confirmation-modal-cancel-btn")
    .click()
    .getByTestId("delete-manager")
    .click()
    .getByTestId("confirmation-modal-confirm-btn")
    .click()
    .get(".rnc__notification-title")
    .click({ multiple: true });
});
