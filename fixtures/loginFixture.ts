import { test as base, Page } from '@playwright/test';
import { LoginPage } from '../pages/loginPage';
import data from '../utility/data/user.json' assert { type: 'json' };
import products from '../utility/data/products.json' assert { type: 'json' };
import DB from '../utility/db';

type Fixtures = {
    visitLoginPage: LoginPage;
    login: LoginPage;
    correctLoginData: any;
    incorrectLoginData: any;
    productsToAdd: any;
    database: DB;
};

export const test = base.extend<Fixtures>({

    visitLoginPage: async ({ page }, use) => {
        const loginPage = new LoginPage(page);

        await loginPage.visit();
        await loginPage.toBe();
        await use(loginPage);
    },

    login: async ({ page }, use) => {
        const loginPage = new LoginPage(page);

        await loginPage.visit();
        await loginPage.toBe();
        await loginPage.formComponent.locatorUsernameInput.fill(data.success.username);
        await loginPage.formComponent.locatorPasswordInput.fill(data.success.password);
        await loginPage.formComponent.submit();

        await use(loginPage);
    },

    correctLoginData: {
        username: data.success.username,
        password: data.success.password
    },

    incorrectLoginData: {
        username: data.bad_credential.username,
        password: data.bad_credential.password
    },

    productsToAdd: {
        backpack: products.az[1].name,
        bikeLight: products.az[2].name,
        boltTShirt: products.az[3].name,
        fleeceJacket: products.az[4].name
    },

    database: async ({}, use) => {
        const db = new DB();
        await db.executeQuery(`DELETE FROM User;`);
        await db.executeQuery(`INSERT INTO User VALUES ('1', '${data.success.username}', '${data.success.password}');`);
        await use(db);
    }
});

export { expect, Page } from '@playwright/test';