import { test, expect } from "@playwright/test";
test("Handling Smart Table", async ({ page }) => {
  await page.goto("https://demo.akveo.com/ngx-admin/pages/dashboard");
  await expect(page).toHaveTitle(/Ngx-admin/);
  page
    .locator("nb-card nb-card-header", {
      hasText: /^Light$/, //Exactly matches with only Light, or else matches with both Light and Material Light
    })
    .click();
  await page.getByText("Tables & Data").click();
  await page.getByText("Smart Table").click();
  const targetRow = page.getByRole("row", { name: "mdo@gmail.com" });
  await targetRow.locator(".nb-edit").click();
  await page.locator("input-editor").getByPlaceholder("Age").clear();
  await page.locator("input-editor").getByPlaceholder("Age").fill("35");
  await page.locator(".nb-checkmark").click();
  await expect(targetRow.locator("td").last()).toHaveText("35");
  page.close();
});
test("Handling iframe", async ({ page }) => {
  await page.goto("https://demo.automationtesting.in/Frames.html", {
    timeout: 60000,
    waitUntil: "commit",
  });
  const frame = page.frameLocator("//iframe[@id='singleframe']");
  await frame.locator("input[type='text']").fill("Hello Iframe");
  await expect(frame.locator("input[type='text']")).toHaveValue("Hello Iframe");

  page.close();
});
