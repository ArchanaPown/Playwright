import { expect, test } from "@playwright/test";
test.beforeEach("Landing in baseUrl", async ({ page }) => {
  await page.goto("https://automationexercise.com", {
    waitUntil: "domcontentloaded",
  });
  await page.getByRole("link", { name: " Signup / Login" }).click();
});
test("Sign up and create new account", async ({ page }) => {
  //Assert 1 : Signup page
  await expect(page).toHaveURL("https://automationexercise.com/login");
  await page.getByRole("textbox", { name: "Name" }).click();
  await page.getByPlaceholder("Name").fill("Name");
  await page
    .locator("form")
    .filter({ hasText: "Signup" })
    .getByPlaceholder("Email Address")
    .fill("userEmail@gmail.com");
  await page.getByRole("button", { name: "Signup" }).click();

  await expect(
    page.getByRole("heading", { name: "Enter Account Information" })
  ).toBeVisible();
  await page.locator("#id_gender1").check();
  await page.getByRole("textbox", { name: "Password *" }).fill("123456789");
  await page.locator("#days").selectOption("11");
  await page.locator("#months").selectOption("1");
  await page.locator("#years").selectOption("2004");
  await page
    .getByRole("checkbox", { name: "Sign up for our newsletter!" })
    .check();
  await page
    .getByRole("checkbox", { name: "Receive special offers from" })
    .check();
  await page.getByRole("textbox", { name: "First name *" }).fill("First name");
  await page.getByRole("textbox", { name: "Last name *" }).fill("Last name");
  await page
    .getByRole("textbox", { name: "Company", exact: true })
    .fill("Company");

  await page
    .getByRole("textbox", { name: "Address * (Street address, P." })
    .fill("Address");
  await page.getByRole("textbox", { name: "Address 2" }).fill("Address 2");
  await page.getByLabel("Country *").selectOption("United States");
  await page.getByRole("textbox", { name: "State *" }).fill("Tamil Nadu");
  await page
    .getByRole("textbox", { name: "City * Zipcode *" })
    .fill("Coimbatore");
  await page.locator("#zipcode").fill("641001");
  await page
    .getByRole("textbox", { name: "Mobile Number *" })
    .fill("1234567898");
  await page.getByRole("button", { name: "Create Account" }).click();
  //Assert 3 : Successful Account creation
  await expect(page).toHaveURL(
    "https://automationexercise.com/account_created"
  );
  await page.getByRole("link", { name: "Continue" }).click();
  //LOGOUT
  await page.getByRole("link", { name: " Logout" }).click();
});
test("Successful login using valid credentials", async ({ page }) => {
  //Assert 1 : Signup page
  await page
    .locator("form")
    .filter({ hasText: "Login" })
    .getByPlaceholder("Email Address")
    .fill("userEmail@gmail.com");
  await page.getByRole("textbox", { name: "Password" }).fill("123456789");
  await page.getByRole("button", { name: "Login" }).click();
  //Assert 2 : User Successfully logs in
  await expect(
    page.getByRole("listitem").filter({ hasText: "Logged in as Name" })
  ).toBeVisible();
  await page.getByRole("link", { name: " Logout" }).click();
});
