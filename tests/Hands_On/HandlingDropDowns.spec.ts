import { test, expect } from "@playwright/test";
test("Handling Drop-downs", async ({ page }) => {
  await page.goto("https://demo.akveo.com/ngx-admin/pages/dashboard");
  await expect(page).toHaveTitle(/Ngx-admin/);
  const materialCard = page.locator("nb-card nb-card-header", {
    hasText: /^Light$/, //Exactly matches with only Light, or else matches with both Light and Material Light
  });
  materialCard.click();
  const dropDownField = page.locator("nb-select button", {
    hasText: "Option 1",
  });
  await page.getByTitle("Forms").click();
  await page.getByText("Form Inputs").click();
  await dropDownField.click();
  await page.locator("nb-option", { hasText: "Option 2" }).click();
  await page.waitForTimeout(3000);
  await page.close();
});
