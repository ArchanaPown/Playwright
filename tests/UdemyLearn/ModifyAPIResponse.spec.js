import { test, expect } from "@playwright/test";
test.beforeEach(async ({ page }) => {
  await page.route("*/**/api/articles*", async (router) => {
    const response = await router.fetch();
    const responseBody = await response.json();
    responseBody.articles[0].title = "Our modified title";
    responseBody.articles[0].description = "Our modified description";
    await router.fulfill({
      body: JSON.stringify(responseBody),
    });
  });
  await page.goto("https://conduit.bondaracademy.com/");
});

//ERROR OCCURS - SSL Certificate related
//1 - Globally disable ssl
// playwright.config.js
// import { defineConfig } from '@playwright/test';
// export default defineConfig({
//   use: {
//     // This tells Playwright to ignore SSL certificate issues
//     ignoreHTTPSErrors: true,
//   },
// });
//2 - Disable ssl while fetching response
// const response = await router.fetch({ ignoreHTTPSErrors: true });

test("Intercept and Modify API response", async ({ page }) => {
  await expect(page.locator(".article-preview h1").first()).toContainText(
    "Our modified title"
  );
  await expect(page.locator(".article-preview p").first()).toContainText(
    "Our modified description"
  );
  await page.waitForTimeout(5000);
});

test.afterAll(async ({ page }) => {
  await page.close();
});
