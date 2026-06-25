import { expect, type Locator, type Page } from '@playwright/test';

export class {{page_class_name}} {
  readonly page: Page;
  readonly primaryHeading: Locator;

  constructor(page: Page) {
    this.page = page;
    this.primaryHeading = page.getByRole('heading').first();
  }

  async goto() {
    await this.page.goto('{{relative_path}}');
  }

  async expectLoaded() {
    await expect(this.primaryHeading).toBeVisible();
  }
}
