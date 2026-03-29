const {test,expect} = require ('@playwright/test');

test ('Retrieve contents of web elements after login', async ({page}) => {
    const username = page.locator('input#username')
    const password = page.locator('#password')
    const signInBtn = page.locator('#signInBtn')
    await page.goto ('https://rahulshettyacademy.com/loginpagePractise');
    console.log(await page.title());
    await username.fill('robindeshwal');
    await password.fill('learning');
    await signInBtn.click();
    // await page.waitForTimeout(5000);
    console.log ("error message for incorrect credentials: " + await page.locator("[style*='block']").textContent());
    await expect(page.locator("[style*='block']")).toContainText('Incorrect');
    await expect(page.locator("[style*='block']")).toHaveText('Incorrect username/password.');
    // await username.fill("");
    await username.fill('rahulshettyacademy');
    await signInBtn.click();
    const allProducts = page.locator('div.card-body a');
    console.log ("first element is " + await allProducts.first().textContent());
    console.log ("second element is " + await allProducts.nth(1).textContent());
    // For allTitles doesn't wait automatically, so we need to manual add some synchronization step to wait
    // In the below steps, it works because it first waits for first and second element in the above two lines and then it is able to fetch all the titles
    const allTitles= await allProducts.allTextContents();
    console.log ("List of all titles is: " + allTitles);
});

