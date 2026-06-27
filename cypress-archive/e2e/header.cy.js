describe("Header", () => {
  it("Successful login", () => {
    cy.visitHome();
    cy.get("button").contains("Sign In").click();
    cy.get("#signinEmail").type(Cypress.env("email"));
    cy.get("#signinPassword").type(Cypress.env("password"));
    cy.get("button.btn.btn-primary").contains("Login").click();
    cy.url().should("include", "/garage");
  });
  it("Fuel expenses tab", () => {
    cy.login();
    cy.get("a.header-link[routerlink=\"/panel/expenses\"]").click();
    cy.url().should("include", "/panel/expenses");
  });
  it("Garage tab", () => {
    cy.login();
    cy.get("a.header-link[routerlink=\"/panel/garage\"]").click();
    cy.url().should("include", "/panel/garage");
  });
  it("Instructions", () => {
    cy.login();
    cy.get("a.header-link[routerlink=\"/panel/instructions\"]").click();
    cy.url().should("include", "/panel/instructions");
  });
});
