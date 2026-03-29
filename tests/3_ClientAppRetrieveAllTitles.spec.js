const {test,expect} = require ('@playwright/test');

test ('Retrieve all titles of the products from Client App', async ({page}) => {
   
   const username = page.locator("#userEmail");
   const password = page.locator("#userPassword");
   const loginBtn = page.locator("[value = 'Login']");
   const allTitles = page.locator(".card-body b");
    const email = "anshika@gmail.com";
   await page.goto("https://rahulshettyacademy.com/client");
   await username.fill(email);
   await password.fill("Iamking@000");
   await loginBtn.click();
   // The below line is to wait until all network calls are done
   // await page.waitForLoadState('networkidle');
   // Another way to wait until all elements are visible
   await allTitles.first().waitFor();
   const Titles = await allTitles.allTextContents();
   console.log("List of all titles is " +   Titles);
   

});