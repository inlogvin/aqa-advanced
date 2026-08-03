import { ProfilePage } from '@/pages/ProfilePage.pom';
import { paramsFixtures } from '@/fixtures/params.fixture';

export const profileFixtures = paramsFixtures.extend<{
  userProfilePage: ProfilePage;
}>({
  storageState: async ({ params }, use) => {
    await use(params.storageStatePath);
  },

  userProfilePage: async ({ page }, use) => {
    const profilePage = new ProfilePage(page);
    await use(profilePage);   // без .open() — сторінку відкриє сам тест
  },
});