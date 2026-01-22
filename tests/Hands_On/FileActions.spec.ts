import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto(
    "https://rahulshettyacademy.com/upload-download-test/index.html"
  );
});
test("File Upload", async ({ page }) => {
  await page
    .locator('input[type="file"]')
    .setInputFiles("./tests/Hands_On/LoginCredentials.json");
  //   await expect(page.getByText("File uploaded successfully")).toBeVisible();
});
test("File Download", async ({ page }) => {
  const downloadPromise = page.waitForEvent("download");
  await page.getByRole("button", { name: "Download" }).click();
  const download = await downloadPromise;
  const path = "./downloads/" + download.suggestedFilename();
  await download.saveAs(path);
  console.log(`File downloaded to: ${path}`);
});
