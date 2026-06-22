import { faker } from "@faker-js/faker";
import registrationPage from "../pages/RegistrationPage";
import header from "../pages/Header";
import loginPage from "../pages/LoginPage";

describe("Successfull registration", () => {
  const user = {
    name: faker.person.firstName().replace(/[^a-zA-Z]/g, "").trim().slice(0, 20).padEnd(2, "a"),
    lastName: faker.person.lastName().replace(/[^a-zA-Z]/g, "").trim().slice(0, 20).padEnd(2, "a"),
    email: faker.internet.email(),
    password: "Test1234!",
  };

  beforeEach(() => {
    cy.visitHome();
  });

  it("register a new user successfully", () => {
    header.clickSignInButton();
    registrationPage.registrationButton.click();
    registrationPage
      .typeName(user.name)
      .typeLastName(user.lastName)
      .typeEmail(user.email)
      .typePassword(user.password)
      .typePasswordReInput(user.password);
    registrationPage.clickRegisterButton();

    cy.url().should("include", "/garage");
  });
  it("registered user login", () => {
    header.clickSignInButton();
    loginPage
      .typeSignInEmail(user.email)
      .typeSignInPassword(user.password);
    loginPage.clickLoginConfirmButton();
    cy.url().should("include", "/garage");
  });

});
