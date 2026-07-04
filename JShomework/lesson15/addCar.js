import { api } from "./apiClient.js";

export default class AddCar {
  async addCarToGarage(sid, carBrandId, carModelId, mileage) {
    const response = await api.post(
      "/api/cars",
      { carBrandId, carModelId, mileage },
      { headers: { Cookie: sid } },
    );
    return response;
  }
}
