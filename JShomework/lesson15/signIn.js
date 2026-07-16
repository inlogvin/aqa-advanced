import { api } from "./apiClient.js";

export default class SignIn {
  async auth(email, password) {
    const response = await api.post("/api/auth/signin", {
      email: email,
      password: password,
      remember: false,
    });
    return response;
  }
}
