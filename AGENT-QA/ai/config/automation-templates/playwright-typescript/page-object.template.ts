import { expect, type Locator, type Page } from '@playwright/test';
import type { {{entity_pascal_name}}TestData } from '../fixtures/test-data';

export class {{page_class_name}} {
  readonly page: Page;
  readonly primaryHeading: Locator;
  readonly primaryActionButton: Locator;
  readonly nameInput: Locator;
  readonly saveButton: Locator;
  readonly successMessage: Locator;

  constructor(page: Page) {
    this.page = page;
    this.primaryHeading = page.getByRole('heading').first();
    this.primaryActionButton = page.getByRole('button', { name: '{{primary_action_label}}' });
    this.nameInput = page.getByLabel('{{name_field_label}}');
    this.saveButton = page.getByRole('button', { name: '{{save_button_label}}' });
    this.successMessage = page.getByRole('status').or(page.getByText('{{success_message_text}}'));
  }

  async goto() {
    await this.page.goto('{{relative_path}}');
  }

  async expectLoaded() {
    await expect(this.primaryHeading).toBeVisible();
  }

  async {{primary_action_method}}(data: {{entity_pascal_name}}TestData) {
    await this.primaryActionButton.click();
    await this.nameInput.fill(data.name);
    await this.saveButton.click();
  }

  async expect{{expected_result_method}}(data: {{entity_pascal_name}}TestData) {
    await expect(this.successMessage).toBeVisible();
    await expect(this.page.getByText(data.name)).toBeVisible();
  }
}
