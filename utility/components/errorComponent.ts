import { Locator, Page } from "playwright-core";
import { expect } from "playwright/test";

export class ErrorComponent {
  readonly page: Page;
  readonly locatorMessage: Locator;
  readonly locatorDismissButton: Locator;
  errorMessagePrefix: string;

  constructor(page: Page, errorMessagePrefix = 'Epic sadface: '){
    this.page = page;
    this.errorMessagePrefix = errorMessagePrefix;
    this.locatorMessage = this.page.locator('[data-test=error]');
    this.locatorDismissButton = this.locatorMessage.getByRole('button');
  }

  isNotVisible = async () => {
    await expect(this.locatorMessage).not.toBeVisible();
  }
}