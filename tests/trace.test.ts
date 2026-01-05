import { test, expect } from '../fixtures/loginFixture';
import { LoginPage } from '../pages/loginPage';
import { InventoryPage } from '../pages/inventoryPage';

let loginPage: LoginPage;
let inventoryPage: InventoryPage;


test.describe('Trace test', () => {
    test('Failing login test for trace recording', async ({ visitLoginPage, incorrectLoginData, page }) => {
        loginPage = new LoginPage(page);
        await loginPage.formComponent.locatorUsernameInput.fill(incorrectLoginData.username);
        await loginPage.formComponent.locatorPasswordInput.fill(incorrectLoginData.password);
        await loginPage.formComponent.submit();
        inventoryPage = new InventoryPage(page);
        await inventoryPage.toBe();
        await expect(inventoryPage.locatorHeaderFilterSelect).toBeVisible();
        await expect(inventoryPage.locatorHeaderTitle).toBeVisible();
});
});