import { test, expect } from '@/fixtures';

test.describe('Garage (userGaragePage fixture)', () => {
  test('logged-in user lands on the garage page', async ({ userGaragePage, page }) => {
    await expect(page).toHaveURL('/panel/garage');
    await expect(userGaragePage.heading).toBeVisible();
    await expect(userGaragePage.addCarButton).toBeVisible();
  });

  test('user can add a car to the garage', async ({ userGaragePage }) => {
    const carsBefore = await userGaragePage.carItems.count();

    await userGaragePage.addCar('Audi', 'TT', 100);

    await expect(userGaragePage.carItems).toHaveCount(carsBefore + 1);
    await expect(userGaragePage.carItems.first()).toContainText('Audi TT');
  });
});
