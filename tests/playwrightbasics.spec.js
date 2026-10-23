const { table } = require('node:console');
const { execPath } = require('node:process');
const { isPromise } = require('node:util/types');
const {test,expect} = require('playwright/test');

test('browser context  playwright', async ({browser})=>
{
      const context= await browser.newContext();//opening new fresh browser
      const page=await context.newPage();//adding new tab in browser
       const username=page.locator('input#username');
       const password= page.locator('[name=password]');
       const submit=page.locator('#signInBtn')
       const cardTitles=page.locator(".card-body a")
      await page.goto("https://rahulshettyacademy.com/loginpagePractise");//navigating to the url

      await username.fill("rahulshetty");
      await password.fill("Learning@830$3mK2");
      await submit.click();
     console.log( await page.locator("[style*='block']").textContent());
     await expect( page.locator("[style*='block']")).toContainText("Incorrect"); 
      await username.fill("rahulshettyacademy");
     await password.fill("Learning@830$3mK2");
      await submit.click();
    // await console.log(await cardTitles.nth(0).textContent());
    //   await console.log(await cardTitles.last().textContent());

     console.log(  await cardTitles.allTextContents());



});

//when there is no context like proxy and cookies play wiright allows us to launch the browswer directly
//await is a used for wait 
test('page browswer', async({page})=>
{
      await page.goto("https://www.google.com");//navigating to the url
      console.log(await page.title());//getting the title
      await expect(page).toHaveTitle("Google");
      



     
});

test('dropdown and radio button', async({page})=>

      {
            await page.goto("https://rahulshettyacademy.com/loginpagePractise");
            const dropdown=await page.locator("select.form-control");
            
            const documentlink=page.locator("[href*='documents-request']");
               await   dropdown.selectOption("consult");
             await page.pause();

           await page.locator("span.radiotextsty").last().click();
           await  page.locator("#okayBtn").click();
          await  expect(page.locator("span.radiotextsty").last()).toBeChecked();
           await page.locator("span.radiotextsty").last().isChecked();
           await page.locator("#terms").click();
           await page.locator("#terms").uncheck();
            expect(await page.locator("#terms").isChecked()).toBeFalsy();
            await expect(documentlink).toHaveAttribute('class',"blinkingTextsdfd");


           
      });


     test('@Child windows hadl', async ({browser})=>
 {
    const context = await browser.newContext();
    const page =  await context.newPage();
    const userName = page.locator('#username');
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    const documentLink = page.locator("[href*='documents-request']");
 
    const [newPage]=await Promise.all(
   [
      context.waitForEvent('page'),//listen for any new page pending,rejected,fulfilled
      documentLink.click(),
   
   ])//new page is opened
   
 
   const  text = await newPage.locator(".red").textContent();
    const arrayText = text.split("@")
    const domain =  arrayText[1].split(" ")[0]
    //console.log(domain);
    await page.locator("#username").fill(domain);
    console.log(await page.locator("#username").inputValue());
 
 })