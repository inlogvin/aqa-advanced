import { APIRequestContext } from '@playwright/test';
import { APIResponse } from '@playwright/test';
import { CarBrand, CarModel, Car } from '@/utils/types';

export class CarsApiClient {
  private readonly request: APIRequestContext;

  constructor(request: APIRequestContext) {
    this.request = request;
  }

   async getBrands(): Promise<CarBrand[]> {
    const response = await this.request.get('/api/cars/brands');
    const { data } = await response.json();
    return data;
  }

   async getModels(carBrandId: number): Promise<CarModel[]> {
    const response = await this.request.get('/api/cars/models', { params: { carBrandId } });
    const { data } = await response.json();
    return data;
  }

   async createCar(carBrandId: number, carModelId: number, mileage: number): Promise<Car> {
    const response = await this.request.post('/api/cars', {
      data: { carBrandId, carModelId, mileage },
    });
    const { data } = await response.json();
    return data;
  }

  async createCarRaw(body: Record<string, unknown>): Promise<APIResponse> {
  return this.request.post('/api/cars', { data: body });
}

}