import garage from "../pages/Garage";
import expenses from "../pages/Expenses";

describe("Successfull add car and expenses", () => {
  before(() => {
    cy.loginByApi();
    cy.clearGarage();
    cy.visitWithAuth("/panel/garage");
  });

  it("add car and fuel expense", () => {
    garage.clickAddCarButton();
    garage
      .selectBrand(1)
      .selectModel(1)
      .typeMileage(90)
      .clickConfirmButton();
    garage.successAlert.should("contain.text", "Car added");
    garage.clickExpenseButton();
    expenses
      .clearMileAge()
      .typeMileAge(100)
      .typeLiters(90)
      .typeCost(250)
      .clickConfirmExpenseButton();
    expenses.successAlert.should("contain.text", "Fuel expense added");
  });
});
