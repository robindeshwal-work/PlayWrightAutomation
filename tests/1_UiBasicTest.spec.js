const {test,expect} = require ('@playwright/test');

test ('Basic UI Test with new Browser context', async ({browser}) => {

    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto ('https://rahulshettyacademy.com/');
    // Test commment
});

test ('Basic UI Test with Page fixture', async ({page}) => {

    await page.goto ('https://google.com');
    console.log(await page.title());
    await expect(page).toHaveTitle('Google');
});

test ('Enter login credentials on Login page', async ({page}) => {

    await page.goto ('https://rahulshettyacademy.com/loginpagePractise');
    console.log(await page.title());
    await page.locator('input#username').fill('robindeshwal');
    await page.locator('#password').fill('learning');
    await page.locator('#signInBtn').click();
    // await page.waitForTimeout(5000);
    console.log ("error message: " + await page.locator("[style*='block']").textContent());
    await expect(page.locator("[style*='block']")).toContainText('Incorrect');
    await expect(page.locator("[style*='block']")).toHaveText('Incorrect username/password.');
});