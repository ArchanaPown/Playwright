//To create new project: npm init playwright@latest
//To run : npx playwright test {<filename_with_extension>} {--headed}
//To get reports: npx playwright show-report {--port 8080}
//Visually test each step: npx playwright test {<filename_with_extension>} --ui
//To run only failed tests from last run: npx playwright test --last-failed
//npx playwright test tests/Assignment/Task3.spec.ts --trace on -> in playwright reports folder->right click 'index.html' ->can be viewd along with trace(UI)
//also in config file->trace:"on-first-retry"(first time alone) change to "on"(everytime)
import { test, chromium, Browser, Page, expect } from "@playwright/test";
test("launch chromium browser", async () => {
  const browser: Browser = await chromium.launch({
    channel: "msedge",
    headless: false,
  });
  const context = await browser.newContext();
  const page: Page = await context.newPage();
  await page.goto("https://www.gmail.com");
  await expect(page).toHaveTitle("Gmail"); //Assertions
  await page.screenshot({ path: "example.png" });
});
