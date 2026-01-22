import { test, expect } from "@playwright/test";
test.beforeEach("Navigation to BaseURL", async ({ page }) => {
  await page.goto(
    "https://opensource-demo.orangehrmlive.com/web/index.php/auth/login"
  );
  expect(page).toHaveTitle("OrangeHRM");
});
test.only("buit-in", async ({ page }) => {
  await page
    .getByPlaceholder("Username")
    .pressSequentially("Admin", { delay: 500 });
  await page
    .getByRole("textbox", { name: "Password" })
    .pressSequentially("admin123");
  await page.getByRole("button").click();
  await expect(page).toHaveURL(/dashboard/);
});
test("css", async ({ page }) => {
  await page.locator('input[name="username"]').fill("Admin");
  await page.locator('input[name="password"]').fill("admin123");
  await page.locator("button.orangehrm-login-button").click();
  await expect(page).toHaveURL(/dashboard/);
});
test("xpath", async ({ page }) => {
  await page.locator('//input[@name="username"]').fill("Admin");
  await page.locator('//input[@name="password"]').fill("admin123");
  await page.locator("//button").click();
  await expect(page).toHaveURL(/dashboard/);
});
test("Filtering the locators", async ({ page }) => {
  await page
    .locator(".oxd-input-group")
    .filter({ hasText: "Username" })
    .locator("input")
    .fill("Admin");
  await page
    .locator(".oxd-input-group")
    .filter({ hasText: "Password" })
    .locator("input")
    .fill("admin123");
  await page.locator("button").filter({ hasText: "Login" }).click();
  await expect(page).toHaveURL(/dashboard/);
});

test.afterEach(async ({ page }) => {
  await page.close();
});
