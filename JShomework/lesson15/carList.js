import { api } from "./apiClient.js";

export default class CarList {
  async getCarsList(sid) {
    const response = await api.get("/api/cars", { headers: { Cookie: sid } });
    return response;
  }
}
