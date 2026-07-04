import { test, expect } from '@playwright/test';
import { faker } from '@faker-js/faker';
import { ERROR_MESSAGES } from '@/utils/errorMessages';



const user = {
  name: faker.person.firstName('male').replace(/[^a-zA-Z]/g, '').slice(0, 20),
  lastName: faker.person.lastName().replace(/[^a-zA-Z]/g, '').slice(0, 20),
  email: `aqa_${faker.internet.email()}`,
  password: 'Test1234!'
};


test.describe('Registration form', () => {
    test.beforeEach(async ({ page }) => {
    await page.goto('/');  
    await page.locator('button.btn-outline-white').click();
    await page.locator('button.btn-link', { hasText: 'Registration' }).click();
  });
  test.describe('Positive cases', () => { 
    test('Successful registration', async ({page}) => 
    {
        await expect(page.getByRole('heading', { name: 'Registration' })).toBeVisible();
        await page.locator('#signupName').fill(user.name);
        await page.locator('#signupLastName').fill(user.lastName);
        await page.locator('#signupEmail').fill(user.email);
        await page.locator('#signupPassword').fill(user.password);
        await page.locator('#signupRepeatPassword').fill(user.password);
        await page.locator('button.btn-primary', { hasText: 'Register' }).click();
        await expect(page).toHaveURL('/panel/garage');
    })
   })
  test.describe('Negative cases', () => {
    test('error when name is empty', async ({ page }) => {
      await page.locator('#signupName').focus();
      await page.locator('#signupName').blur();
      await expect(page.locator('.invalid-feedback')).toHaveText(ERROR_MESSAGES.name.required);
    })

    test('error when name is invalid', async ({ page }) => {
      await page.locator('#signupName').fill('Ім`я1');
      await page.locator('#signupName').blur();
      await expect(page.locator('.invalid-feedback')).toHaveText(ERROR_MESSAGES.name.invalid);
    })

    test('error when last name is empty', async ({ page }) => {
      await page.locator('#signupLastName').focus();
      await page.locator('#signupLastName').blur();
      await expect(page.locator('.invalid-feedback')).toHaveText(ERROR_MESSAGES.lastName.required);
    })

    test('error when last name is invalid', async ({ page }) => {
      await page.locator('#signupLastName').fill('Прізвище');
      await page.locator('#signupLastName').blur();
      await expect(page.locator('.invalid-feedback')).toHaveText(ERROR_MESSAGES.lastName.invalid);
    })

    test('error when email is empty', async ({ page }) => {
      await page.locator('#signupEmail').focus();
      await page.locator('#signupEmail').blur();
      await expect(page.locator('.invalid-feedback')).toHaveText(ERROR_MESSAGES.email.required);
    })


    test('error when email is invalid', async ({ page }) => {
      await page.locator('#signupEmail').fill('testgmail.com');
      await page.locator('#signupEmail').blur();
      await expect(page.locator('.invalid-feedback')).toHaveText(ERROR_MESSAGES.email.invalid);
    })

    test('error when password is empty', async ({ page }) => {
      await page.locator('#signupPassword').focus();
      await page.locator('#signupPassword').blur();
      await expect(page.locator('.invalid-feedback')).toHaveText(ERROR_MESSAGES.password.required);
    })

    test('error when password is invalid', async ({ page }) => {
      await page.locator('#signupPassword').fill('password');
      await page.locator('#signupPassword').blur();
      await expect(page.locator('.invalid-feedback')).toHaveText(ERROR_MESSAGES.password.invalid);
    })

    test('error when re-enter password is empty', async ({ page }) => {
      await page.locator('#signupRepeatPassword').focus();
      await page.locator('#signupRepeatPassword').blur();
      await expect(page.locator('.invalid-feedback')).toHaveText(ERROR_MESSAGES.rePassword.required);
    })

    test('error when passwords do not match', async ({ page }) => {
      await page.locator('#signupPassword').fill('Test1234!');
      await page.locator('#signupRepeatPassword').fill('Test5678!');
      await page.locator('#signupRepeatPassword').blur();
      await expect(page.locator('.invalid-feedback')).toHaveText(ERROR_MESSAGES.rePassword.mismatch);
    })
  })
}) 
