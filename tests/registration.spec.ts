import { test, expect } from '@playwright/test';
import { Header } from '@/components/Header.pom';
import { SignInModal } from '@/components/SignInModal.pom';
import { RegistrationPage } from '@/pages/RegistrationPage.pom';
import { generateUser } from '@/utils/testData';
import { ERROR_MESSAGES } from '@/utils/errorMessages';

test.describe('Registration form (POM)', () => {
  let registrationPage: RegistrationPage;

  test.beforeEach(async ({ page }) => {
    const header = new Header(page);
    const signInModal = new SignInModal(page);
    registrationPage = new RegistrationPage(page);

    await registrationPage.open();
    await header.openSignIn();
    await signInModal.goToRegistration();
  });

  test.describe('Positive cases', () => {
    test('Successful registration', async ({ page }) => {
      await expect(registrationPage.heading).toBeVisible();
      await registrationPage.register(generateUser());
      await expect(page).toHaveURL('/panel/garage');
    });
  });

  test.describe('Negative cases', () => {
    test('error when name is empty', async () => {
      await registrationPage.nameInput.focus();
      await registrationPage.nameInput.blur();
      await expect(registrationPage.errorMessage).toHaveText(ERROR_MESSAGES.name.required);
    })

    test('error when name is invalid', async () => {
      await registrationPage.nameInput.fill('Ім`я1');
      await registrationPage.nameInput.blur();
      await expect(registrationPage.errorMessage).toHaveText(ERROR_MESSAGES.name.invalid);
    })

    test('error when last name is empty', async () => {
      await registrationPage.lastNameInput.focus();
      await registrationPage.lastNameInput.blur();
      await expect(registrationPage.errorMessage).toHaveText(ERROR_MESSAGES.lastName.required);
    })

    test('error when last name is invalid', async ({ page }) => {
      await registrationPage.lastNameInput.fill('Прізвище');
      await registrationPage.lastNameInput.blur();
      await expect(registrationPage.errorMessage).toHaveText(ERROR_MESSAGES.lastName.invalid);
    })

    test('error when email is empty', async ({ page }) => {
      await registrationPage.emailInput.focus();
      await registrationPage.emailInput.blur();
      await expect(registrationPage.errorMessage).toHaveText(ERROR_MESSAGES.email.required);
    })


    test('error when email is invalid', async ({ page }) => {
      await registrationPage.emailInput.fill('testgmail.com');
      await registrationPage.emailInput.blur();
      await expect(registrationPage.errorMessage).toHaveText(ERROR_MESSAGES.email.invalid);
    })

    test('error when password is empty', async ({ page }) => {
      await registrationPage.passwordInput.focus();
      await registrationPage.passwordInput.blur();
      await expect(registrationPage.errorMessage).toHaveText(ERROR_MESSAGES.password.required);
    })

    test('error when password is invalid', async ({ page }) => {
      await registrationPage.passwordInput.fill('password');
      await registrationPage.passwordInput.focus();
      await expect(registrationPage.errorMessage).toHaveText(ERROR_MESSAGES.password.invalid);
    })

    test('error when re-enter password is empty', async ({ page }) => {
      await registrationPage.repeatPasswordInput.focus();
      await registrationPage.repeatPasswordInput.blur();
      await expect(registrationPage.errorMessage).toHaveText(ERROR_MESSAGES.rePassword.required);
    })

    test('error when passwords do not match', async ({ page }) => {
      await registrationPage.passwordInput.fill('Test1234!');
      await registrationPage.repeatPasswordInput.fill('Test5678!');
      await registrationPage.repeatPasswordInput.blur();
      await expect(registrationPage.errorMessage).toHaveText(ERROR_MESSAGES.rePassword.mismatch);
    })
  })
});