import { Locator, Page } from "playwright-core";
import { ErrorComponent } from "./errorComponent";
import { expect } from "@playwright/test";

export abstract class FormComponent {
  readonly page: Page;
  readonly locatorForm: Locator;
  readonly locatorSubmitButton: Locator;
  readonly errorComponent: ErrorComponent;

  constructor(page: Page, errorMessagePrefix = 'Epic sadface:'){
    this.page = page;
    this.errorComponent = new ErrorComponent(this.page, errorMessagePrefix);
    this.locatorForm = this.page.locator('form');
    this.locatorSubmitButton = this.locatorForm.locator('input[type=submit]');
  }

  abstract fill(data: any): Promise<void>;

  submit = async () => {
    await this.locatorSubmitButton.click();
  }

  async validateDefaultLayout() {
    await expect(this.locatorForm).toBeVisible();
    await expect(this.locatorForm.locator('input:not([type=submit]).error')).toHaveCount(0);
    await expect(this.locatorForm.locator('svg.error_icon')).toHaveCount(0);
    await this.errorComponent.isNotVisible();
    await expect(this.locatorSubmitButton).toBeVisible();
  }

  async validateErrorLayout(){
    await expect(this.locatorForm).toBeVisible();
    await expect(this.locatorForm.locator('input:not([type=submit]).error')).not.toHaveCount(0);
    await expect(this.locatorForm.locator('svg.error_icon')).not.toHaveCount(0);
    await expect(this.locatorSubmitButton).toBeVisible();
  
    await this.errorComponent.isVisible();
  }

  validateFormFieldsAreNotOverlapped = async () => {
    const locatorFormFields = await this.locatorForm.locator('input').all();

    for(const field of locatorFormFields){
      await expect(field.evaluate(node => (node as HTMLElement).offsetParent !== null)).toBe(true);
    }
  }

}