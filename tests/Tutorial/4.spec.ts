//Date, Alerts and others

import { test, expect } from "@playwright/test";

test("test", async ({ page }) => {
  await page.goto("https://testautomationpractice.blogspot.com/");
  //Date picking Type 1
  await page.locator("#datepicker").click();
  await page.getByTitle("Prev").click();
  await page.getByTitle("Next").click();
  await page.getByRole("link", { name: "11" }).click();
  //Date picking Type 2
  await page.locator("#txtDate").click();
  await page.getByLabel("Select month").selectOption("0");
  await page.getByLabel("Select year").selectOption("2020");
  await page.getByRole("link", { name: "11" }).click();
  //Date picking Type 3 -> Date Range
  await page.getByPlaceholder("Start Date").fill("1998-10-05");
  await page.getByPlaceholder("End Date").fill("2004-01-11");

  //Single file upload
  // await page.locator("#singleFileInput").click();
  // await page
  //   .locator("#singleFileInput")
  //   .setInputFiles("PythonforDataAnalysis.pdf");

  //Multiple file upload
  // await page.locator("#multipleFilesInput").click();
  // await page
  //   .locator("#multipleFilesInput")
  //   .setInputFiles([
  //     "PythonforDataAnalysis.pdf",
  //     "PythonVisualizations.pdf",
  //     "PythonProgramming.pdf",
  //   ]);

  //Alerts
  page.once("dialog", (dialog) => {
    console.log(`Dialog message: ${dialog.message()}`);
    dialog.dismiss().catch(() => {});
  });
  await page.getByRole("button", { name: "Simple Alert" }).click();
  //Opening a new tab by clicking a button
  const page1Promise = page.waitForEvent("popup");
  await page.getByRole("button", { name: "New Tab" }).click();
  const page1 = await page1Promise;
  //Hover and click on dropdown
  await page.getByRole("button", { name: "Point Me" }).hover();
  await page.getByRole("link", { name: "Mobiles" }).click();
  //Double Click
  await page.locator("#field2").dblclick();
  //Submit button
  await page
    .locator("#post-body-1307673142697428135")
    .getByRole("button", { name: "Submit" })
    .click();
});
