class Apiutils
{
  
     constructor(apiContext,logindata,orderdata){
        this.apiContext=apiContext;
        this.logindata=logindata;
        this.orderdata=orderdata;
     }
    async getToken(){
     const loginResponse = await this.apiContext.post("https://rahulshettyacademy.com/api/ecom/auth/login",{data:this.logindata})
     //expect( loginResponse.ok()).toBeTruthy();
     const loginresponsejson=await  loginResponse.json();
      const token=loginresponsejson.token;
     console.log(token);
      return token

    }


    async createOrder(orderdata){
       
        let response={};
           response.token= await this.getToken();
        const orderResposne= await this.apiContext.post("https://rahulshettyacademy.com/api/ecom/order/create-order",
        
                {
                    data:  this.orderdata,
                    headers: {'Authorization':response.token,
                    'Content-Type': 'application/json'
                    },
                }
             )
              const  OrdersResponseJson= await orderResposne.json();
              console.log(OrdersResponseJson);
           const orderId= OrdersResponseJson.orders[0];
               response.orderId=orderId;
            return response;          
    }


}
module.exports = { Apiutils };