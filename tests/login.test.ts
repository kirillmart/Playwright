import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/loginPage';
import { InventoryPage } from '../pages/inventoryPage';
import data from '../utility/data/user.json';

test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.visit();
    await loginPage.toBe();
});


test.describe('Login Tests', () => {
    test('Successful Login with Valid Credentials', async ({ page }) => {
        const loginPage = new LoginPage(page);
        await loginPage.formComponent.locatorUsernameInput.fill((data as any).success.username);
        await loginPage.formComponent.locatorPasswordInput.fill((data as any).success.password);
        await loginPage.formComponent.submit();
        const inventoryPage = new InventoryPage(page);
        await inventoryPage.toBe();
})})
