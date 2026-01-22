import { Page } from "@playwright/test";
export class FormLayoutPage {
  readonly page: Page;
  constructor(page: Page) {
    this.page = page;
  }
  //Type:"/**" adn hit enter above the method and it wil provide the parameters required for the function
  //When hovering on the method name while calling, we get the params required
  //Helpful
  /**
   *This method fills out the Using th Grid Form
   * @param email - valid email for the test user
   * @param password - should be atleast 15 character long including alphabets, number and special characters
   * @param option - option for the radio box(Age group)
   */
  async submitUsingTheGridFormWithCredentials(
    email: string,
    password: string,
    option: string
  ) {
    const usingTheGridForm = this.page.locator("nb-card", {
      hasText: "Using The Grid",
    });
    await usingTheGridForm.getByRole("textbox", { name: "Email" }).fill(email);
    await usingTheGridForm
      .getByRole("textbox", { name: "Password" })
      .fill(password);
    await usingTheGridForm
      .getByRole("radio", { name: option })
      .check({ force: true });
    await usingTheGridForm.getByRole("button").click();
  }
  /**
   *
   * @param name
   * @param email
   * @param rememberMe
   */
  async submitInlineFormUsingCredentails(
    name: string,
    email: string,
    rememberMe: boolean
  ) {
    const inlineForm = this.page
      .locator("nb-card")
      .filter({ hasText: "Inline form" });
    await inlineForm.getByRole("textbox", { name: "Jane Doe" }).fill(name);
    await inlineForm.getByRole("textbox", { name: "Email" }).fill(email);
    if (rememberMe) {
      await inlineForm.getByRole("checkbox").check({ force: true });
    } else {
      await inlineForm.getByRole("checkbox").uncheck({ force: true }); //If already selected
    }
    await inlineForm.getByRole("button").click();
  }
}
