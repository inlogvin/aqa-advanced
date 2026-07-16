import { Page, Locator } from '@playwright/test';
import { BasePage } from '@/pages/BasePage.pom';
import { UserRegistrationData } from '@/utils/types';

export class RegistrationPage extends BasePage {
  readonly nameInput: Locator;
  readonly lastNameInput: Locator;
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly repeatPasswordInput: Locator;
  readonly registerButton: Locator;
  readonly errorMessage: Locator;
  readonly heading: Locator;


  constructor(page: Page) {
    super(page, '/');
    this.heading = page.getByRole('heading', { name: 'Registration' });
    this.nameInput = page.locator('#signupName');
    this.lastNameInput = page.locator('#signupLastName');
    this.emailInput = page.locator('#signupEmail');
    this.passwordInput = page.locator('#signupPassword');
    this.repeatPasswordInput = page.locator('#signupRepeatPassword');
    this.registerButton = page.locator('button.btn-primary', { hasText: 'Register' });
    this.errorMessage = page.locator('.invalid-feedback');
  }

  async register(user: UserRegistrationData): Promise<void> {
    await this.nameInput.fill(user.name);
    await this.lastNameInput.fill(user.lastName);
    await this.emailInput.fill(user.email);
    await this.passwordInput.fill(user.password);
    await this.repeatPasswordInput.fill(user.password);
    await this.registerButton.click();
  }
}
