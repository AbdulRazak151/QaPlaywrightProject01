class Loginpage{
   constructor(page){

      this.page=page;
      this.SigninButton=page.locator("[value='Login']");
      this.userName=page.locator("#userEmail");
      this.Password=page.locator("#userPassword");
      this.waitforpage=page.waitForLoadState('networkidle');

    
   }
   async goTo(){

       await this.page.goto("https://rahulshettyacademy.com/client");
   }

   async validLogin(userName,password){
         await this.userName.fill(userName);
         await this.Password.fill(password);
         await this.SigninButton.click();
         await this.waitforpage;

   }


}
module.exports={Loginpage}
