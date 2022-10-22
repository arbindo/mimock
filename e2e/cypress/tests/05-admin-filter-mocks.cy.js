import users from "../test-data/users.json";
import queries from "../support/extensions/pgQueries";
import mockId from "../test-data/mockData/mockId";

describe("Admin", () => {
  before(() => {
    cy.task("queryTestDb", queries.deleteAllMocks)
      .task("queryTestDb", queries.deleteTextResponse)
      .task("queryTestDb", queries.deleteBinaryResponse)
      .task("queryTestDb", queries.insertTextResponse)
      .task("queryTestDb", queries.insertBinaryResponse)
      .task("queryTestDb", queries.insertTextMock)
      .task("queryTestDb", queries.insertBinaryMock)
      .task("queryTestDb", queries.insertArchivedMock)
      .task("queryTestDb", queries.insertDeletedMock);
  });

  after(() => {
    cy.task("queryTestDb", queries.deleteAllMocks)
      .task("queryTestDb", queries.deleteTextResponse)
      .task("queryTestDb", queries.deleteBinaryResponse);
  });

  beforeEach(() => {
    const { userName, password } = users.admin;
    cy.login(userName, password);
  });

  it("should filter mocks in dashboard", () => {
    cy.getByTestId("active-mocks-view-btn")
      .click()
      .waitForLoader()
      .getByTestId(`mock-card_${mockId.activeTextMockId}`)
      .should("exist")
      .getByTestId(`mock-card_${mockId.activeBinaryMock}`)
      .should("exist")
      .getByTestId("list-clear-filter-text")
      .click()
      .waitForLoader();

    cy.getByTestId("archived-mocks-view-btn")
      .click()
      .waitForLoader()
      .getByTestId(`mock-card_${mockId.archivedMock}`)
      .should("exist")
      .getByTestId("list-clear-filter-text")
      .click()
      .waitForLoader();

    cy.getByTestId("recycle-bin-mocks-view-btn")
      .click()
      .waitForLoader()
      .getByTestId(`mock-card_${mockId.deletedMock}`)
      .should("exist")
      .getByTestId("list-clear-filter-text")
      .click()
      .waitForLoader();

    cy.getByTestId("more-tools-btn").click();

    cy.getByTestId("response_type_0")
      .click()
      .waitForLoader()
      .getByTestId(`mock-card_${mockId.activeTextMockId}`)
      .should("exist");

    cy.getByTestId("response_type_1")
      .click()
      .waitForLoader()
      .getByTestId(`mock-card_${mockId.activeBinaryMock}`)
      .should("exist");
  });
});
