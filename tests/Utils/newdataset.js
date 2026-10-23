const { test: base } = require('@playwright/test');

exports.test = base.extend({

    testDataForOrder: {

        username: "abd234@gmail.com",
        password: "Abdul@12345",
        productName: "ZARA COAT 3"

    }

});