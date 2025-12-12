import { test, expect } from '@playwright/test';
import cart from '../utility/data/cart.json' assert { type: 'json' };
import user from '../utility/data/user.json' assert { type: 'json' };
import { InventoryPage } from '../pages/inventoryPage';
import { CartPage } from '../pages/cartPage';
import { LoginPage } from '../pages/loginPage';


let inventoryPage: InventoryPage;
let cartPage: CartPage;
let loginPage: LoginPage;

test.beforeEach(async ({page}) => {
    loginPage = new LoginPage (page);
    await loginPage.visit();
    await loginPage.formComponent.loginAsStandardUser (user.success);
    inventoryPage = new InventoryPage(page);
    inventoryPage.toBe();
    await inventoryPage.items[0].addToCart();
    await inventoryPage.header.visitCart();
    cartPage = new CartPage(page, [cart["1"]]);
    await cartPage.toBe();
});

test.describe('Shopping Tests', () => {

    test ('Check shopping', async ({page}) => {
        await expect(cartPage.locatorYourCart).toBeVisible();
        await expect(cartPage.locatorQty).toBeVisible();
        await expect(cartPage.locatorDescription).toBeVisible();
        await expect(cartPage.locatorContinueShoppingButton).toBeVisible();
        await expect(cartPage.locatorCheckoutButton).toBeVisible();
        for(const product of cartPage.products){
            await product.validateDefaultUX();
        }
})
    
  
});