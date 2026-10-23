const { test, expect, request } = require('@playwright/test');
const {custometest}=require("./Utils/fixtures.js");
const{Apiutils}   = require    ('./Utils/Apiutils');


custometest("Fixtures demo", async({authenticatedPage, createOrder})=>{
   await authenticatedPage.goto("https://rahulshettyacademy.com/client");
   await  authenticatedPage.locator("button[routerlink*='myorders']").click();
    await authenticatedPage.locator("tbody").waitFor();
    await expect(authenticatedPage.getByText(createOrder.orderId)).tobeVisible();
    




}

)