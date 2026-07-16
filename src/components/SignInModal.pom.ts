import { Page, Locator } from '@playwright/test';

export class SignInModal {
  private readonly page: Page;
  readonly registrationTab: Locator;

  constructor(page: Page) {
    this.page = page;
    this.registrationTab = page.locator('button.btn-link', { hasText: 'Registration' });
  }

  async goToRegistration(): Promise<void> {
    await this.registrationTab.click();
  }
}
