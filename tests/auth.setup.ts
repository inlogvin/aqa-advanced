import { paramsFixtures as setup, expect } from '@/fixtures/params.fixture';
import { Header } from '@/components/Header.pom';
import { SignInModal } from '@/components/SignInModal.pom';

/**
 * Logs in through the UI once per environment and saves the authenticated
 * session to the path from the env config (params.storageStatePath).
 * Projects that depend on `setup` then start already logged in.
 *
 * Uses paramsFixtures directly (not the merged test) so it does NOT inherit the
 * storageState override — during setup the storage-state file doesn't exist yet.
 */
setup('authenticate as user', async ({ page, params }) => {
  const header = new Header(page);
  const signInModal = new SignInModal(page);

  await page.goto(params.baseUrl);
  await header.openSignIn();
  await signInModal.login(params.userEmail, params.userPassword);

  await expect(page).toHaveURL('/panel/garage');
  await page.context().storageState({ path: params.storageStatePath });
});
