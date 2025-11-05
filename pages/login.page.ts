import { expect, Locator, Page } from '@playwright/test';

export class SauceDemoLoginPage {
readonly url ="https://www.saucedemo.com/";
readonly page: Page;
readonly sauceDemoLogo: Locator;
readonly loginField: Locator;
readonly passwordField: Locator;
readonly loginButton: Locator;
readonly errorMessage: Locator;
readonly errorMessageCloseButton: Locator;

constructor(page: Page) {
this.page = page;
this.sauceDemoLogo = page.locator("//*[@class='login_logo']");
this.loginField = page.locator("//*[@data-test='username']");
this.passwordField = page.locator("//*[@id='password']");
this.loginButton = page.locator("//*[@id='login-button']")
this.errorMessage = page.locator("//*@data-test='error'")
this.errorMessageCloseButton = page.locator("//*@data-test='error-button'")
}

async goto(){
    await this.page.goto(this.url);
}

async checkLogoDisplayed(){
    await this.loginField.isVisible;
}

async checkLoginFieldDisplayed(){
    await this.loginField.isVisible;
}

async checkPasswordFieldDisplayed(){
    await this.passwordField.isVisible;
}

async inputLogin(arg: string){
    await this.loginField.fill(arg);
}

async inputPassword(arg: string){
    await this.passwordField.fill(arg);
}

async clickLoginButton(){
    await this.loginButton.click();
}
}