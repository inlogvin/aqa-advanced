import SignIn from "./signIn.js";
import AddCar from "./addCar.js";
import jsonData from "./env.json";

const signIn = new SignIn();
const addCar = new AddCar();

let sid;

beforeEach(async () => {
  const response = await signIn.auth(jsonData.email, jsonData.password);

  sid = response.headers["set-cookie"]
    .find((c) => c.startsWith("sid="))
    .split(";")[0];
});

test("Successful adding car", async () => {
  const response = await addCar.addCarToGarage(sid, 1, 5, 15310);
  expect(response.status).toEqual(201);
  expect(response.data.status).toEqual("ok");
});

test("Car data invalid", async () => {
  const response = await addCar.addCarToGarage(sid, 0, 0, 15310);
  expect(response.status).toEqual(404);
  expect(response.data.status).toEqual("error");
});

test("Car data is missing", async () => {
  const response = await addCar.addCarToGarage(sid, 0, 15310);
  expect(response.status).toEqual(400);
  expect(response.data.status).toEqual("error");
});
