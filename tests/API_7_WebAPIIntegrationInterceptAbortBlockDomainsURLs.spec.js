const { test, expect, request } = require('@playwright/test');

const loginPayload = { userEmail: "robindeshwal1288@gmail.com", userPassword: "Robin@123" };
const orderPayload = { orders: [{ country: "Cuba", productOrderedId: "68a961719320a140fe1ca57c" }] };
const fakePayLoadOrders = { data: [], message: "No Orders" };

let tokenValue;
let orderId;

test.beforeAll(async () => {
    const apiContext = await request.newContext();
    // To execute login API
    const loginResponse = await apiContext.post("https://rahulshettyacademy.com/api/ecom/auth/login",
        {
            data: loginPayload
        })
    expect(loginResponse.ok()).toBeTruthy();
    const loginResponseJson = await loginResponse.json();
    // To retrieve token value
    tokenValue = loginResponseJson.token;
    console.log("retrieved token value is: " + tokenValue);

    // Include Place Order API
    const orderResponse = await apiContext.post("https://rahulshettyacademy.com/api/ecom/order/create-order",
        {
            data: orderPayload,
            headers:
            {
                'Authorization': tokenValue,
                "content-type": 'application/json'
            }
        }
    )
    const orderResponseJson = await orderResponse.json();
    console.log("Place Order API json response is: " + JSON.stringify(orderResponseJson));
    orderId = orderResponseJson.orders[0];
    console.log("order id is: " + orderId)
}
)

test('Order API Integration with UI test', async ({ page }) => {
    // below step is to set value of token in local Storage in Developer tools.   
    await page.addInitScript(value => {
        window.localStorage.setItem('token', value);
    }, tokenValue);

    await page.goto("https://rahulshettyacademy.com/client");
    // Print all the request calls made by browser
    page.on('request',request=> console.log("printing all request urls: " + request.url()));
    page.on('response',response=> console.log("printing all reponse urls and status codes: " + response.url(),response.status()));
    console.log("click on orders page");
    // block all calls with .jpg, .png, .jpeg so any image will not appear on the orders page
    page.route('**/*.{jpg,png,jpeg}',route=>route.abort());
    await page.locator("button[routerlink*='myorders']").click();
    await page.pause();
    // Block the request url which calls API to view order details, clicking on view should throw error
    page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=*",
        route=> route.abort()
    );

    // To block calls only for a specific domain (ex: rahulshettyacademy.com), use below code
    //     page.route("**/*", route => {
    //     return route.request().url().includes("rahulshettyacademy.com") 
    //         ? route.abort() 
    //         : route.continue();
    // });

    await page.locator("button:has-text('View')").first().click();
    await page.pause();

});