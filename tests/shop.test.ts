import { test, expect } from '../utility/baseTest';
import { SauceDemoInventoryPage } from '../pages/inventory.page';
import { SauceDemoCartPage } from '../pages/cart.page';

test ('Check shopping', async ({loginPage, page}) => {
    const inventoryPage = new SauceDemoInventoryPage(page);
    await inventoryPage.addBackpack();
    await expect (inventoryPage.removeFromCartBackpackButton).toBeVisible;
    await inventoryPage.clickCart();
    const cartPage = new SauceDemoCartPage(page);
    await expect (cartPage.pageTitle).toHaveText('Your Cart');
    await expect (cartPage.itemTitle).toHaveText('Sauce Labs Backpack');
    await expect (cartPage.itemQuantity).toHaveText('1');
    await expect (cartPage.itemDescription).toContainText('carry.allTheThings() with the sleek, streamlined Sly Pack that melds uncompromising style with unequaled laptop and tablet protection.');
    await expect (cartPage.itemPrice).toHaveText('$29.99');
    await expect (cartPage.removeButton).toBeVisible;
    await expect (cartPage.checkoutButton).toBeVisible;
    await expect (cartPage.continueShoppingButton).toBeVisible;
  
});