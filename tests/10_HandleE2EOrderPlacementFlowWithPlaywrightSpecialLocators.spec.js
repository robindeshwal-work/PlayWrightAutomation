const {test,expect} = require ('@playwright/test');

test ('End to End order placement flow with Playwright Special locators', async ({page}) => {
   

   const allTitles = page.locator(".card-body b");
    const email = "robindeshwal1288@gmail.com";
    const actualPassword = "Robin@123";
    const products=page.locator(".card-body")
    const productName="ZARA COAT 3"

   await page.goto("https://rahulshettyacademy.com/client");
   await page.getByPlaceholder("email@example.com").fill(email);
   await page.getByPlaceholder("enter your passsword").fill(actualPassword);
   await page.getByText("Login").click();
   await page.waitForLoadState('networkidle');
   await products.first().waitFor();
    await page.locator(".card-body").filter({hasText:"ZARA COAT 3"}).
    getByRole("button", {name: " Add To Cart"}).click();

    await page.getByRole("listitem").getByRole("button", {name:'Cart'}).click();
    await page.locator("div li").first().waitFor();
    await expect (page.getByText("ZARA COAT 3")).toBeVisible();
    await page.getByRole("button", {name: "Checkout"}).click();

    await page.getByPlaceholder("Select Country").pressSequentially("ind");
    await page.getByRole("button",{name:"India"}).nth(1).click();
    await page.getByText("PLACE ORDER").click();
    await expect(page.getByText('Thankyou for the order.')).toBeVisible();
    await page.pause();

   });