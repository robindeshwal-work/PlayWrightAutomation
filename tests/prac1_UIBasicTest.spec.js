// const{test, expect}= require('@playwright/test')
import{test,expect} from '@playwright/test'

test('Practice basic test with browser fixture', async({browser}) => {
    const context=await browser.newContext();
    const page=await context.newPage();
    await page.goto('https://www.google.com');
    console.log(await page.title());
    await expect(page).toHaveTitle('Google');
})

test('practice basic test with page fixture', async({page}) => {

    await page.goto ('https://rahulshettyacademy.com/loginpagePractise');
    console.log(await page.title());
    await page.locator('input#username').fill('robindeshwal');
    await page.locator('#password').fill('learning');
    await page.locator('#signInBtn').click();
    // await page.waitForTimeout(5000);
})