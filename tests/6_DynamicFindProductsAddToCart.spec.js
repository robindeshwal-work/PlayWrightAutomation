const {test,expect} = require ('@playwright/test');

test ('Retrieve all titles of the products from Client App', async ({page}) => {
   
   const username = page.locator("#userEmail");
   const password = page.locator("#userPassword");
   const loginBtn = page.locator("[value = 'Login']");
   const allTitles = page.locator(".card-body b");
    const email = "robindeshwal1288@gmail.com";
    const actualPassword = "Robin@123";
    const products=page.locator(".card-body")
    const productName="ZARA COAT 3"

   await page.goto("https://rahulshettyacademy.com/client");
   await username.fill(email);
   await password.fill(actualPassword);
   await loginBtn.click();
   await page.waitForLoadState('networkidle');
   await products.first().waitFor();
   const titles=await page.locator(".card-body b").allTextContents();
   console.log("list of all titles is: " + titles)
   const count = await products.count();
   for(let i=0;i<count;++i)
   {
    if (await products.nth(i).locator("b").textContent()==productName)
    {
        await products.nth(i).locator("text= Add To Cart").click();
        break;
    }
   }
//    await page.pause();
   await page.locator("[routerlink*='cart']").click();
   await page.locator("div li").first().waitFor();
   const bool=await page.locator("h3:has-text('ZARA COAT 3')").isVisible();
   expect(bool).toBeTruthy();
   

});