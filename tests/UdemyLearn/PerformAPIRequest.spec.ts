//Scenario : Create an article through API, perform deletion by UI and validate
import { test, expect, request } from "@playwright/test";
test.beforeEach(async ({ page }) => {
  await page.goto("https://conduit.bondaracademy.com/");
  //LOGIN
  await page.getByText("Sign in").click();
  await page.getByRole("textbox", { name: "Email" }).fill("arc@gmail.com");
  await page.getByRole("textbox", { name: "Password" }).fill("********");
  await page.getByRole("button").click();
});
test("Performing API Calls", async ({ page, request }) => {
  const response = await request.post(
    "https://conduit-api.bondaracademy.com/api/users/login",
    {
      data: {
        user: { email: "arc@gmail.com", password: "********" },
      },
    },
  );
  const responseBody = await response.json();
  const accessToken = responseBody.user.token;
  const articleResponse = await request.post(
    "https://conduit-api.bondaracademy.com/api/articles/",
    {
      data: {
        article: {
          tagList: [],
          title: "Mock Test Title",
          description: "Mock Test Description",
          body: "Mock Test Body",
        },
      },
      headers: {
        Authorization: `Token ${accessToken}`,
      },
    },
  );
  expect(articleResponse.status()).toEqual(201);
  await page.getByText("Global Feed").click();
  await page.getByText("Mock Test Title").click();
  await page.getByRole("button", { name: "Delete Article" }).first().click();
  await page.getByText("Global Feed").click();
  await expect(page.locator("app-article-list h1").first()).not.toContainText(
    "Mock Test Title",
  );
});
test.afterAll(async ({ page }) => {
  await page.close();
});
