import garage from "../pages/Garage";
import expenses from "../pages/Expenses";

const EXPENSE_DATA = {
  mileage: 150,
  liters: 10,
  totalCost: 500,
};

describe("Successfull add car and expenses", () => {
  let createdCarId;

  before(() => {
    cy.loginByApi();
    cy.clearGarage();
  });

  beforeEach(() => {
    cy.loginByApi();
  });

  it("add car and fuel expense", () => {
    cy.visitWithAuth("/panel/garage");
    cy.intercept("POST", "/api/cars").as("createCar");

    garage.clickAddCarButton();
    garage
      .selectBrand(1)
      .selectModel(1)
      .typeMileage(90)
      .clickConfirmButton();

    cy.wait("@createCar").then(({ response }) => {
      expect(response.statusCode).to.eq(201);
      createdCarId = response.body.data.id;
      cy.log("Created car id:", createdCarId);
    });

    garage.successAlert.should("contain.text", "Car added");
  });

  it("getCars returns list containing the created car", () => {
    cy.getCars().then(({ status, body }) => {
      expect(status).to.eq(200);
      const car = body.data.find((c) => c.id === createdCarId);
      expect(car).to.exist;
      expect(car.mileage).to.eq(90);
    });
  });

  it("create expense via API and validate response", () => {
    const expensePayload = {
      carId: createdCarId,
      reportedAt: new Date().toISOString(),
      mileage: EXPENSE_DATA.mileage,
      liters: EXPENSE_DATA.liters,
      totalCost: EXPENSE_DATA.totalCost,
    };

    cy.createExpenseByApi(expensePayload).then(({ status, body }) => {
      expect(status).to.eq(200);
      expect(body.data.carId).to.eq(createdCarId);
      expect(body.data.mileage).to.eq(EXPENSE_DATA.mileage);
      expect(body.data.liters).to.eq(EXPENSE_DATA.liters);
      expect(body.data.totalCost).to.eq(EXPENSE_DATA.totalCost);
    });
  });

  it("UI shows created expense for the car", () => {
    cy.visitWithAuth("/panel/expenses");
    expenses.expensesTable.within(() => {
      cy.contains("td", EXPENSE_DATA.mileage).should("exist");
      cy.contains("td", `${EXPENSE_DATA.liters}L`).should("exist");
      cy.contains("td", `${EXPENSE_DATA.totalCost}.00 USD`).should("exist");
    });
  });
});
