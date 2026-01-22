import { defineConfig, devices } from "@playwright/test";

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
import dotenv from "dotenv";
require("dotenv").config();
// import path from "path";
// dotenv.config({ path: path.resolve(__dirname, ".env") });

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  use: {
    /* Base URL to use in actions like `await page.goto('')`. */
    // baseURL: 'http://localhost:3000',

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: "on-first-retry",
    ignoreHTTPSErrors: true, //Removes SSL error while working with modifying API response file
    extraHTTPHeaders: {
      Authorization: `Token ${process.env.ACCESS_TOKEN}`, //To use access token anywhere without having to authenticate and store the token
    },
  },
  testDir: "./tests",
  //You can change the duration here->Test duration
  timeout: 60 * 1000,
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  //reporter: "html",
  reporter: "list",
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */

  /* Configure projects for major browsers */
  projects: [
    {
      name: "setup",
      testMatch: "auth.setup.ts",
    },
    {
      name: "mobile",
      testMatch: "1.spec.ts",
      ...devices["iPhone 13 Pro"],
    },
    {
      name: "chromium",
      use: {
        ...devices["Desktop Chrome"],
        storageState: ".auth/user.json", //Authentication stored file

        headless: false, //By default headless is set to true, if you want to see browser actions, set headless and false
      },
      //dependencies: ["setup"], //Uncomment this
      //ACTS as precondition. This 'setup' must run before running projects on chromium
    },

    // {
    //   name: 'firefox',
    //   storageState:".auth/user.json",//Authentication stored file
    //   use: { ...devices['Desktop Firefox'] },
    //  dependencies:["setup"],
    // },

    // {
    //   name: 'webkit',
    //   storageState:".auth/user.json",//Authentication stored file
    //   use: { ...devices['Desktop Safari'] },
    //  dependencies:["setup"],
    // },

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
    //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
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
