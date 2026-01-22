import { test, chromium, Browser, Page, expect } from "@playwright/test";
test("launch chromium browser", async () => {
  const browser: Browser = await chromium.launch({
    channel: "msedge",
    headless: false,
  });
  const context = await browser.newContext();
  const page: Page = await context.newPage();
  await page.goto("https://www.gmail.com");
  await expect(page).toHaveTitle("Gmail");
});
test.afterEach(async ({ page }) => {
  await page.close();
});
