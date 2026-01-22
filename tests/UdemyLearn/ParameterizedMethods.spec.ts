import { test, expect } from "@playwright/test";
import { PageManager } from "../../page-objects/PageManager";
import { faker } from "@faker-js/faker";

test.beforeEach("Navigating to Base URL", async ({ page }) => {
  await page.goto("https://demo.akveo.com/ngx-admin/pages/dashboard");
  await expect(page).toHaveTitle(/Ngx-admin/);
  const materialCard = page.locator("nb-card nb-card-header", {
    hasText: /^Light$/, //Exactly matches with only Light, or else matches with both Light and Material Light
  });
  materialCard.click();
});

test("Utilizing faker library to create random test", async ({ page }) => {
  const randomName = faker.person.fullName();
  const randomEmail = `${randomName.replace(" ", "")}${faker.number.int({ min: 10, max: 100 })}@gmail.com`;
  const pm = new PageManager(page);
  await pm.navigateTo().FormsLayout();
  await pm
    .formLayout()
    .submitInlineFormUsingCredentails(randomName, randomEmail, false);
  await page.waitForTimeout(2000);
});

test("Submitting the Using the Grid form with Credentials passed as Arguments", async ({
  page,
}) => {
  const pm = new PageManager(page);
  await pm.navigateTo().FormsLayout();
  await pm
    .formLayout()
    .submitUsingTheGridFormWithCredentials("abc@gmail.com", "1234", "Option 2");
  await page.waitForTimeout(2000);
});

test("Submitting the Inline form with Credentials passed as Arguments", async ({
  page,
}) => {
  const pm = new PageManager(page);
  await pm.navigateTo().FormsLayout();
  await pm
    .formLayout()
    .submitInlineFormUsingCredentails("ABC", "abc@gmail.com", false);
  await page.waitForTimeout(2000);
});

test("Working with Common Datepicker", async ({ page }) => {
  const pm = new PageManager(page);
  await pm.navigateTo().FormsDatepicker();
  pm.calendar().selectCommonDatePickerDateFromToday(4);
  await page.waitForTimeout(2000);
});

test("Working with Datepicker with Range", async ({ page }) => {
  const pm = new PageManager(page);
  await pm.navigateTo().FormsDatepicker();
  pm.calendar().selectDatepickerWithRangeFromToday(2, 4);
  await page.waitForTimeout(3000);
});

test.afterEach("Closing the page", async ({ page }) => {
  page.close();
});
