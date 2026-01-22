import { test as setup } from "@playwright/test";
import user from "../../.auth/user.json";
import fs from "fs";
const authFile = ".auth/user.json";
//Also modify playwright.config.ts file
setup("Authentication", async ({ page, request }) => {
  //Using UI
  //   await page.goto("https://conduit.bondaracademy.com/");
  //   await page.getByText("Sign in").click();
  //   await page.getByRole("textbox", { name: "Email" }).fill("arc@gmail.com");
  //   await page.getByRole("textbox", { name: "Password" }).fill("********");
  //   await page.getByRole("button").click();
  //   //Make sure the page is fully loaded
  //   await page.waitForResponse("https://conduit-api.bondaracademy.com/api/tags");
  //   await page.context().storageState({ path: authFile });

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
  user.origins[0].localStorage[0].value = accessToken;
  fs.writeFileSync(authFile, JSON.stringify(user));
  //To use access token anywhere:
  process.env["ACCESS_TOKEN"] = accessToken;
  //And then configure this globally in playwright.config.ts
});
//Look at the ShareAuthentication.spec.ts
//Don't need to navigate and sign in for each tests, it will be done automatically.
