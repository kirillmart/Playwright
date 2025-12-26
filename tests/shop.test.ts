import { test, expect } from '../fixtures/loginFixture';
import cart from '../utility/data/cart.json' assert { type: 'json' };
import { InventoryPage } from '../pages/inventoryPage';
import { CartPage } from '../pages/cartPage';


let inventoryPage: InventoryPage;
let cartPage: CartPage;

test('Check shopping', async ({ login, page }) => {
    
    inventoryPage = new InventoryPage(page);
    await inventoryPage.toBe();
    await inventoryPage.items[0].addToCart();
    await inventoryPage.header.visitCart();
    cartPage = new CartPage(page, [cart["1"]]);
    await cartPage.toBe();
    await expect(cartPage.locatorYourCart).toBeVisible();
    await expect(cartPage.locatorQty).toBeVisible();
    await expect(cartPage.locatorDescription).toBeVisible();
    await expect(cartPage.locatorContinueShoppingButton).toBeVisible();
    await expect(cartPage.locatorCheckoutButton).toBeVisible();
    for (const product of cartPage.products) {
        await product.locatorProductDescription.isVisible();
        await product.locatorProductTitle.isVisible();
        await product.locatorProductPrice.isVisible();
        await product.locatorQuantity.isVisible();
        await product.locatorRemoveButton.isVisible();
    }
});

    
  