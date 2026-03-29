    const {test,expect} = require("@playwright/test");
          
    test("Handle Alerts and mouse hover",async({page})=>
    {
        // Maximize window
        // await page.setViewportSize({ width: 1920, height: 1080 });
        await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
        const framesPage =page.frameLocator("iframe#courses-iframe");
        await framesPage.locator("li a[href='lifetime-access']:visible").click();
        const textSubscribers=await framesPage.locator(".text h2").textContent();
        console.log("Number of student subscribers are: " +textSubscribers);
    })