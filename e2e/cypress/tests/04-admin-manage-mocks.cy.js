import data from "../test-data/mockData/textMockData";
import user from "../test-data/users.json";

describe("Mock management for admin", () => {
  before(() => {
    const { userName, password } = user.admin;
    cy.login(userName, password);
  });

  it("should add new mock with text response", () => {
    cy.getByTestId("add-mock-btn").click();

    cy.getByTestId("input-name").type(data.name);
    cy.getByTestId("input-description").type(data.description);
    cy.getByTestId("input-statusCode").type(data.statusCode);
    cy.getByTestId("input-route").type(data.route);
    cy.getByTestId("http-methods").select(data.httpMethod);

    cy.get("#panel-0-header")
      .click()
      .getByTestId("query-param-wrapper > view-mode > view-mode-code")
      .click()
      .getByTestId("query-param-text-input")
      .type(data.queryParams)
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
      .click();
    cy.get("#panel-0-header").click();

    cy.get("#panel-1-header")
      .click()
      .getByTestId("request-header-wrapper > view-mode > view-mode-code")
      .click()
      .getByTestId("request-header-text")
      .type(data.requestHeader.toString(), { parseSpecialCharSequences: false })
      .getByTestId("request-header-wrapper > view-mode > view-mode-text")
      .click()
      .getByTestId("save-requestHeader-button")
      .click();
    cy.get("#panel-1-header").click();

    cy.get("#panel-2-header")
      .click()
      .getByTestId("request-body-type")
      .select(data.requestBodyType)
      .getByTestId("request-body-wrapper > view-mode > view-mode-code")
      .click()
      .getByTestId("request-body-text-input")
      .type(data.requestBody, { parseSpecialCharSequences: false })
      .getByTestId("request-body-wrapper > view-mode > view-mode-text")
      .click()
      .getByTestId("save-requestBody-button")
      .click();
    cy.get("#panel-2-header").click();

    cy.get("#panel-3-header")
      .click()
      .get('[type="radio"]')
      .first()
      .check()
      .getByTestId("text-response")
      .clear()
      .type(data.expectedTextResponse, { parseSpecialCharSequences: false })
      .getByTestId("save-response-button")
      .click();
    cy.get("#panel-3-header").click();

    cy.get("#panel-4-header")
      .click()
      .getByTestId("response-headers-wrapper > view-mode > view-mode-code")
      .click()
      .getByTestId("response-header-text-input")
      .type(data.responseHeaders, { parseSpecialCharSequences: false })
      .getByTestId("response-headers-wrapper > view-mode > view-mode-text")
      .click()
      .getByTestId("save-responseHeader-button")
      .click();
    cy.get("#panel-4-header").click();

    cy.getByTestId("create-mock-button")
      .click()
      .get(".rnc__notification-message")
      .click({ multiple: true });

    let requestHeaders = "",
      requestBody = "",
      responseHeaders = "",
      textResponse = "";

    cy.getByTestId("detail-header-container").should("exist");
    cy.getByTestId("mock-badge").should("have.text", "POST");
    cy.getByTestId("mock-name").should("have.value", data.name);

    cy.getByTestId("request-pane")
      .click()
      .get('[data-testid="request-headers"] > code')
      .each(($el, idx, $ls) => {
        requestHeaders += $el.text();
        if (idx === $ls.length - 1) {
          const actual = JSON.parse(requestHeaders);
          const expected = JSON.parse(data.requestHeader.toString());
          expect(actual).to.eql(expected);
        }
      })
      .get('[data-testid="request-body"] > code')
      .each(($el, idx, $ls) => {
        requestBody += $el.text();
        if (idx === $ls.length - 1) {
          const actual = JSON.parse(requestBody);
          const expected = JSON.parse(data.requestBody.toString());
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
          const expected = JSON.parse(data.responseHeaders.toString());
          expect(actual).to.eql(expected);
        }
      })
      .get('[data-testid="expected-response"] > code')
      .each(($el, idx, $ls) => {
        textResponse += $el.text();
        if (idx === $ls.length - 1) {
          const actual = JSON.parse(textResponse);
          const expected = JSON.parse(data.expectedTextResponse.toString());
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
      .should("deep.equal", JSON.parse(data.expectedTextResponse.toString()));
  });
});
