import { NavigationPage } from "./NavigationPage";
import { FormLayoutPage } from "../page-objects/FormLayoutPage";
import { DatepickerPage } from "../page-objects/DatepickerPage";
import { Page, expect } from "@playwright/test";
export class PageManager {
  private readonly page: Page;
  private readonly navigationPage: NavigationPage;
  private readonly formLayoutPage: FormLayoutPage;
  private readonly datePickerPage: DatepickerPage;
  constructor(page: Page) {
    this.page = page;
    this.navigationPage = new NavigationPage(this.page);
    this.formLayoutPage = new FormLayoutPage(this.page);
    this.datePickerPage = new DatepickerPage(this.page);
  }
  navigateTo() {
    return this.navigationPage;
  }
  formLayout() {
    return this.formLayoutPage;
  }
  calendar() {
    return this.datePickerPage;
  }
}
