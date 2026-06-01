import axios from "axios";
import jsonData from "./env.json";

const api = axios.create({
  baseURL: jsonData.baseUrl,
  auth: jsonData.basicAuth,
  validateStatus: () => true,
});

beforeEach(async () => {
  delete api.defaults.headers.Cookie;

  const response = await api.post("/api/auth/signin", {
    email: jsonData.email,
    password: jsonData.password,
    remember: false,
  });

  const sid = response.headers["set-cookie"]
    .find((c) => c.startsWith("sid="))
    .split(";")[0];

  api.defaults.headers.Cookie = sid;
});

test("Successful getting user profile", async () => {
  const response = await api.get("/api/users/profile");
  expect(response.status).toEqual(200);
  expect(response.data.status).toEqual("ok");
});

test("Successful getting cars brands", async () => {
  const response = await api.get("/api/cars/brands");
  expect(response.status).toEqual(200);
  expect(response.data.status).toEqual("ok");
});

test("Successful getting instructions for specific car", async () => {
  const response = await api.get("/api/instructions", {
    params: { carBrandId: 1, carModelId: 2, page: 1 },
  });
  expect(response.status).toEqual(200);
  expect(response.data.status).toEqual("ok");
  expect(response.data.data[0].carBrandId).toEqual(1);
  expect(response.data.data[0].carModelId).toEqual(2);
});

test("Invalid sid, profile request fails", async () => {
  const response = await api.get("/api/users/profile", {
    headers: { Cookie: "sid=invalid_garbage_123" },
  });
  expect(response.status).toEqual(401);
  expect(response.data.status).toEqual("error");
  expect(response.data.message).toEqual("Not authenticated");
});
