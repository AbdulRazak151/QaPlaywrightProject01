const base= require('@playwright/test');
const email = "anshika@gmail.com";
const { request } = require('@playwright/test');
const { Apiutils } = require('./Apiutils');



const logindata={userEmail: "anshika@gmail.com", userPassword: "Iamking@000"};
const orderdata={orders: [{country: "India", productOrderedId: "6960eac0c941646b7a8b3e68"}]};
 exports.custometest=base.test.extend(
    {
authenticatedPage: async({browser},use)=>{
    const newContext= await browser.newContext();
   const page= await newContext.newPage();
    await page.goto("https://rahulshettyacademy.com/client");
   await page.locator("#userEmail").fill(email);
   await page.locator("#userPassword").fill("Iamking@000");
   await page.locator("[value='Login']").click();
   await page.waitForLoadState('networkidle');
    await use(page);
},
createOrder:async({},use)=>{
const apiContext=  await request.newContext();
                                 
      const apiUtils    =  new Apiutils(apiContext,logindata,orderdata);
     
         const    response = await apiUtils.createOrder(orderdata);
         await   use(response);
}


}



)