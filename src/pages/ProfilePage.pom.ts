import { Page, Locator } from '@playwright/test';
import { BasePage } from '@/pages/BasePage.pom';

export class ProfilePage extends BasePage {
    readonly name: Locator;
    readonly photo: Locator;

    constructor(page: Page){
    super(page, '/panel/profile');
    this.name = page.locator('.profile_name');
    this.photo = page.locator('.profile_photo');
    }
}