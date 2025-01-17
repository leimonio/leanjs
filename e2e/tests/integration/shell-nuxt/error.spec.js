/// <reference types="cypress" />

describe("Nuxtjs shell: error", () => {
  it.skip("displays an error message when the remote app fails", () => {
    cy.intercept("**/remoteEntry.js", { statusCode: 500 });
    cy.visit("http://localhost:44447");

    cy.contains("Error: Failed to load script").should("be.visible");
  });

  it.skip("displays a custom error message when using an error component", () => {
    cy.intercept("**/remoteEntry.js", { statusCode: 500 });
    cy.visit("http://localhost:44447/custom");
    cy.contains("Something went wrong").should("be.visible");
  });
});
