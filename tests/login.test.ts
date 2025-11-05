import { test, expect } from '@playwright/test';
import { SauceDemoLoginPage } from '../pages/login.page';
import { SauceDemoMainPage } from '../pages/main.page';


test ('Check elements are displayed', async ({ page }) => {
    const loginPage = new SauceDemoLoginPage(page);
    await loginPage.goto();
    await expect (loginPage.sauceDemoLogo).toBeVisible
    await expect (loginPage.loginField).toBeVisible
    await expect (loginPage.passwordField).toBeVisible
});

test ('Positive login test', async ({page}) => {
    const loginPage = new SauceDemoLoginPage(page);
    await loginPage.goto();
    await loginPage.inputLogin('standard_user');
    await loginPage.inputPassword('secret_sauce')
    await loginPage.clickLoginButton()
    const mainPage = new SauceDemoMainPage(page);
    await expect (mainPage.sauceDemoLogo).toContainText('Swag Labs')
    await expect (mainPage.menuIcon).toBeVisible
    await expect (mainPage.positionsList).toBeVisible
});

test ('Negative login test', async ({page}) => {
    const loginPage = new SauceDemoLoginPage(page);
    await loginPage.goto();
    await loginPage.inputLogin('standard_user');
    await loginPage.inputPassword('secret_sauce1')
    await loginPage.clickLoginButton()
    await expect (loginPage.errorMessage).toBeVisible
    await expect (loginPage.errorMessage).toContainText("Epic sadface: Username and password do not match any user in this service")
    await expect (loginPage.errorMessageCloseButton).toBeVisible
});

test ('Add to cart test', async ({page}) => {
    const loginPage = new SauceDemoLoginPage(page);
    await loginPage.goto();
    await loginPage.inputLogin('standard_user');
    await loginPage.inputPassword('secret_sauce1')
    await loginPage.clickLoginButton()
    const mainPage = new SauceDemoMainPage(page);
    
});
