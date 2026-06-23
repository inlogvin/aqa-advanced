class Garage {
  get garageMenuItem(){
    return cy.get("a[routerlink=\"garage\"]");
  }
  get addCarButton() {
    return cy.contains("button", "Add car");
  }
  get brandDropdown() {
    return cy.get("#addCarBrand");
  }
  get carModelDropdown() {
    return cy.get("#addCarModel");
  }
  get mileageInput() {
    return cy.get("#addCarMileage");
  }
  get cancelAddcarButton() {
    return cy.contains("button", "Cancel");
  }
  get addCarConfirmButton() {
    return cy.get(".modal-footer").contains("button", "Add");
  }
  get successAlert() {
    return cy.get("app-alert-list");
  }
  get addExpenseButton() {
    return cy.get(".car-item").last().find(".car_add-expense");
  }

  clickGarageMenu(){
    this.garageMenuItem.click();
  }
  clickAddCarButton(){
    this.addCarButton.click();
  }
  selectBrand(value) {
    this.brandDropdown.select(value);
    return this;
  }
  selectModel(value) {
    this.carModelDropdown.select(value);
    return this;
  }
  typeMileage(mileage) {
    this.mileageInput.type(mileage);
    return this;
  }
  clickCancelButton(){
    this.cancelAddcarButton.click();
  }
  clickConfirmButton(){
    this.addCarConfirmButton.click();
  }
  clickExpenseButton(){
    this.addExpenseButton.click();
  }
}
export default new Garage();
