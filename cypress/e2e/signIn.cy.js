describe("Sign In", () => {
  beforeEach(() => {
    cy.visit("/", {
      auth: {
        username: Cypress.env("basicAuth").username,
        password: Cypress.env("basicAuth").password,
      },
    });
  });
  it("Successful login", () => {
    cy.get("button").contains("Sign In").click();
    cy.get("#signinEmail").type(Cypress.env("email"));
    cy.get("#signinPassword").type(Cypress.env("password"));
    cy.get("button.btn.btn-primary").contains("Login").click();
    cy.url().should("include", "/garage");
  });
});
