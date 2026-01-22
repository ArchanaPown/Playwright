import { expect, test } from "@playwright/test";
const baseUrl = "https://automationexercise.com";
import * as UserCred from "./LoginCredentials.json";
test.beforeEach("Navigating to baseUrl", async ({ page }) => {
  await page.goto(baseUrl, { timeout: 60000, waitUntil: "commit" });
});
test("Login using credentials stored in JSON", async ({ page }) => {
  await page.getByRole("link", { name: " Signup / Login" }).click();
  await page
    .locator("form")
    .filter({ hasText: "Login" })
    .getByPlaceholder("Email Address")
    .fill(UserCred.user.email);
  await page
    .getByRole("textbox", { name: "Password" })
    .fill(UserCred.user.password);
  await page.getByRole("button", { name: "Login" }).click();

  await expect(
    page.getByRole("listitem").filter({ hasText: "Logged in as Name" })
  ).toBeVisible();
});
test.afterEach(async ({ page }) => {
  page.close();
});
