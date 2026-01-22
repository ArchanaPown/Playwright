import { test, expect } from "@playwright/test";

test.beforeEach("Navigating to Base URL", async ({ page }) => {
  await page.goto("https://demo.akveo.com/ngx-admin/pages/dashboard");
  await expect(page).toHaveTitle(/Ngx-admin/);
  const materialCard = page.locator("nb-card nb-card-header", {
    hasText: /^Light$/, //Exactly matches with only Light, or else matches with both Light and Material Light
  });
  materialCard.click();
  await page.getByText("Forms").click();
  await page.getByText("Datepicker").click();
});

test("Working with Common Datepicker", async ({ page }) => {
  const commonInput = page.getByPlaceholder("Form Picker");
  await commonInput.click();
  const dateToSelect = page
    .locator("nb-calendar-day-cell:not(.bounding-month)")
    .getByText("18", { exact: true });
  await dateToSelect.click();
  await expect(commonInput).not.toBeEmpty();
});

test("Working with Datepicker with Range", async ({ page }) => {
  const calendarInputField = page.getByPlaceholder("Range Picker");
  await calendarInputField.click();
  const dateToSelectStart = page
    .locator("nb-calendar-day-cell:not(.bounding-month)")
    .getByText("5", { exact: true });
  const dateToSelectEnd = page
    .locator("nb-calendar-day-cell:not(.bounding-month)")
    .getByText("15", { exact: true });
});

test.afterEach("Closing the page", async ({ page }) => {
  page.close();
});
