const {test,expect} = require ('@playwright/test');

test ('Capture Screenshots', async ({page}) => {
    const username = page.locator('input#username')
    const password = page.locator('#password')
    const signInBtn = page.locator('#signInBtn')
    await page.goto ('https://rahulshettyacademy.com/client');
    console.log(await page.title());
    // To Take screenshot of entire page
    await page.screenshot({path: 'ScreenshotsVisualTesting/RahulShetty1.png'});
    // To take screenshot of only for a specific locator or Section on the page
    await page.locator(".login-wrapper").screenshot({path:'ScreenshotsVisualTesting/LoginSectionOnly.png'});
    // it will capture the screenshot and compare it with the screenshot available inside "15_CaptureScreenshotsAndVisualTesting.spec.js-snapshots" folder
   expect(await page.screenshot()).toMatchSnapshot();
});

