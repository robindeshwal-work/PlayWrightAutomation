import { test, expect } from '@playwright/test';

test.describe('Rahul Shetty Academy Login Test', () => {
  test('should login successfully and verify iPhone X is present', async ({ page }) => {
    // Navigate to the login page
    await page.goto('https://rahulshettyacademy.com/loginpagePractise');

    // Enter username
    await page.getByRole('textbox', { name: 'Username:' }).fill('rahulshettyacademy');

    // Enter password
    await page.getByRole('textbox', { name: 'Password:' }).fill('Learning@830$3mK2');

    // Select the terms and conditions checkbox
    await page.getByRole('checkbox', { name: 'I Agree to the terms and' }).check();

    // Click on Sign In button
    await page.getByRole('button', { name: 'Sign In' }).click();

    // Wait until page is navigated to the shop page
    await page.waitForURL('https://rahulshettyacademy.com/angularpractice/shop');

    // Verify if iPhone X is present on the page
    const iphoneX = page.getByRole('heading', { name: 'iphone X', level: 4 });
    await expect(iphoneX).toBeVisible();

    // Additional verification - check if the product link is present
    await expect(page.getByRole('link', { name: 'iphone X' })).toBeVisible();

    console.log(' iPhone X is present on the page');
  });
});
