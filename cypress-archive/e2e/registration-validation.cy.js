import registrationPage from "../pages/RegistrationPage";
import header from "../pages/Header";
import { ERROR_MESSAGES } from "../data/errorMessages";

describe("Registration form validation", () => {
  beforeEach(() => {
    cy.visitHome();
    header.clickSignInButton();
    registrationPage.registrationButton.click();
  });
  describe("Name field validation", () => {


    it("error when name is empty", () => {
      registrationPage.nameInput.focus().blur();
      cy.contains(ERROR_MESSAGES.name.required).should("be.visible"); });


    it("error when name is invalid", () => {
      registrationPage.nameInput.type("Тест1").blur();
      cy.contains(ERROR_MESSAGES.name.invalid).should("be.visible");
    });

    it("name is too short error", () => {
      registrationPage.nameInput.type("n").blur();
      cy.contains(ERROR_MESSAGES.name.length).should("be.visible");
    });
    it("name is too long error", () => {
      registrationPage.nameInput.type("nameIsTooLongnameIsTooLong").blur();
      cy.contains(ERROR_MESSAGES.name.length).should("be.visible");});
  });

  describe("Last name validation", () => {
    it("error when last name is empty", () => {
      registrationPage.lastNameInput.focus().blur();
      cy.contains(ERROR_MESSAGES.lastName.required).should("be.visible");
    });
    it("error when last name is invalid", () => {
      registrationPage.lastNameInput.type("Тест2").blur();
      cy.contains(ERROR_MESSAGES.lastName.invalid).should("be.visible");
    });
    it("last name is too short error", () => {
      registrationPage.lastNameInput.type("n").blur();
      cy.contains(ERROR_MESSAGES.lastName.length).should("be.visible");
    });
    it("last name is too long error", () => {
      registrationPage.lastNameInput.type("lastNameIsTooLongnameIsTooLong").blur();
      cy.contains(ERROR_MESSAGES.lastName.length).should("be.visible");});
  });
  describe("Email validation", () => {
    it ("error when email is empty", () => {
      registrationPage.emailInput.focus().blur();
      cy.contains(ERROR_MESSAGES.email.required).should("be.visible");
    });
    it("error when email is invalid", () => {
      registrationPage.emailInput.type("testgmail.com").blur();
      cy.contains(ERROR_MESSAGES.email.invalid).should("be.visible");
    });
  });

  describe("Password validation", () => {
    it("error when password is empty", () => {
      registrationPage.passwordInput.focus().blur();
      cy.contains(ERROR_MESSAGES.password.required).should("be.visible");
    });
    it("error when password is invalid", () => {
      registrationPage.passwordInput.type("password").blur();
      cy.contains(ERROR_MESSAGES.password.invalid).should("be.visible");
    });
    it("long password error", () => {
      registrationPage.passwordInput.type("aA321321321!aA321321321!").blur();
      cy.contains(ERROR_MESSAGES.password.invalid).should("be.visible");
    });
    it("short password error", () => {
      registrationPage.passwordInput.type("aA321!").blur();
      cy.contains(ERROR_MESSAGES.password.invalid).should("be.visible");
    });
  });
  describe("Re-enter password validation", () => {
    it("error when re-enter password is empty", () => {
      registrationPage.passwordReInput.focus().blur();
      cy.contains(ERROR_MESSAGES.rePassword.required).should("be.visible");
    });
    it("error when passwords do not match", () => {
      registrationPage.passwordInput.type("Test1234!");
      registrationPage.passwordReInput.type("Test5678!").blur();
      cy.contains(ERROR_MESSAGES.rePassword.mismatch).should("be.visible");
    });
  });

  describe("Error color border validation", () => {
    it("red error border", () => {
      registrationPage.nameInput.type("Тест1").blur();
      registrationPage.nameInput.should("have.class", "is-invalid");
    });
  });
});

