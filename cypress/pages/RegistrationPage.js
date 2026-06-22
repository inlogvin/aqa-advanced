class RegistrationPage {
  get registrationButton() {
    return cy.contains("button", "Registration");
  }

  get nameInput() {
    return cy.get("#signupName");
  }
  get lastNameInput() {
    return cy.get("#signupLastName");
  }
  get emailInput() {
    return cy.get("#signupEmail");
  }
  get passwordInput() {
    return cy.get("#signupPassword");
  }
  get passwordReInput() {
    return cy.get("#signupRepeatPassword");
  }
  get registerConfirmButton() {
    return cy.contains("button", "Register");
  }

  get closeModalButton() {
    return cy.get("[aria-label='Close']");
  }
  typeName(name){
    this.nameInput.type(name);
    return this;
  }
  typeLastName(lastName){
    this.lastNameInput.type(lastName);
    return this;
  }
  typeEmail(email){
    this.emailInput.type(email);
    return this;
  }
  typePassword(password){
    this.passwordInput.type(password, { sensitive: true });
    return this;
  }
  typePasswordReInput(password){
    this.passwordReInput.type(password, { sensitive: true });
    return this;
  }
  clickRegisterButton(){
    this.registerConfirmButton.click();
  }
  clickCloseModalButton(){
    this.closeModalButton.click();
  }
}

export default new RegistrationPage();
