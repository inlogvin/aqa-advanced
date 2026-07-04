import SignIn from "./signIn.js";
import jsonData from "./env.json";

const signIn = new SignIn();

test("Successful login", async () => {
  const response = await signIn.auth(jsonData.email, jsonData.password);
  expect(response.status).toEqual(200);
  expect(response.data.status).toEqual("ok");
});

test("Unsuccessful login, wrong password", async () => {
  const response = await signIn.auth(jsonData.email, "wrong_password");
  expect(response.status).toEqual(400);
  expect(response.data.status).toEqual("error");
});

test("Unsuccessful login, wrong mail", async () => {
  const response = await signIn.auth("wrong_mail", jsonData.password);
  expect(response.status).toEqual(400);
  expect(response.data.status).toEqual("error");
});
