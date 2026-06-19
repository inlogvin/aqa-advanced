/// <reference types="cypress" />

Cypress.Commands.add("visitHome", () => {
  cy.visit("/", {
    auth: {
      username: Cypress.env("basicAuth").username,
      password: Cypress.env("basicAuth").password,
    },
  });
});

Cypress.Commands.add("login", (email = Cypress.env("email"), password = Cypress.env("password")) => {
  cy.session("user", () => {
    cy.visitHome();
    cy.contains("button", "Sign In").click();
    cy.get("#signinEmail").type(email);
    cy.get("#signinPassword").type(password, { sensitive: true });
    cy.get("button.btn.btn-primary").contains("Login").click();
    cy.url().should("include", "/garage");
  });
  cy.visitHome();
});

Cypress.Commands.overwrite("type", (originalFn, element, text, options) => {
  if (options && options.sensitive) {
    options.log = false;
    Cypress.log({
      $el: element,
      name: "type",
      message: "*".repeat(text.length),
    });
  }

  return originalFn(element, text, options);
});
