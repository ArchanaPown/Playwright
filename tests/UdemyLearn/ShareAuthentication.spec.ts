import { test, expect } from "@playwright/test";
//We can create a new file by skipping authentiacation since the setup file will run before this code and shares the authentication state
test("Creating a article using UI", async ({ page, request }) => {
  await page.goto("https://conduit.bondaracademy.com/");
  await page.getByText("New Article").click();
  await page
    .getByRole("textbox", { name: "Article Title" })
    .fill("Playwright is awesome");
  await page
    .getByRole("textbox", { name: "What's this article about?" })
    .fill("About the Playwright");
  await page
    .getByRole("textbox", { name: "Write your article (in markdown)" })
    .fill("We like to use playwright for automation");
  await page.getByRole("button", { name: "Publish Article" }).click();
  const articleResponse = await page.waitForResponse(
    "https://conduit-api.bondaracademy.com/api/articles/",
  );
  const articleResponseBody = await articleResponse.json();
  const slugId = articleResponseBody.article.slug;
  await expect(page.locator(".article-page h1")).toContainText(
    "Playwright is awesome",
  );
  await page.getByText("Home").first().click();
  await page.getByText("Global Feed").click();
  await expect(page.locator("app-article-list h1").first()).toContainText(
    "Playwright is awesome",
  );

  //WE NEED ACCESS TOKEN TO DELETE ARTICLE
  //   const response = await request.post(
  //     "https://conduit-api.bondaracademy.com/api/users/login",
  //     {
  //       data: {
  //         user: { email: "arc@gmail.com", password: "********" },
  //       },
  //     },
  //   );
  //   const responseBody = await response.json();
  //   const accessToken = responseBody.user.token;

  //Now no need to get auth token

  const deleteArticleResponse = await request.delete(
    `https://conduit-api.bondaracademy.com/api/articles/${slugId}`,
    // {
    //   headers: {
    //     Authorization: `Token ${accessToken}`,
    //   },
    // },
  );
  expect(deleteArticleResponse.status()).toEqual(204);
  await page.close();
});
