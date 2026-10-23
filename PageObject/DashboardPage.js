class DashboardPage
{
  constructor(page){
       this.prodcuts = page.locator(".card-body");
       this.prodcutsText=page.locator(".card-body b"); 
       this.cart=page.locator("[routerlink*='cart']");

  }

 async  searchProductAddCart(productName){
       
          
          const titles = await this.prodcutsText.allTextContents();
          console.log(titles); 
          const count = await this.prodcuts.count();
          for (let i = 0; i < count; ++i) {
             if (await this.prodcuts.nth(i).locator("b").textContent() === productName) {
                //add to cart
                await this.prodcuts.nth(i).locator("text= Add To Cart").click();
                break;

             }
          }
           
  }
  async navigateTocart(){
       
     await this.cart.click();

  }
}
module.exports={DashboardPage};