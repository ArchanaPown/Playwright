import { NavigationPage } from "../../page-objects/NavigationPage";
import { test, expect } from "@playwright/test";
test.beforeEach("Navigating to Base URL", async ({ page }) => {
  await page.goto("https://demo.akveo.com/ngx-admin/pages/dashboard");
  await expect(page).toHaveTitle(/Ngx-admin/);
  const materilCard = page.locator("nb-card nb-card-header", {
    hasText: /^Light$/, //Exactly matches with only Light, or else matches with both Light and Material Light
  });
  materilCard.click();
});
test("Navigation using page objects model", async ({ page }) => {
  const navigateTo = new NavigationPage(page);
  await navigateTo.FormsInput();
  await page.waitForTimeout(2000);
  await navigateTo.FormsLayout();
  await page.waitForTimeout(2000);
  await navigateTo.LayoutStepper();
  await page.waitForTimeout(2000);
});
test.afterEach("Closing the page", async ({ page }) => {
  page.close();
});
