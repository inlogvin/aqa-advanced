import {Page, Locator} from '@playwright/test';

export class Header {
    private readonly page: Page;
    readonly signInButton: Locator;

    constructor(page: Page){
        this.page = page;
        this.signInButton = page.locator('button.btn-outline-white');
    }

    async openSignIn(): Promise<void>{
        await this.signInButton.click();
    }
}