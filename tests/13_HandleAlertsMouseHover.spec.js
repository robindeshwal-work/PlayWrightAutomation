    const {test,expect} = require("@playwright/test");
          
    test("Handle Alerts and mouse hover",async({page})=>
    {
        // Maximize window
        await page.setViewportSize({ width: 1920, height: 1080 });
    
        await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
        // await page.goto("https://www.google.com/");
        // await page.goBack();
        // await page.goForward();
        // await page.goBack();

        await expect(page.locator("#displayed-text")).toBeVisible();
        await page.locator("#hide-textbox").click();
        await expect(page.locator("#displayed-text")).toBeHidden();
        // await page.pause();
        // page.on('dialog',dialog => dialog.accept());
        await page.locator('#confirmbtn').click();
        await page.pause();
        await page.locator("#mousehover").hover();
     
    })