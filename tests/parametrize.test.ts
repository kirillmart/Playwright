import { test, expect } from '../fixtures/loginFixture';
import { LoginPage } from '../pages/loginPage';
import { InventoryPage } from '../pages/inventoryPage';
import { CartPage } from '../pages/cartPage';
import { parse } from 'csv-parse/sync';
import cart from '../utility/data/cart.json' assert { type: 'json' };
import path from 'path';
import fs from 'fs';
import products from '../utility/data/products.json' assert { type: 'json' };

let loginPage: LoginPage;
let inventoryPage: InventoryPage;
let cartPage: CartPage;
let records: Array<{login: string}>;
let productNames: Array<string> = [
    products.az[0].name,
    products.az[1].name,
    products.az[2].name,
    products.az[3].name
];

let multipleProductNames: Array<Array<string>> = [
    [products.az[0].name, products.az[1].name],
    [products.az[2].name, products.az[3].name]
];

test.describe('Parametrized Login Test', () => {

    records = parse(fs.readFileSync(path.join(__dirname, '../utility/data/users.csv')), {
        columns: true,
        skip_empty_lines: true
    });

    for (const record of records) {
        test('Login under user ' + record.login, async ({ visitLoginPage, page }) => {
            loginPage = new LoginPage(page);
            await loginPage.formComponent.locatorUsernameInput.fill(record.login);
            await loginPage.formComponent.locatorPasswordInput.fill(process.env.PASSWORD || '');
            await loginPage.formComponent.submit();
            inventoryPage = new InventoryPage(page);
            await inventoryPage.toBe();
        });
    }
});

test.describe('Parametrized shop test', () => {

    for (const productName of productNames) {
        test('Add product to cart: ' + productName, async ({ login, page }) => {
            const productIndex = productNames.indexOf(productName) + 1;
            inventoryPage = new InventoryPage(page);
            await inventoryPage.toBe();
            await inventoryPage.items.find(item => item.locatorProductTitleSet.innerText().then(text => text === productName))?.addToCart();
            await inventoryPage.header.visitCart();
            cartPage = new CartPage(page, [cart[productIndex.toString() as keyof typeof cart]]);
            await cartPage.toBe();
        });         
    }
    
    for (const productSet of multipleProductNames) {
        test('Add multiple products to cart: ' + productSet.join(', '), async ({ login, page }) => {
            inventoryPage = new InventoryPage(page);
            await inventoryPage.toBe();
            for (const productName of productSet) {
                for (const item of inventoryPage.items) {
                    const title = await item.locatorProductTitleSet.innerText();
                    if (title.startsWith(productName)) {
                        await item.addToCart();
                        break;
                    }
                }
            }
            await inventoryPage.header.visitCart();
            const cartItems = productSet.map(name => {
                const productIndex = products.az.findIndex(p => p.name === name) + 1;
                return cart[productIndex.toString() as keyof typeof cart];
            });
            cartPage = new CartPage(page, cartItems);
            await cartPage.toBe();
            await expect(cartPage.locatorYourCart).toBeVisible();
            await expect(cartPage.locatorCheckoutButton).toBeVisible();
            await cartPage.header.cartCounter(2);  
        });  
        
        test('Remove multiple products from cart: ' + productSet.join(', '), async ({ login, page }) => {
            inventoryPage = new InventoryPage(page);
            await inventoryPage.toBe();
            for (const productName of productSet) {
                for (const item of inventoryPage.items) {
                    const title = await item.locatorProductTitleSet.innerText();
                    if (title.startsWith(productName)) {
                        await item.addToCart();
                        break;
                    }
                }       
            }
            await inventoryPage.header.visitCart(); 
            const cartItems = productSet.map(name => {
                const productIndex = products.az.findIndex(p => p.name === name) + 1;
                return cart[productIndex.toString() as keyof typeof cart];
            });
            cartPage = new CartPage(page, cartItems);
            await cartPage.toBe();
            await cartPage.header.cartCounter(2);
            for (const product of cartPage.products) {
                await product.locatorRemoveButton.click();
            }  
            await cartPage.header.cartCounter(0);
        });
    }
    
});
