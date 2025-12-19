import { test, expect } from '../fixtures/loginFixture';
import { LoginPage } from '../pages/loginPage';
import { InventoryPage } from '../pages/inventoryPage';
import { parse } from 'csv-parse/sync';
import path from 'path';
import fs from 'fs';

let loginPage: LoginPage;
let inventoryPage: InventoryPage;
let records: Array<{login: string}>;

test.describe('Parametrized Login Test', () => {

    records = parse(fs.readFileSync(path.join(__dirname, 'utility\\data\\users.csv')), {
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
