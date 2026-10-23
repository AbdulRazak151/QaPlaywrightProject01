const { Before, BeforeStep,After, AfterStep,Status } = require("@cucumber/cucumber");
const {POManager} = require('../../../pageobjects/POManager');
const { chromium } = require('playwright');
const { after } = require("node:test");
Before(async function(){

const browser=  await  chromium.launch({
         channel: 'msedge',
         headless: false

    });
  const context= await browser.newContext();//opening new fresh browser
       this.page=await context.newPage();//adding new tab in browser
       //const username=page.locator('input#username');
  this.poManager = new POManager(this.page);



});

After(function(){


    console.log(" Iam going to close ");
})

BeforeStep(function(){


});
AfterStep(async function({result})  {
if(result.status === Status.FAILED)
    {
    await this.page.screenshot({ path: 'screenshot1.png' });
    console.log("Screenshot captured");
}

})