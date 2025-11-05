import { expect, Locator, Page } from '@playwright/test';
export class SauceDemoMainPage{
readonly page: Page;
readonly sauceDemoLogo: Locator;
readonly pageTitle: Locator;
readonly menuIcon: Locator;
readonly positionsList: Locator;
readonly addToCartBackpack: Locator;
readonly removeFromCartBackpack: Locator;

constructor(page: Page) {
this.page = page;
this.sauceDemoLogo = page.locator("//*[@class='app_logo']");
this.pageTitle = page.locator("//*[@data-test='title']");
this.menuIcon = page.locator("//*[@id='react-burger-menu-btn']")
this.positionsList = page.locator("//*[@data-test='inventory-item']")
this.addToCartBackpack = page.locator("//*[@data-test='add-to-cart-sauce-labs-backpack']")
this.removeFromCartBackpack = page.locator("//*[@data-test='remove-sauce-labs-backpack']")
}

async addBackpack() {
    this.addToCartBackpack.click
}
}