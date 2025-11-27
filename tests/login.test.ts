import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/loginPage';
import { InventoryPage } from '../pages/inventoryPage';
import data from '../utility/data/user.json' assert { type: 'json' };

test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.visit();
    await loginPage.toBe();
});


test.describe('Login Tests', () => {
    test('Successful Login with Valid Credentials', async ({ page }) => {
        const loginPage = new LoginPage(page);
        await loginPage.formComponent.locatorUsernameInput.fill(data.success.username);
        await loginPage.formComponent.locatorPasswordInput.fill(data.success.password);
        await loginPage.formComponent.submit();
        const inventoryPage = new InventoryPage(page);
        await inventoryPage.toBe();
})
    test('Unsuccessful Login with Invalid Credentials', async ({ page }) => {
        const loginPage = new LoginPage(page);
        await loginPage.formComponent.locatorUsernameInput.fill(data.bad_credential.username);
        await loginPage.formComponent.locatorPasswordInput.fill(data.bad_credential.password);
        await loginPage.formComponent.submit();
        await expect(loginPage.formComponent.errorComponent.locatorMessage).toBeVisible();

})
});
