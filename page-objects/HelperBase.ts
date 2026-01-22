import { Page } from "@playwright/test";
//Implemented in NavigationPage
//OOPS concept - Inheritance
export class HelperBase {
  readonly page: Page;
  constructor(page: Page) {
    this.page = page;
  }
  //To use functions across page->less redundant
  async waitForSeconds(timeInSeconds: number) {
    await this.page.waitForTimeout(timeInSeconds * 1000);
  }
}
