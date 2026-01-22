import { expect, test } from "@playwright/test";
const baseUrl = "https://automationexercise.com";
import * as UserCred from "./LoginCredentials.json";
test.beforeEach("Navigating to baseUrl", async ({ page }) => {
  await page.goto(baseUrl, { waitUntil: "domcontentloaded", timeout: 90000 });
});
test("Product checkout", async ({ page }) => {
  await test.step("1.Logging in using json", async () => {
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
  await test.step("2.Products Tab ->Hover over any product and click on Add to cart.", async () => {
    await expect(page).toHaveURL(baseUrl);
    await page.getByRole("link", { name: "(5) H&M" }).click();
    await page.getByRole("link", { name: " View Product" }).nth(1).click();
    await page.getByRole("button", { name: " Add to cart" }).click();
    await page.getByRole("button", { name: "Continue Shopping" }).click();
    await page.goto("https://automationexercise.com/brand_products/H&M");
    await page.getByRole("link", { name: " View Product" }).nth(4).click();
    await page.getByRole("button", { name: " Add to cart" }).click();
    await page.getByRole("link", { name: "View Cart" }).click();
  });

  await test.step("3.Go to cart tab and proceed for Checkout.", async () => {
    await expect(page).toHaveURL("https://automationexercise.com/view_cart");
    await page.locator(".cart_quantity_delete").first().click();
    await page.getByText("Proceed To Checkout").click();
    await page.getByRole("link", { name: "Place Order" }).click();
    await page.locator('input[name="name_on_card"]').click();
    await page.locator('input[name="name_on_card"]').fill("Name");
    await page.locator('input[name="card_number"]').click();
    await page.locator('input[name="card_number"]').fill("1234123412341234");
    await page.getByRole("textbox", { name: "ex." }).click();
    await page.getByRole("textbox", { name: "ex." }).fill("123");
    await page.getByRole("textbox", { name: "MM" }).click();
    await page.getByRole("textbox", { name: "MM" }).fill("01");
    await page.getByRole("textbox", { name: "YYYY" }).click();
    await page.getByRole("textbox", { name: "YYYY" }).fill("2027");
    await page.getByRole("button", { name: "Pay and Confirm Order" }).click();
    await page.getByRole("link", { name: "Continue" }).click();
  });
});
