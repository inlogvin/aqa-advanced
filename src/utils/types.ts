export interface UserRegistrationData {
  name: string;
  lastName: string;
  email: string;
  password: string;
}
export interface CarBrand {
  id: number;
  title: string;
  logoFilename: string;
}

export interface CarModel {
  id: number;
  carBrandId: number;
  title: string;
}

export interface Car {
  id: number;
  carBrandId: number;
  carModelId: number;
  initialMileage: number;
  mileage: number;
  brand: string;
  model: string;
  logo: string;
}
