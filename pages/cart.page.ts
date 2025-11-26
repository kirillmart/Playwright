import { expect, type Locator, type Page } from '@playwright/test';

export class SauceDemoCartPage{
    readonly page: Page
    readonly itemTitle: Locator;
    readonly pageTitle: Locator;
    readonly itemDescription: Locator;
    readonly itemPrice: Locator;
    readonly itemQuantity: Locator;
    readonly removeButton: Locator;
    readonly checkoutButton: Locator;
    readonly continueShoppingButton: Locator;

constructor (page: Page) {
    this.page = page;
    this.itemTitle = page.locator("//*[@class='inventory_item_name']");
    this.pageTitle = page.locator("//*[@data-test='title']");
    this.itemDescription = page.locator("//*[@data-test='inventory-item-desc']");
    this.itemQuantity = page.locator("//*[@data-test='item-quantity']");
    this.itemPrice = page.locator("//*[@data-test='inventory-item-price']");
    this.removeButton = page.locator("//*[@data-test='remove-sauce-labs-backpack']");
    this.checkoutButton = page.locator("//*[@data-test='checkout']");
    this.continueShoppingButton = page.locator("//*[@data-test='continue-shopping']");  
}}