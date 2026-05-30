import axios from "axios";
import jsonData from "./env.json";
import fs from "fs";
import path from "path";

test("Successful user login", async () => {
  var response = await axios.post(
    `${jsonData.baseUrl}/api/auth/signin`,
    {
      email: jsonData.email,
      password: jsonData.password,
      remember: false,
    },
    {
      headers: {
        "Content-Type": "application/json",
      },
      auth: jsonData.basicAuth,
    },
  );
  console.log(response.data);
  expect(response.status).toEqual(200);
  expect(response.data.status).toEqual("ok");

  let sid = response.headers["set-cookie"]
    .find((c) => c.startsWith("sid="))
    .split(";")[0];
  jsonData.sid = sid;
  fs.writeFileSync(
    path.join(process.cwd(), "lesson14", "env.json"),
    JSON.stringify(jsonData, null, 2),
  );
});

test("Successful getting user profile", async () => {
  var response = await axios.get(`${jsonData.baseUrl}/api/users/profile`, {
    headers: { Cookie: jsonData.sid },
  });
  console.log(response.data);
  expect(response.status).toEqual(200);
  expect(response.data.status).toEqual("ok");
});

test("Successful getting cars brands", async () => {
  var response = await axios.get(`${jsonData.baseUrl}/api/cars/brands`, {
    headers: { Cookie: jsonData.sid },
  });
  console.log(response.data);
  expect(response.status).toEqual(200);
  expect(response.data.status).toEqual("ok");
});

test("Successful getting instructions for specific car", async () => {
  var response = await axios.get(`${jsonData.baseUrl}/api/instructions`, {
    headers: { Cookie: jsonData.sid },
    params: { carBrandId: 1, carModelId: 2, page: 1 },
  });
  console.log(response.data);
  expect(response.data.data[0].carBrandId).toEqual(1);
  expect(response.data.data[0].carModelId).toEqual(2);
  expect(response.status).toEqual(200);
  expect(response.data.status).toEqual("ok");
});

test("Invalid sid, profile request fails", async () => {
  var response = await axios.get(`${jsonData.baseUrl}/api/users/profile`, {
    headers: { Cookie: "sid=invalid_garbage_123" },
    validateStatus: () => true,
  });
  console.log(response.data);
  expect(response.status).toEqual(401);
  expect(response.data.status).toEqual("error");
  expect(response.data.message).toEqual("Not authenticated");
});
