import { Locator, Page } from "@playwright/test";
import { HelperBase } from "./HelperBase";

export class NavigationPage extends HelperBase {
  readonly formsInput: Locator;
  readonly formsLayout: Locator;
  readonly layoutStepper: Locator;
  constructor(page: Page) {
    super(page);
    this.formsInput = page.getByText("Form Inputs");
    this.formsLayout = page.getByText("Form Layouts");
    this.layoutStepper = page.getByText("Stepper");
  }
  async FormsInput() {
    await this.selectGroupMenuItem("Forms");
    await this.formsInput.click();
  }
  async FormsLayout() {
    await this.selectGroupMenuItem("Forms");
    await this.formsLayout.click();
  }
  async FormsDatepicker() {
    await this.selectGroupMenuItem("Forms");
    await this.page.getByText("Datepicker").click();
    await this.waitForSeconds(2); //Function present in HelperBase Class
  }

  async LayoutStepper() {
    await this.page.getByTitle(/^Layout$/).click();
    await this.layoutStepper.click();
  }

  private async selectGroupMenuItem(groupItemTitle: string) {
    const groupMenuItem = this.page.getByTitle(groupItemTitle);
    const expandedState = await groupMenuItem.getAttribute("aria-expanded");
    if (expandedState == "false") await groupMenuItem.click();
  }
}
