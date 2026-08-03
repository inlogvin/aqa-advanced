import { Page, Locator } from '@playwright/test';
import { BasePage } from '@/pages/BasePage.pom';

export class GaragePage extends BasePage {
  readonly heading: Locator;
  readonly addCarButton: Locator;
  readonly brandDropdown: Locator;
  readonly modelDropdown: Locator;
  readonly mileageInput: Locator;
  readonly addCarConfirmButton: Locator;
  readonly carItems: Locator;

  constructor(page: Page) {
    super(page, '/panel/garage');
    this.heading = page.getByRole('heading', { name: 'Garage' });
    this.addCarButton = page.getByRole('button', { name: 'Add car' });
    this.brandDropdown = page.locator('#addCarBrand');
    this.modelDropdown = page.locator('#addCarModel');
    this.mileageInput = page.locator('#addCarMileage');
    this.addCarConfirmButton = page.locator('.modal-footer button.btn-primary', { hasText: 'Add' });
    this.carItems = page.locator('.car-item');
  }

  async addCar(brand: string, model: string, mileage: number): Promise<void> {
    await this.addCarButton.click();
    await this.brandDropdown.selectOption({ label: brand });
    await this.modelDropdown.selectOption({ label: model });
    await this.mileageInput.fill(String(mileage));
    await this.addCarConfirmButton.click();
  }
}
