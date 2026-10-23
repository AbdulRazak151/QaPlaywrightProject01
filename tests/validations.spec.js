const { test, expect } = require('@playwright/test');
//test.describe.configure({mode:'parallel'});//run in parallen in a given ts script
test.describe.configure({mode:'serial'});//run in serial means one test is dependent on other test
test(' @Validations popuphandling',async({page})=>

{
    await  page.goto("https://rahulshettyacademy.com/AutomationPractice/");
   // await  page.goto("https://www.google.com");
    //await  page.goBack();//going back arrow icon from browser
    //await  page.goForward();//going forwared arrow icon from browswer

    await expect( page.locator(".displayed-class")).toBeVisible();
    await page.locator("#hide-textbox").click();
    await expect(page.locator(".displayed-class")).toBeHidden();
       page.on('dialog',dialog=>dialog.accept());
     await page.locator("#confirmbtn").click();
   
     await page.locator("#mousehover").hover();
     const framespage= page.frameLocator("#courses-iframe");
    framespage.locator("li a[href*='lifetime-access']:visible").click();
    const textCheck= await framespage.locator(".text h2").textContent();

     console.log(textCheck.split(" ")[1]);
}


);
test(' @Validations screenshot and ui ',async({page})=>{
    await  page.goto("https://rahulshettyacademy.com/AutomationPractice/");
   

    await expect( page.locator(".displayed-class")).toBeVisible();
    await page.locator("#displayed-text").screenshot({path:'partialScreenshot.png'});
    await page.locator("#hide-textbox").click();
    await page.screenshot({path:'screenshot.png'});
    await expect(page.locator(".displayed-class")).toBeHidden();

       
    


});

test('screenshot and visual ui matching ',async({page})=>{
        await page.goBack("https://flightaware.com/");
       await  expect(await page.screenshot()).toMatchSnapshot('landing.png');

        
});