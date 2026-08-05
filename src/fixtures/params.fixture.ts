import { test as base } from '@playwright/test';
import { join, isAbsolute } from 'path';
import { ParamsConfigGenerator } from '@/config/paramsConfigGenerator.util';

/** Public shape handed to tests/fixtures — already resolved, no env lookups needed. */
export interface Params {
  baseUrl: string;
  storageStatePath: string;
  userEmail: string;
  userPassword: string;
}

/** Raw shape as stored in src/config/params/*.config.json (env var *names*, not values). */
interface RawParams {
  baseUrl: string;
  storageStatePath: string;
  userEmailEnv: string;
  userPasswordEnv: string;
}

/**
 * Loads params from the JSON file pointed to by `paramsFilePath`.
 * `paramsFilePath` is an option, so each project overrides it in playwright.config.ts.
 */
export const paramsFixtures = base.extend<{
  paramsFilePath: string;
  params: Params;
}>({
  paramsFilePath: ['src/config/params/qauto1.config.json', { option: true }],
  params: async ({ paramsFilePath }, use, testInfo) => {
    const filePath = isAbsolute(paramsFilePath)
      ? paramsFilePath
      : join(process.cwd(), paramsFilePath);
    const loader = new ParamsConfigGenerator(filePath);
    const tags = testInfo.tags.map((t) => t.substring(1)); // drop leading '@'
    const raw = loader.getParams(...tags) as unknown as RawParams;

    const userEmail = process.env[raw.userEmailEnv];
    const userPassword = process.env[raw.userPasswordEnv];
    if (!userEmail || !userPassword) {
      throw new Error(`Missing credentials: set ${raw.userEmailEnv} and ${raw.userPasswordEnv} in .env`);
    }

    await use({
      baseUrl: raw.baseUrl,
      storageStatePath: raw.storageStatePath,
      userEmail,
      userPassword,
    });
  },
});

export { expect } from '@playwright/test';
