import { GaragePage } from '@/pages/GaragePage.pom';
import { paramsFixtures } from '@/fixtures/params.fixture';

/**
 * Builds on the params fixture and:
 *  - overrides the built-in `storageState` with the path from the env config,
 *    so the browser context starts already authenticated (session saved by setup);
 *  - exposes `userGaragePage`: a GaragePage already opened at /panel/garage.
 */
export const garageFixtures = paramsFixtures.extend<{
  userGaragePage: GaragePage;
}>({
  storageState: async ({ params }, use) => {
    await use(params.storageStatePath);
  },

  userGaragePage: async ({ page }, use) => {
    const garagePage = new GaragePage(page);
    await garagePage.open();
    await use(garagePage);
  },
});
