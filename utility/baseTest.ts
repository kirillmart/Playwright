import { test as base } from '@playwright/test';
import { SauceDemoLoginPage } from '../pages/login.page.ts';
import { SauceDemoInventoryPage } from '../pages/inventory.page.ts'

type MyFixtures = {
  loginPage: SauceDemoLoginPage;
};

export const test = base.extend<MyFixtures>({
  loginPage: async ({ page }, use) => {
    const loginPage = new SauceDemoLoginPage(page);
    await loginPage.goto();
    await loginPage.inputLogin('standard_user');
    await loginPage.inputPassword('secret_sauce');
    await loginPage.clickLoginButton();

    // Use the fixture value in the test.
    await use(loginPage);
  }
});
export { expect } from '@playwright/test';