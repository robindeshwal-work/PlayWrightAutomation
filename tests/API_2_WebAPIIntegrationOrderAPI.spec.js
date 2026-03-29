const {test,expect,request} = require ('@playwright/test');

const loginPayload = {userEmail: "robindeshwal1288@gmail.com", userPassword: "Robin@123"};
const orderPayload = {orders: [{country: "Cuba", productOrderedId: "68a961719320a140fe1ca57c"}]};

let tokenValue;
let orderId;

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

        // Include Place Order API
        const orderResponse = await apiContext.post("https://rahulshettyacademy.com/api/ecom/order/create-order",
            {
                data:orderPayload,
                headers:
                {
                    'Authorization':tokenValue,
                    "content-type" :'application/json'
                }
            }
        )
        const orderResponseJson = await orderResponse.json();
        console.log("Place Order API json response is: " + JSON.stringify(orderResponseJson));
        orderId = orderResponseJson.orders[0];
        console.log("order id is: "+orderId)
    }  
)

test ('Order API Integration with UI test', async ({page}) => {
   // below step is to set value of token in local Storage in Developer tools.   
    await page.addInitScript(value =>
   {
        window.localStorage.setItem('token',value);
   },tokenValue);

   await page.goto("https://rahulshettyacademy.com/client");
   console.log("click on orders page");
   await page.locator("button[routerlink*='myorders']").click();
    const table =page.locator("tbody");
    await table.waitFor();
    const rows = page.locator("tbody tr");
    const rowsCount = await rows.count();
    const allOrderIds=rows.locator("th");
    for (let i=0;i<rowsCount;++i)
    {
        const allOrderIdText=await allOrderIds.nth(i).textContent()
        if(orderId.includes(allOrderIdText)) 
        {
            await rows.nth(i).locator(".btn-primary").click();
            break;
        }
    }

    const orderSummaryPageOrderId=await page.locator(".col-text").textContent();
    expect(orderId.includes(orderSummaryPageOrderId)).toBeTruthy();
    await page.pause();
    console.log("order id availabe on Order Summary page is: " +orderSummaryPageOrderId);

   });