import { expect, type Locator, type Page } from '@playwright/test';

let message1: string="hello";
message1="bye";
console.log(message1);
let age:number=20;
console.log(age);
let isActive:boolean=false;
let numbers: number[]=[1,2,3];
let data: any="this could be anything"
data=42;
function add(a:number,b:number){
     return (a+b)


}
let c:number= add(3,5)
console.log(c)

let user:{name:string,age:number}={name:"bob",age:34};
//user.location="delhi";

class CartPage
{
    page:Page;
    cartProducts
constructor(page:Page)
{
    this.page = page;
    this.cartProducts = page.locator("div li").first();
    this.productsText = page.locator(".card-body b");
    this.cart =  page.locator("[routerlink*='cart']");
    this.orders = page.locator("button[routerlink*='myorders']");
    this.checkout = page.locator("text=Checkout");

}


async Checkout()
{
    await this.checkout.click();
}

 getProductLocator(productName)
{
    return  this.page.locator("h3:has-text('"+productName+"')");
}

}
module.exports = {CartPage};


