const {test,expect} = require ('@playwright/test');

test ('Retrieve contents of web elements after login', async ({page}) => {
    const username = page.locator('input#username')
    const password = page.locator('#password')
    const signInBtn = page.locator('#signInBtn')
    const dropdown = page.locator('select.form-control')
    const radioBtn = page.locator('span.radiotextsty')
    const modalBtn = page.locator('#okayBtn')
    const checkBox = page.locator('#terms')
    const blinkURL = page.locator('a[href*="documents-request"]')

    await page.goto ('https://rahulshettyacademy.com/loginpagePractise');
    await username.fill('rahulshettyacademy');
    await password.fill('learning');
    await dropdown.selectOption('teach');
    await radioBtn.last().click();
    await modalBtn.click();
    // await page.pause();
    // await page.waitForTimeout(3000);
    console.log (await radioBtn.last().isChecked());
    await expect(radioBtn.last()).toBeChecked();
    console.log ("Checkbox checked status before checking: " + await checkBox.isChecked());
    await checkBox.check();
    console.log ("Checkbox checked status after checking: " + await checkBox.isChecked());
    await page.waitForTimeout(3000);
    expect (await checkBox.isChecked()).toBeTruthy();
    await checkBox.uncheck();
    expect (await checkBox.isChecked()).toBeFalsy();
    // await page.pause();
    // Below is to check if a Blinking Text/URL is available on the page
    await expect (blinkURL).toHaveAttribute('class','blinkingText');

});