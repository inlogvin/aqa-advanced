class LoginPage {
  get emailSignInInput() {
    return cy.get("#signinEmail");
  }
  get passwordSignInInput() {
    return cy.get("#signinPassword");
  }
  get rememberMeCheckbox() {
    return cy.get("#remember");
  }
  get loginConfirmButton() {
    return cy.contains("button", "Login");
  }

  get closeModalButton() {
    return cy.get("[aria-label='Close']");
  }

  typeSignInEmail(email){
    this.emailSignInInput.type(email);
    return this;
  }
  typeSignInPassword(password){
    this.passwordSignInInput.type(password);
    return this;
  }
  setRememberMeCheckBox(){
    this.rememberMeCheckbox.check();
  }
  clickLoginConfirmButton(){
    this.loginConfirmButton.click();
  }
  clickCloseModalButton(){
    this.closeModalButton.click();
  }
}
export default new LoginPage();
