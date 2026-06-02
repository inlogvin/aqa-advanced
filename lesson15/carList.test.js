import SignIn from "./signIn.js";
import CarList from "./carList.js";
import jsonData from "./env.json";

const signIn = new SignIn();
const carList = new CarList();

let sid;

beforeEach(async () => {
  const response = await signIn.auth(jsonData.email, jsonData.password);

  sid = response.headers["set-cookie"]
    .find((c) => c.startsWith("sid="))
    .split(";")[0];
});

test("Successful getting cars list", async () => {
  const response = await carList.getCarsList(sid);
  expect(response.status).toEqual(200);
  expect(response.data.status).toEqual("ok");
});

test("Invalid sid", async () => {
  const response = await carList.getCarsList("sid=invalid_garbage_123");
  expect(response.status).toEqual(401);
  expect(response.data.status).toEqual("error");
  expect(response.data.message).toEqual("Not authenticated");
});
