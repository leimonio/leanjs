/// <reference types="cypress" />

describe("Nextjs shell: error", () => {
  it("displays an error message when the remote app fails", () => {
    cy.intercept("**/remoteEntry.js", { statusCode: 500 });
    cy.visit("http://localhost:44440");

    cy.contains("Error: Failed to load script").should("be.visible");
  });

  it("displays an error message when the packageName of a remote app doesn't exist", () => {
    cy.visit("http://localhost:44440");
    cy.contains("React error page").click();
    cy.contains(
      /Error: Failed to load script.+i_dont_exist_but_have_a_default_error.+/
    ).should("be.visible");
  });

  it("displays a custom error message when using an error component", () => {
    cy.visit("http://localhost:44440/custom-react-error");
    cy.contains("Your app failed:").should("be.visible");
  });
});
