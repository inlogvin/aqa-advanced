/// <reference types="cypress" />

Cypress.Commands.add("visitHome", () => {
  cy.visit("/", {
    auth: {
      username: Cypress.env("basicAuth").username,
      password: Cypress.env("basicAuth").password,
    },
  });
});

Cypress.Commands.add("loginByApi", () => {
  cy.session("apiUser", () => {
    cy.request({
      method: "POST",
      url: "/api/auth/signin",
      auth: {
        username: Cypress.env("basicAuth").username,
        password: Cypress.env("basicAuth").password,
      },
      body: {
        email: Cypress.env("email"),
        password: Cypress.env("password"),
      },
    });
  });
});

Cypress.Commands.add("visitWithAuth", (path) => {
  cy.visit(path, {
    auth: {
      username: Cypress.env("basicAuth").username,
      password: Cypress.env("basicAuth").password,
    },
  });
});

Cypress.Commands.add("clearGarage", () => {
  cy.request("GET", "/api/cars").then(({ body }) => {
    body.data.forEach((car) => {
      cy.request("DELETE", `/api/cars/${car.id}`);
    });
  });
});

Cypress.Commands.add("getCars", () => {
  cy.request({
    method: "GET",
    url: "/api/cars",
  });
});

Cypress.Commands.add("createExpenseByApi", (expenseData) => {
  cy.request({
    method: "POST",
    url: "/api/expenses",
    body: expenseData,
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
