//Text input
import { expect, test } from "@playwright/test";
test.beforeEach("Navigating to BaseURL", async ({ page }) => {
  await page.goto("https://testautomationpractice.blogspot.com/");
});
test("Text fills", async ({ page }) => {
  await page.getByPlaceholder("Enter Name").fill("Arjuna");
  await page
    .getByRole("textbox", { name: "Enter EMail" })
    .fill("arju@gmail.com");
});
