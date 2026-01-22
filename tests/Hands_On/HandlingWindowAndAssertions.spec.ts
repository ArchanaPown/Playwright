import { test, expect } from "@playwright/test";
test.beforeEach("Landing in baseUrl", async ({ page }) => {
  await page.goto("https://rahulshettyacademy.com/AutomationPractice/", {
    timeout: 60000,
    waitUntil: "commit",
  });
});
test("Window Handling and Assertions", async ({ page }) => {
  const [newTab] = await Promise.all([
    page.waitForEvent("popup"),
    page.locator("#opentab").click(),
  ]);
  await newTab.waitForLoadState("domcontentloaded");
  await expect(newTab).toHaveURL(/.*qaclickacademy/);
  await expect(newTab).toHaveTitle(
    "QAClick Academy - A Testing Academy to Learn, Earn and Shine"
  );
  await newTab.close();
});
test.afterEach(async ({ page }) => {
  page.close();
});
