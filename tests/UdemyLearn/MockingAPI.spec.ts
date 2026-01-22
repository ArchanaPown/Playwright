import { test, expect, request } from "@playwright/test";
import tags from "../../test-data/tags.json";

test.beforeEach(async ({ page }) => {
  await page.route("*/**/api/tags", async (route) => {
    await route.fulfill({
      body: JSON.stringify(tags),
    });
  });

  await page.goto("https://conduit.bondaracademy.com/");
});

test("has title", async ({ page }) => {
  //Our data will be present in tags section instead of original data present in website
  //By this way we can mock the api response for faster execution when we the data is stable or slow or 3rd party endpoints
  //Our data : test-data/tags.json
  await page.waitForTimeout(3000);
});
test.afterAll(async ({ page }) => {
  await page.close();
});
