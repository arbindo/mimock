import users from "../test-data/users.json";

describe("Login", () => {
  it("should show dashboard when user is present", () => {
    const { userName, password } = users.admin;

    cy.visit()
      .getByTestId("login-username-input")
      .type(userName)
      .getByTestId("login-password-input")
      .type(password)
      .getByTestId("login-submit")
      .click();

    cy.getByTestId("header").should("exist");

    cy.getByTestId("menu-option-logout").click();
    cy.contains("Login to mimock");
  });

  it("should show login error when user is invalid", () => {
    const { userName, password } = users.invalid;

    cy.visit()
      .getByTestId("login-username-input")
      .type(userName)
      .getByTestId("login-password-input")
      .type(password)
      .getByTestId("login-submit")
      .click();

    cy.getByTestId("login-error-label").should(
      "have.text",
      "User login failed. Please try again."
    );
  });
});
