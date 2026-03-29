const {test,expect,request} = require ('@playwright/test');

let webContext;
test.beforeAll(async({browser}) =>
{
    const context=await browser.newContext();
    const page = await context.newPage();
    await page.goto("https://rahulshettyacademy.com/client");   
    await page.locator('#userEmail').fill('robindeshwal1288@gmail.com');
    await page.locator('#userPassword').fill("Robin@123");
    await page.locator("[value = 'Login']").click();
   // Wait until all network calls are done
   await page.waitForLoadState('networkidle');
   // Store login session related details (token, cookies etc) in a json file
    await context.storageState({path: 'state.json'});
    webContext=await browser.newContext({storageState: 'state.json'});

})

test ('Retrieve all titles of the products from Client App', async () => {
//    use webContext which is used in BeforeAll method, with that login page will be skipped in this test
    const page=await webContext.newPage();
    await page.goto("https://rahulshettyacademy.com/client");
    const allTitles = page.locator(".card-body b");
   await allTitles.first().waitFor();
   const Titles = await allTitles.allTextContents();
   console.log("List of all titles is " +   Titles);
   
});