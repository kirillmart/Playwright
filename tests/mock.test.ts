import { test, Page, expect } from '@playwright/test';

test('Mock login API failure (500)', async ({ page }) => {
 await page.route('**/login', route => {
   route.fulfill({
     status: 500,
     contentType: 'application/json',
     body: JSON.stringify({ message: 'Internal Server Error' })
   });
 });
 await page.goto('https://www.saucedemo.com/');
 await page.fill('#user-name', 'standard_user');
 await page.fill('#password', 'secret_sauce');
 await page.click('#login-button');
 await expect(page.locator('[data-test="error"]'))
   .toContainText('Epic');
});

test("mocks a fruit and doesn't call api", async ({ page }) => {
  // Mock the api call before navigating
  await page.route('*/**/api/v1/fruits', async route => {
    const json = [{ name: 'Strawberry', id: 21 }];
    await route.fulfill({ json });
  });
  // Go to the page
  await page.goto('https://demo.playwright.dev/api-mocking');

  // Assert that the Strawberry fruit is visible
  await expect(page.getByText('Strawberry')).toBeVisible();
});