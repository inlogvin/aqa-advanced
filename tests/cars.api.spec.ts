import { CarsApiClient } from '@/api/CarsApiClient';
import { test, expect } from '@/fixtures';

test.describe('Cars (API)', () => {
  test('user can create a car with random brand, model and mileage', async ({ carsApiClient }) => {
    const brands = await carsApiClient.getBrands();
    const randomBrand = brands[Math.floor(Math.random() * brands.length)];

    const models = await carsApiClient.getModels(randomBrand.id);
    const randomModel = models[Math.floor(Math.random() * models.length)];

    const mileage = Math.floor(Math.random() * 101);

    const car = await carsApiClient.createCar(randomBrand.id, randomModel.id, mileage);

    expect(car.brand).toBe(randomBrand.title);
    expect(car.model).toBe(randomModel.title);
    expect(car.mileage).toBe(mileage);
  });

  test('error.Car brand is missind', async ({ carsApiClient}) => {
    const brands = await carsApiClient.getBrands();
    const randomBrand = brands[Math.floor(Math.random() * brands.length)];
    const models = await carsApiClient.getModels(randomBrand.id);
    const randomModel = models[Math.floor(Math.random() * models.length)];
    const mileage = Math.floor(Math.random() * 101);

    const response = await carsApiClient.createCarRaw({ carModelId: randomModel.id, mileage });
    expect(response.status()).toBe(400);

    const body = await response.json();
    expect(body).toEqual({ status: 'error', message: 'Car brand id is required' }); 

  })
});
