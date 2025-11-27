import { test, expect } from '../utility/baseTest';
import data from '../utility/data/user.json' assert { type: 'json' };
import cart from '../utility/data/cart.json' assert { type: 'json' };
import { InventoryPage } from '../pages/inventoryPage';
import { CartPage } from '../pages/cartPage';


let inventoryPage: InventoryPage;
let cartPage: CartPage;

test.beforeEach(async ({page}) => {
    inventoryPage = new InventoryPage(page);
    cartPage = new CartPage(page, [cart["1"]]);
    await inventoryPage.visit();
    await inventoryPage.items[0].addToCart();
    await inventoryPage.header.visitCart();
    await cartPage.toBe();
});

test.describe('Shopping Tests', () => {

test ('Check shopping', async ({page}) => {
    cartPage.validateDefaultLayout();

})
    
  
});