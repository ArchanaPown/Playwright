//Annotations
import { test } from "@playwright/test";
test.only("Focus only this test", async ({ page }) => {
  // Run only focused tests in the entire project.
});

test.skip("skip this test", async ({ page }) => {
  // This test is not run
});

test.describe("two tests", () => {
  test("one", async ({ page }) => {
    // ...
  });

  test("two", async ({ page }) => {
    // ...
  });
});

//Single Tag test

test(
  "test login page",
  {
    tag: "@fast",
  },
  async ({ page }) => {
    // ...
  }
);

test("test full report @slow", async ({ page }) => {
  // ...
});

//Multiple tag testing
test.describe(
  "group",
  {
    tag: "@report",
  },
  () => {
    test("test report header", async ({ page }) => {
      // ...
    });

    test(
      "test full report",
      {
        tag: ["@slow", "@vrt"],
      },
      async ({ page }) => {
        // ...
      }
    );
  }
);

//To Conditionally skip a group of tests and more:
//https://playwright.dev/docs/test-annotations
