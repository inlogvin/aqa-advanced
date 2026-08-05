import { test, expect } from '@/fixtures';

test.describe('Profile with mocked data (userProfilePage fixture)', () => {
    test('shows mocked profile data', async ({userProfilePage, page}) =>
    {
        const mockName = 'Mock';
        const mockLastName = 'FakeLastname';
        const mockPhotoFilename = 'testpic.png';

        await page.route('**/api/users/profile', async (route) => {
            const response = await route.fetch();
            const json = await response.json();

            json.data.name = mockName;
            json.data.lastName = mockLastName;
            json.data.photoFilename = mockPhotoFilename;

            await route.fulfill({response, json});
        });
        await userProfilePage.open();
        await expect(userProfilePage.name).toHaveText(`${mockName} ${mockLastName}`);
        await expect(userProfilePage.photo).toHaveAttribute('src', new RegExp(`${mockPhotoFilename}$`));
    }
)
} )