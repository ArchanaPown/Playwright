import { expect, test } from "@playwright/test";
test.beforeEach("Landing in baseUrl", async ({ page }) => {
  await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
});
test("Handling Alerts", async ({ page }) => {
  page.once("dialog", async (dialog) => {
    console.log(`Alert Text: ${dialog.message()}`);
    await dialog.accept();
  });
  await page.getByRole("button", { name: "Alert" }).click();
});
test("Switching to new tab", async ({ page }) => {
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
test("Click on mentorship tab on iframe", async ({ page }) => {
  const iframeLocator = page.locator("#courses-iframe");
  await expect(iframeLocator).toBeVisible();
  const frame = page.frameLocator("#courses-iframe");
  await frame.getByRole("link", { name: "Mentorship" }).first().click();
});
