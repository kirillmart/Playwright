import { test } from '@playwright/test';
import { LoginPage } from '../pages/loginPage';
import data from '../utility/data/user.json';
import { InventoryPage } from '../pages/inventoryPage.ts';
let loginPage: LoginPage;

test.use({ storageState: { cookies: [], origins: [] } });

test.beforeEach(async ({page}) => {
  loginPage = new LoginPage(page);
  await loginPage.visit();
  await loginPage.toBe();
})