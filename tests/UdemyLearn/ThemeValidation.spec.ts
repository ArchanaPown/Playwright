import { test, expect } from "@playwright/test";
test.beforeEach("Navigating to Base URL", async ({ page }) => {
  await page.goto("https://demo.akveo.com/ngx-admin/pages/dashboard");
  await expect(page).toHaveTitle(/Ngx-admin/);
  const materialCard = page.locator("nb-card nb-card-header", {
    hasText: /^Light$/, //Exactly matches with only Light, or else matches with both Light and Material Light
  });
  materialCard.click();
});
test("Theme Changer", async ({ page }, testInfo) => {
  testInfo.setTimeout(testInfo.timeout + 10000);
  const colors = {
    Light: "rgb(255, 255, 255)",
    Dark: "rgb(34, 43, 69)",
    Cosmic: "rgb(50, 50, 89)",
    Corporate: "rgb(255, 255, 255)",
    "Material Light": "rgb(98, 0, 238)",
    "Material Dark": "rgb(233, 29, 99)",
  };
  const themeChooser = page.locator("nb-select[status='primary'] button");
  const optionsList = page.locator("nb-option");
  const header = page.locator("nb-layout-header[class='fixed']");
  await themeChooser.click();
  for (const color in colors) {
    //Since it matches 2 options in case of 'Light' -> Light and Material Light, to find exact match we have two ways:
    //await optionsList.getByText(color, { exact: true }).click();
    await optionsList.filter({ hasText: new RegExp(`^${color}$`) }).click();
    await page.waitForTimeout(2000);
    if (color != "Material Dark") {
      await themeChooser.click();
      await expect(header).toHaveCSS("background-color", colors[color]);
    }
  }
});
test.afterEach("Closing the page", async ({ page }) => {
  page.close();
});
