import { test, expect } from "@playwright/test";
test.beforeEach("Navigating to Base URL", async ({ page }) => {
  await page.goto(process.env.url);
  await expect(page).toHaveTitle(/Ngx-admin/);
  const materialCard = page.locator("nb-card nb-card-header", {
    hasText: /^Light$/, //Exactly matches with only Light, or else matches with both Light and Material Light
  });
  materialCard.click();
});

test.describe("UI Components", () => {
  test.describe.configure({ retries: 2 });
  //Every test within ui components will be retries twice if test fails
  test.beforeEach("Navigating to Forms Section", async ({ page }) => {
    await page.getByTitle("Forms").click();
    await page.getByText("Form Inputs").click();
  });
  test("Input Fields", async ({ page }, testInfo) => {
    if (testInfo.retry) {
      //do cleanup before the next retry...
      //Like use another credential for login
    }
    testInfo.setTimeout(testInfo.timeout + 5000);
    const defaultInputs = page.locator("nb-card", {
      hasText: "Default Inputs",
    });
    const projectAttribute = await defaultInputs.getAttribute("placeholder");
    await defaultInputs
      .getByPlaceholder("Project")
      .pressSequentially("Alpha", { delay: 1000 });
    await defaultInputs.getByRole("textbox").nth(1).fill("First name");
    await defaultInputs.locator("textarea").fill("Paragraph");
    await defaultInputs
      .locator("[fieldsize='small']")
      .pressSequentially("Small");
    await defaultInputs
      .getByPlaceholder("Medium Input")
      .pressSequentially("Medium", { delay: 500 });
    // const projectValueError = await defaultInputs.getByPlaceholder("Project").textContent();
    // Throws error since we use textContent(), the value is not updated in the dom. Use inputValue()
    const projectValue = await defaultInputs
      .getByPlaceholder("Project")
      .inputValue();
    //console.log(projectValue);
    //Generic Assertion
    expect(projectValue).toEqual("Alpha");
    expect(projectValue).toContain("pha");
    //Locator Assertion
    await expect(defaultInputs.getByPlaceholder("Project")).toHaveValue(
      "Alpha",
    );
  });
  test("Drop down", async ({ page }) => {
    //Just button and options were present and not <select></select> tag
    const dropDownField = page.locator("nb-select button", {
      hasText: "Option 1",
    });
    await dropDownField.click();
    await page.locator("nb-option", { hasText: "Option 2" }).click();
    //If drop-down built using <select></select> tag->can use selectOption()s
  });
  test("Radio button", async ({ page }) => {
    const myOption = page.getByLabel("Radio 3");
    await myOption.check({ force: true }); //if class='visually-hidden', we have to use force:true
    const status = await myOption.isChecked();
    //Generic Assertion
    expect(status).toBeTruthy();
    //Loacator Assertion
    expect(await page.getByLabel("Radio 2").isChecked()).toBeFalsy();
    await page.waitForTimeout(2000);
  });
  test("Check box", async ({ page }) => {
    const checkBox1 = page.getByLabel("Checkbox 1");
    await checkBox1.check({ force: true });
    await page.getByLabel("Checkbox 2").uncheck();
    const allCheckBoxes = page.getByRole("checkbox");
    for (const box of await allCheckBoxes.all()) {
      await box.check({ force: true });
      await expect(box).toBeChecked();
    }
    // await checkBox1.click(); //selects
    // await checkBox1.click(); //unselects
    //So, if an option is selected by default and unknowingly if you click again, then it unselects.
    //So it's best practice to use check instead of click
    //await checkBox1.check({ force: true }); //selects
    //await checkBox1.check(); //remains the same
    //await checkBox1.uncheck();
    //To select all checkboxes
    // const allCheckBoxes = page.getByRole("checkbox");
    // for (const box of await allCheckBoxes.all()) {
    //   await box.check({ force: true });
    //   await expect(box).toBeChecked();
    // }
  });
});

test.afterEach("Closing the page", async ({ page }) => {
  page.close();
});
