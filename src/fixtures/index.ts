import { mergeTests } from '@playwright/test';
import { paramsFixtures } from '@/fixtures/params.fixture';
import { garageFixtures } from '@/fixtures/userGaragePage.fixture';
import { profileFixtures } from '@/fixtures/profilePage.fixture';
import { carsApiFixtures } from './carsApi.fixture';

/**
 * Single entry point for tests: import `test`/`expect` from here, not from
 * '@playwright/test'. New fixtures are merged in here, so specs and the
 * playwright config stay untouched when the fixture set grows.
 */
export const test = mergeTests(paramsFixtures, garageFixtures, profileFixtures, carsApiFixtures);
export { expect } from '@playwright/test';
