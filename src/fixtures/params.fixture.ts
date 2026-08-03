import { test as base } from '@playwright/test';
import { join, isAbsolute } from 'path';
import { ParamsConfigGenerator } from '@/config/paramsConfigGenerator.util';

/** Shape of the merged params coming from src/config/params/*.config.json */
export interface Params {
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
    const merged = loader.getParams(...tags) as unknown as Params;
    await use(merged);
  },
});

export { expect } from '@playwright/test';
