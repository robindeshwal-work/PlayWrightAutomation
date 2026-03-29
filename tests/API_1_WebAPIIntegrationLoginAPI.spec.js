const {test,expect,request} = require ('@playwright/test');

const loginPayload = {userEmail: "robindeshwal1288@gmail.com", userPassword: "Robin@123"};
let tokenValue;

test.beforeAll( async() =>
    {
        const apiContext = await request.newContext();
        // To execute login API
        const loginResponse = await apiContext.post("https://rahulshettyacademy.com/api/ecom/auth/login",
            {
                data: loginPayload
            })
        expect(loginResponse.ok()).toBeTruthy();
        const loginResponseJson = await loginResponse.json();
        // To retrieve token value
        tokenValue=loginResponseJson.token;
        console.log("retrieved token value is: " + tokenValue);
    }  
)

test ('Login API Integration with UI test', async ({page}) => {
   // below step is to set value of token in local Storage in Developer tools.   
    await page.addInitScript(value =>
   {
        window.localStorage.setItem('token',value);
   },tokenValue);

   await page.goto("https://rahulshettyacademy.com/client");
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