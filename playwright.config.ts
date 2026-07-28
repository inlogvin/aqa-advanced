import { defineConfig, devices } from '@playwright/test';

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
import dotenv from 'dotenv';
dotenv.config();

/** Custom test options set per project (see src/fixtures/params.fixture.ts). */
type ConfigOptions = {
  paramsFilePath: string;
};

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig<ConfigOptions>({
  testDir: './tests',
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : 3,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: 'html',
  
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('')`. */
    //baseURL: process.env.BASE_URL,

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on-first-retry',
    video: 'on',
    screenshot: 'on',
    httpCredentials:{
      username: process.env.HTTP_USERNAME!,
      password: process.env.HTTP_PASSWORD!
    }
  },

  /* Configure projects for major browsers */
  projects: [
    /*
     * Auth setup projects: log in once per environment via the UI and save the
     * storage state. `params: <qautoN>.config.json` tells the setup where to save
     * (see src/config/params). Every authenticated project depends on its setup.
     */
    {
      name: 'setup-qauto',
      testMatch: /.*\.setup\.ts/,
      use: {
        ...devices['Desktop Chrome'],
        baseURL: 'https://qauto.forstudy.space/',
        paramsFilePath: 'src/config/params/qauto1.config.json',
      },
    },
    {
      name: 'setup-qauto2',
      testMatch: /.*\.setup\.ts/,
      use: {
        ...devices['Desktop Chrome'],
        baseURL: 'https://qauto2.forstudy.space/',
        paramsFilePath: 'src/config/params/qauto2.config.json',
      },
    },

    /*
     * Authenticated tests (files named *.auth.spec.ts). They reuse the saved
     * storage state via the userGaragePage fixture, so a new authenticated spec
     * only needs the `.auth.spec.ts` suffix — no config change required.
     */
    {
      name: 'qauto-auth',
      testMatch: /.*\.auth\.spec\.ts/,
      dependencies: ['setup-qauto'],
      use: {
        ...devices['Desktop Chrome'],
        baseURL: 'https://qauto.forstudy.space/',
        paramsFilePath: 'src/config/params/qauto1.config.json',
      },
    },
    {
      name: 'qauto2-auth',
      testMatch: /.*\.auth\.spec\.ts/,
      dependencies: ['setup-qauto2'],
      use: {
        ...devices['Desktop Chrome'],
        baseURL: 'https://qauto2.forstudy.space/',
        paramsFilePath: 'src/config/params/qauto2.config.json',
      },
    },

    /* Non-authenticated tests run across the full browser matrix. */
    {
      name: 'qauto-chromium',
      testIgnore: [/.*\.auth\.spec\.ts/, /.*\.setup\.ts/],
      use: { ...devices['Desktop Chrome'], baseURL: 'https://qauto.forstudy.space/' },
    },
    {
      name: 'qauto-firefox',
      testIgnore: [/.*\.auth\.spec\.ts/, /.*\.setup\.ts/],
      use: { ...devices['Desktop Firefox'], baseURL: 'https://qauto.forstudy.space/' },
    },
    {
      name: 'qauto-webkit',
      testIgnore: [/.*\.auth\.spec\.ts/, /.*\.setup\.ts/],
      use: { ...devices['Desktop Safari'], baseURL: 'https://qauto.forstudy.space/' },
    },
    {
      name: 'qauto2-chromium',
      testIgnore: [/.*\.auth\.spec\.ts/, /.*\.setup\.ts/],
      use: { ...devices['Desktop Chrome'], baseURL: 'https://qauto2.forstudy.space/' },
    },
    {
      name: 'qauto2-firefox',
      testIgnore: [/.*\.auth\.spec\.ts/, /.*\.setup\.ts/],
      use: { ...devices['Desktop Firefox'], baseURL: 'https://qauto2.forstudy.space/' },
    },
    {
      name: 'qauto2-webkit',
      testIgnore: [/.*\.auth\.spec\.ts/, /.*\.setup\.ts/],
      use: { ...devices['Desktop Safari'], baseURL: 'https://qauto2.forstudy.space/' },
    },

    /* Test against mobile viewports. */
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },

    /* Test against branded browsers. */
    // {
    //   name: 'Microsoft Edge',
    //   use: { ...de vices['Desktop Edge'], channel: 'msedge' },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    // },
  ],

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://localhost:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});
