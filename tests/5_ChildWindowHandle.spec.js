const {test,expect} = require ('@playwright/test');
const { setFlagsFromString } = require('v8');

test ('Handle Child Window', async ({browser}) => {
const context=await browser.newContext();
const page=await context.newPage();


    const username = page.locator('input#username')
    const blinkURL = page.locator('a[href*="documents-request"]')
    // const emailText=page.locator('.red')

    await page.goto ('https://rahulshettyacademy.com/loginpagePractise');
    const [childPage] = await Promise.all(
    [
    context.waitForEvent('page'),
    blinkURL.click()
    ])
    
    const emailText=childPage.locator('.red')
    const text = await emailText.textContent();
    // const text = await childPage.locator(".red").textContent();
    console.log ("Text available for email is: " + text)
    const arrayText = text.split("@");
    const domain = arrayText[1].split(" ")[0];
    console.log ("domain name extracted is: " + domain)
    //  await childPage.close();
    await username.fill(domain);
    const domainNameEntered=await username.inputValue();
    console.log("user name entered is: " +domainNameEntered)
    // await page.pause();
});