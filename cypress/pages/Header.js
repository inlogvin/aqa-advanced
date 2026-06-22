class Header {
  get signInButton() {
    return cy.get(".header_signin");
  }
  clickSignInButton() {
    this.signInButton.click();
  }
}
export default new Header();
