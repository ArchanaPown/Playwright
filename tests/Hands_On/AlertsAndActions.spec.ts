import { expect, test } from "@playwright/test";
test.beforeEach("Landing in baseUrl", async ({ page }) => {
  await page.goto("https://rahulshettyacademy.com/AutomationPractice/", {
    timeout: 60000,
    waitUntil: "commit",
  });
});
test("Handling Alerts", async ({ page }) => {
  page.on("dialog", async (dialog) => {
    console.log(`Alert Text: ${dialog.message()}`);
    await dialog.accept();
  });
  await page.getByRole("button", { name: "Alert" }).click();
});
test("Radio button", async ({ page }) => {
  const myOption = page.locator('input[value="radio3"]');
  await myOption.check();
  await expect(myOption).toBeChecked();
  const radio2 = page.locator('input[value="radio2"]');
  await expect(radio2).not.toBeChecked();
});
test("Check box", async ({ page }) => {
  const checkBox1 = page.locator("#checkBoxOption1");
  const checkBox3 = page.locator("#checkBoxOption3");
  await checkBox1.check();
  await checkBox3.check();
  await checkBox1.uncheck();
  const allCheckBoxes = page.locator('input[type="checkbox"]');
  const boxes = await allCheckBoxes.all();
  for (const box of boxes) {
    await box.check();
    await expect(box).toBeChecked();
  }
});

test("Mouse Action", async ({ page }) => {
  const hoverButton = page.locator("#mousehover");
  await hoverButton.hover();
  const topLink = page.getByRole("link", { name: "Top" });
  await expect(topLink).toBeVisible();
  await topLink.click();
  await expect(page).toHaveURL(/#top/);
});
test("Keyboard Action", async ({ page }) => {
  const autocompleteInput = page.locator("#autocomplete");
  await autocompleteInput.pressSequentially("India", { delay: 100 });
  await page.keyboard.press("ArrowDown");
  await page.keyboard.press("ArrowDown");
  await page.keyboard.press("Enter");
  await autocompleteInput.click();
  await page.keyboard.press("Control+A");
  await page.keyboard.press("Backspace");
  await expect(autocompleteInput).toHaveValue("");
});
test.afterEach(async ({ page }) => {
  await page.close();
});
