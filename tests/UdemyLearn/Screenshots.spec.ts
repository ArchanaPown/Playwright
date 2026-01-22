import { test, expect } from "@playwright/test";
import { PageManager } from "../../page-objects/PageManager";
test.beforeEach("Navigating to Base URL", async ({ page }) => {
  await page.goto("https://demo.akveo.com/ngx-admin/pages/dashboard");
  await expect(page).toHaveTitle(/Ngx-admin/);
  const materialCard = page.locator("nb-card nb-card-header", {
    hasText: /^Light$/, //Exactly matches with only Light, or else matches with both Light and Material Light
  });
  materialCard.click();
});
test("Capturing Screenshots", async ({ page }) => {
  const pm = new PageManager(page);
  await pm.navigateTo().FormsLayout();
  await pm
    .formLayout()
    .submitInlineFormUsingCredentails("ABC", "abc@gmail.com", false);
  await page.screenshot({ path: "screenshots/formsImage.png" });
  await page.waitForTimeout(2000);
  await page
    .locator("nb-card", { hasText: "Inline Form" })
    .screenshot({ path: "screenshots/inlineForm.png" });
  //Binary form of the screenshot:
  const buffer = await page.screenshot();
  console.log(buffer.toString("base64"));
});

test.afterEach("Closing the page", async ({ page }) => {
  page.close();
});
