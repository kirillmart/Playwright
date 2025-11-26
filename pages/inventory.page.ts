import { expect, type Locator, type Page } from '@playwright/test';

export class SauceDemoInventoryPage{
    readonly page: Page;
    readonly sauceDemoLogo: Locator;
    readonly pageTitle: Locator;
    readonly menuIcon: Locator;
    readonly positionsList: Locator;
    readonly addToCartBackpackButton: Locator;
    readonly addToCartBikeLightButton: Locator;
    readonly bikeLightLink: Locator;
    readonly addToCartButton: Locator;
    readonly removeFromCartBackpackButton: Locator;
    readonly cartIcon: Locator;

constructor(page: Page) {
    this.page = page;
    this.sauceDemoLogo = page.locator("//*[@class='app_logo']");
    this.pageTitle = page.locator("//*[@data-test='title']");
    this.menuIcon = page.locator("//*[@id='react-burger-menu-btn']");
    this.positionsList = page.locator("//*[@data-test='inventory-item']");
    this.addToCartBackpackButton = page.locator('#add-to-cart-sauce-labs-backpack');
    this.addToCartBikeLightButton = page.locator('[data-test="add-to-cart-sauce-labs-bike-light"]');
    this.bikeLightLink = page.locator('[data-test="item-0-title-link"]');
    this.addToCartButton = page.locator('[data-test="add-to-cart"]');
    this.removeFromCartBackpackButton = page.locator("//*[@data-test='remove-sauce-labs-backpack']");
    this.cartIcon = page.locator("//*[@data-test='shopping-cart-link']");
}

async waitForLoaded() {
    this.page.waitForLoadState('networkidle')
}

async addBackpack() {
    await this.addToCartBackpackButton.click();    
}

async clickCart() {
    await this.cartIcon.click();
}

}