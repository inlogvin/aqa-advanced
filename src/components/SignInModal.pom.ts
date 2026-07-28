import { Page, Locator } from '@playwright/test';

export class SignInModal {
  private readonly page: Page;
  readonly registrationTab: Locator;
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.registrationTab = page.locator('button.btn-link', { hasText: 'Registration' });
    this.emailInput = page.locator('#signinEmail');
    this.passwordInput = page.locator('#signinPassword');
    this.loginButton = page.locator('button.btn-primary', { hasText: 'Login' });
  }

  async goToRegistration(): Promise<void> {
    await this.registrationTab.click();
  }

  async login(email: string, password: string): Promise<void> {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }
}
