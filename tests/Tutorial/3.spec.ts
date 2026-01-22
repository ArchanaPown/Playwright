//Checkbox and Radio Button and lists
import { test } from "@playwright/test";
test("Text fills", async ({ page }) => {
  await page.goto("https://testautomationpractice.blogspot.com/");
  await page.getByRole("radio", { name: "Female" }).check();
  await page.getByText("Female").hover();

  await page.getByRole("checkbox", { name: "Tuesday" }).check();
  await page.getByText("Wednesday").click();

  await page.getByLabel("Country:").selectOption("india");
});
