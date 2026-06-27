class Expenses {
  get mileAgeInput() {
    return cy.get("#addExpenseMileage");
  }
  get litersInput() {
    return cy.get("#addExpenseLiters");
  }
  get costInput() {
    return cy.get("#addExpenseTotalCost");
  }
  get cancelButton() {
    return cy.contains("button", "Cancel");
  }
  get addExpenseConfirmButton() {
    return cy.get(".modal-footer").contains("button", "Add");
  }
  get successAlert() {
    return cy.get("app-alert-list");
  }
  get expensesTable() {
    return cy.get(".expenses_table tbody");
  }
  clearMileAge(){
    this.mileAgeInput.clear();
    return this;
  }
  typeMileAge(miles){
    this.mileAgeInput.type(miles);
    return this;
  }
  typeLiters(liters) {
    this.litersInput.type(liters);
    return this;
  }
  typeCost(cost){
    this.costInput.type(cost);
    return this;
  }
  clickCancelButton(){
    this.cancelButton.click();
  }
  clickConfirmExpenseButton(){
    this.addExpenseConfirmButton.click();
  }
}
export default new Expenses();
