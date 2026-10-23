const { test, expect, request } = require('@playwright/test');

const{Apiutils}   = require    ('./Utils/Apiutils');
const logindata={userEmail: "anshika@gmail.com", userPassword: "Iamking@000"};
const orderdata={orders: [{country: "India", productOrderedId: "6960eac0c941646b7a8b3e68"}]}
let response;
test.beforeAll('loginapi method' ,async()=>
{
     const apiContext=  await request.newContext();
                                 
        const apiUtils    =  new Apiutils(apiContext,logindata,orderdata);
     
            response = await apiUtils.createOrder(orderdata);
     //

    
});


test (' Client App login', async ({ page }) => {
   //js file- Login js, DashboardPage
  // const email = "anshika@gmail.com";
     //email count 
  await page.addInitScript(value => {
    window.localStorage.setItem('token', value);
}, response.token);
   const productName = 'ZARA COAT 3';
  // const products = page.locator(".card-body");
   await page.goto("https://rahulshettyacademy.com/client");
  /* await page.locator("#userEmail").fill(email);
   await page.locator("#userPassword").fill("Iamking@000");
   await page.locator("[value='Login']").click();
   await page.waitForLoadState('networkidle');
   await page.locator(".card-body b").first().waitFor();
   const titles = await page.locator(".card-body b").allTextContents();
   console.log(titles); 
   const count = await products.count();
   for (let i = 0; i < count; ++i) {
      if (await products.nth(i).locator("b").textContent() === productName) {
         //add to cart
         await products.nth(i).locator("text= Add To Cart").click();
         break;
      }
   }
 
   await page.locator("[routerlink*='cart']").click();
   //await page.pause();
 
   await page.locator("div li").first().waitFor();
   const bool = await page.locator("h3:has-text('ZARA COAT 3')").isVisible();
   expect(bool).toBeTruthy();
   await page.locator("text=Checkout").click();
 
   await page.locator("[placeholder*='Country']").pressSequentially("ind", { delay: 150 });
   const dropdown = page.locator(".ta-results");
   await dropdown.waitFor();
   const optionsCount = await dropdown.locator("button").count();
   for (let i = 0; i < optionsCount; ++i) {
      const text = await dropdown.locator("button").nth(i).textContent();
      if (text === " India") {
         await dropdown.locator("button").nth(i).click();
         break;
      }
   }
 
   expect(page.locator(".user__name [type='text']").first()).toHaveText(email);
   await page.locator(".action__submit").click();
   await expect(page.locator(".hero-primary")).toHaveText(" Thankyou for the order. ");
   const orderId = await page.locator(".em-spacer-1 .ng-star-inserted").textContent();
   console.log(orderId);*/
 
   await page.locator("button[routerlink*='myorders']").click();
   await page.locator("tbody").waitFor();
   const rows = await page.locator("tbody tr");
 
 
   for (let i = 0; i < await rows.count(); ++i) {
      const rowOrderId = await rows.nth(i).locator("th").textContent();
      if (response.orderId.includes(rowOrderId)) {
         await rows.nth(i).locator("button").first().click();
         break;
      }
   }
   const orderIdDetails = await page.locator(".col-text").textContent();
   expect(response.orderId.includes(orderIdDetails)).toBeTruthy();
 
});