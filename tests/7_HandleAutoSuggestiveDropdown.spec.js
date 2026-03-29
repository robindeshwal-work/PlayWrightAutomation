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

   await page.locator("button:has-text('Checkout')").click();
   await page.locator("input[placeholder*='Country']").pressSequentially("ind",{ delay: 150 });
   // delay: 150 } means it will wait 150 ms after typing each character, type i, then wait 150 and so on
   const dropdownOptions=page.locator(".ta-results");
   await dropdownOptions.waitFor();
   const countryCount = await dropdownOptions.locator("button").count();
   console.log("number of countries displayed in dropdown is: "+countryCount)
   for(let i=0;i<countryCount;++i)
   {
        const countryNames=await dropdownOptions.locator("button").nth(i).textContent();
        if (countryNames==" India")
        {
            await dropdownOptions.locator("button").nth(i).click();
            break;
        }
   }
//    await page.pause();
    const disabledEmailId=page.locator(".user__name label");
    const textBoxEmailId=page.locator(".user__name input").first();
   expect(disabledEmailId).toHaveText(email);
   // below one is to validate the value from an input text box
    expect(textBoxEmailId).toHaveValue(email);
    await page.locator('.btnn.action__submit').click();
    const orderConfirmation=page.locator(".hero-primary");
    await expect(orderConfirmation).toHaveText(" Thankyou for the order. ");
    const orderId=await page.locator(".em-spacer-1 .ng-star-inserted").textContent();
    console.log("Order id is: "+orderId )

});