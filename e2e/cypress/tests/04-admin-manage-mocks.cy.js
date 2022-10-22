import { textMockData, imageMockData } from "../test-data/mockData";
import user from "../test-data/users.json";
import queries from "../support/extensions/pgQueries";

describe("Mock management for admin", () => {
  let mockId;

  before(() => {
    const { userName, password } = user.admin;
    cy.login(userName, password);
    cy.task("queryTestDb", queries.deleteAllMocks);
  });

  beforeEach(() => {
    const { userName, password } = user.admin;
    cy.login(userName, password);
  });

  after(() => {
    cy.task("queryTestDb", queries.deleteAllMocks);
  });

  it("should add new mock with text response", () => {
    cy.getByTestId("add-mock-btn").click();

    cy.getByTestId("input-name").type(textMockData.name);
    cy.getByTestId("input-description").type(textMockData.description);
    cy.getByTestId("input-statusCode").type(textMockData.statusCode);
    cy.getByTestId("input-route").type(textMockData.route);
    cy.getByTestId("http-methods").select(textMockData.httpMethod);

    cy.get("#query")
      .click()
      .getByTestId("query-param-wrapper > view-mode > view-mode-code")
      .click()
      .getByTestId("query-param-text-input")
      .type(textMockData.queryParams)
      .getByTestId("query-param-wrapper > view-mode > view-mode-text")
      .click()
      .getByTestId("remove-param-tooltip-0")
      .click()
      .getByTestId("queryParam_1_value")
      .clear()
      .type("2.0")
      .getByTestId("query-param-wrapper > view-mode > view-mode-code")
      .click()
      .getByTestId("query-param-wrapper > view-mode > view-mode-text")
      .click()
      .getByTestId("save-queryParam-button")
      .click()
      .getByTestId("add-param-button")
      .click()
      .getByTestId("queryParam_1_key")
      .type("includeImage")
      .getByTestId("queryParam_1_value")
      .type("true")
      .getByTestId("save-queryParam-button")
      .click()
      .get("#query")
      .click();

    cy.get("#requestHeader")
      .click()
      .getByTestId("request-header-wrapper > view-mode > view-mode-code")
      .click()
      .getByTestId("request-header-text")
      .type(textMockData.requestHeader.toString(), {
        parseSpecialCharSequences: false,
      })
      .getByTestId("request-header-wrapper > view-mode > view-mode-text")
      .click()
      .getByTestId("save-requestHeader-button")
      .click()
      .get("#requestHeader")
      .click();

    cy.get("#requestBody")
      .click()
      .getByTestId("request-body-type")
      .select(textMockData.requestBodyType)
      .getByTestId("request-body-wrapper > view-mode > view-mode-code")
      .click()
      .getByTestId("request-body-text-input")
      .type(textMockData.requestBody, { parseSpecialCharSequences: false })
      .getByTestId("request-body-wrapper > view-mode > view-mode-text")
      .click()
      .getByTestId("save-requestBody-button")
      .click()
      .get("#requestBody")
      .click();

    cy.get("#response")
      .click()
      .get('[type="radio"]')
      .first()
      .check()
      .getByTestId("text-response")
      .clear()
      .type(textMockData.expectedTextResponse, {
        parseSpecialCharSequences: false,
      })
      .getByTestId("save-response-button")
      .click()
      .get("#response")
      .click();

    cy.get("#responseHeaders")
      .click()
      .getByTestId("response-headers-wrapper > view-mode > view-mode-code")
      .click()
      .getByTestId("response-header-text-input")
      .type(textMockData.responseHeaders, { parseSpecialCharSequences: false })
      .getByTestId("response-headers-wrapper > view-mode > view-mode-text")
      .click()
      .getByTestId("save-responseHeader-button")
      .click()
      .get("#responseHeaders")
      .click();

    cy.getByTestId("create-mock-button").click();

    let requestHeaders = "",
      requestBody = "",
      responseHeaders = "",
      textResponse = "";

    cy.getByTestId("detail-header-container")
      .should("exist")
      .getByTestId("mock-badge")
      .should("have.text", "POST")
      .getByTestId("mock-name")
      .should("have.value", textMockData.name);

    cy.getByTestId("mock-id").should((el) => {
      mockId = el.val();
    });

    cy.getByTestId("request-pane")
      .click()
      .get('[data-testid="request-headers"] > code')
      .each(($el, idx, $ls) => {
        requestHeaders += $el.text();
        if (idx === $ls.length - 1) {
          const actual = JSON.parse(requestHeaders);
          const expected = JSON.parse(textMockData.requestHeader.toString());
          expect(actual).to.eql(expected);
        }
      })
      .get('[data-testid="request-body"] > code')
      .each(($el, idx, $ls) => {
        requestBody += $el.text();
        if (idx === $ls.length - 1) {
          const actual = JSON.parse(requestBody);
          const expected = JSON.parse(textMockData.requestBody.toString());
          expect(actual).to.eql(expected);
        }
      })
      .getByTestId("response-pane")
      .click()
      .get('[data-testid="response-header"] > code')
      .each(($el, idx, $ls) => {
        responseHeaders += $el.text();
        if (idx === $ls.length - 1) {
          const actual = JSON.parse(responseHeaders);
          const expected = JSON.parse(textMockData.responseHeaders.toString());
          expect(actual).to.eql(expected);
        }
      })
      .get('[data-testid="expected-response"] > code')
      .each(($el, idx, $ls) => {
        textResponse += $el.text();
        if (idx === $ls.length - 1) {
          const actual = JSON.parse(textResponse);
          const expected = JSON.parse(
            textMockData.expectedTextResponse.toString()
          );
          expect(actual).to.eql(expected);
        }
      });

    cy.request({
      method: "POST",
      url: "/search?includeImage=true&version=2.0",
      body: { galaxy: "unknown", shipName: "x-wing" },
      headers: { location: "London" },
    })
      .its("body")
      .should(
        "deep.equal",
        JSON.parse(textMockData.expectedTextResponse.toString())
      );
  });

  it("should add new mock with binary response", () => {
    cy.getByTestId("add-mock-btn").click();

    cy.getByTestId("input-name")
      .type(imageMockData.name)
      .getByTestId("input-description")
      .type(imageMockData.description)
      .getByTestId("input-statusCode")
      .type(imageMockData.statusCode)
      .getByTestId("input-route")
      .type(imageMockData.route)
      .getByTestId("http-methods")
      .select(imageMockData.httpMethod)
      .get("#response")
      .click()
      .get(":nth-child(2) > .MuiRadio-root > .PrivateSwitchBase-input")
      .check()
      .get("#response-types")
      .click()
      .get("#response-types")
      .type("webp")
      .get("#response-types-option-0")
      .click()
      .getByTestId("upload-input")
      .selectFile(imageMockData.expectedBinaryResponseFilePath, {
        force: true,
      })
      .getByTestId("uploaded-file-details")
      .should(($el) => {
        expect($el.text()).to.include(imageMockData.fileName);
      })
      .getByTestId("remove-file")
      .click()
      .getByTestId("upload-input")
      .selectFile(imageMockData.expectedBinaryResponseFilePath, {
        force: true,
        action: "drag-drop",
      })
      .getByTestId("save-response-button")
      .click()
      .getByTestId("create-mock-button")
      .click();

    cy.getByTestId("detail-header-container")
      .should("exist")
      .getByTestId("mock-badge")
      .should("have.text", "GET")
      .getByTestId("mock-name")
      .should("have.value", imageMockData.name);

    cy.getByTestId("response-pane")
      .click()
      .getByTestId("download-file")
      .click()
      .verifyDownload(".webp", { contains: true, timeout: 10000 });

    cy.request({
      method: "GET",
      url: imageMockData.route,
    })
      .its("status")
      .should("equal", 200);
  });

  it("should update existing mock", () => {
    cy.getByTestId(`mock-card_${mockId}`)
      .click()
      .getByTestId("edit-btn")
      .click()
      .waitForLoader()
      .get("#query")
      .click()
      .getByTestId("remove-param-tooltip-1")
      .click()
      .getByTestId("save-queryParam-button")
      .click()
      .getByTestId("update-mock-button")
      .click()
      .waitForLoader()
      .getByTestId("mock-query-params")
      .should("have.value", "includeImage=true");

    cy.request({
      method: "POST",
      url: "/search?includeImage=true",
      body: { galaxy: "unknown", shipName: "x-wing" },
      headers: { location: "London" },
    })
      .its("body")
      .should(
        "deep.equal",
        JSON.parse(textMockData.expectedTextResponse.toString())
      );
  });

  it("should archive and unarchive existing mock", () => {
    cy.getByTestId(`mock-card_${mockId}`)
      .click()
      .getByTestId("archive-btn")
      .click()
      .waitForLoader()
      .get(".bg-amber-400")
      .should("have.text", "ARCHIVED");

    cy.request({
      method: "POST",
      url: "/search?includeImage=true",
      body: { galaxy: "unknown", shipName: "x-wing" },
      headers: { location: "London" },
      failOnStatusCode: false,
    }).then((res) => {
      expect(res.status).to.eq(404);
    });

    cy.getByTestId("unarchive-btn")
      .click()
      .waitForLoader()
      .get(".bg-amber-400")
      .should("not.exist");

    cy.request({
      method: "POST",
      url: "/search?includeImage=true",
      body: { galaxy: "unknown", shipName: "x-wing" },
      headers: { location: "London" },
    })
      .its("body")
      .should(
        "deep.equal",
        JSON.parse(textMockData.expectedTextResponse.toString())
      );
  });

  it("should delete existing mock", () => {
    cy.getByTestId(`mock-card_${mockId}`)
      .click()
      .getByTestId("delete-btn")
      .click()
      .getByTestId("confirmation-modal-confirm-btn")
      .click()
      .waitForLoader()
      .get(".bg-red-400")
      .should("have.text", "DELETED")
      .getByTestId("warning-message-operations")
      .should("exist");

    cy.request({
      method: "POST",
      url: "/search?includeImage=true",
      body: { galaxy: "unknown", shipName: "x-wing" },
      headers: { location: "London" },
      failOnStatusCode: false,
    }).then((res) => {
      expect(res.status).to.eq(404);
    });
  });
});
