/// <reference types="cypress" />

Cypress.Commands.add("visitHome", () => {
  cy.visit("/", {
    auth: {
      username: Cypress.env("basicAuth").username,
      password: Cypress.env("basicAuth").password,
    },
  });
});

Cypress.Commands.add("login", () => {
  cy.session("user", () => {
    cy.visitHome();
    cy.contains("button", "Sign In").click();
    cy.get("#signinEmail").type(Cypress.env("email"));
    cy.get("#signinPassword").type(Cypress.env("password"));
    cy.get("button.btn.btn-primary").contains("Login").click();
    cy.url().should("include", "/garage");
  });
  cy.visitHome();
});
