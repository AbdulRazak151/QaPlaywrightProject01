//const { test: base } = require('@playwright/test');
import {test as baseTest} from '@playwright/test'
interface TestDataForOrder{
   username:string;
   password:string;
   productName: string;

}
export const customtest = baseTest.extend<{testDataForOrder:TestDataForOrder}>({

    testDataForOrder: {

        username: "abd234@gmail.com",
        password: "Abdul@12345",
        productName: "ZARA COAT 3"

    }

});