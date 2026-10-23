Feature: Ecommerce validations
@Regression
Scenario: Placing the Order
    Given a login to Ecommerce application with "abd234@gmail.com" and "Abdul@12345"
    When Add "ZARA COAT 3" to Cart
    Then Verify "ZARA COAT 3" is displayed in the Cart
    When Enter valid details and place the Order
    Then Verify order is present in orderhistory

    Scenario Outline: Scenario Outline name: Placing the Order
    Given a login to Ecommerce2 application with "<username>" and "<password>"
    Then verify error message is displayed

    Examples:
        | username           | password | 
        | abd234@gmail.com   | Abdul@12345  |
        |hello@gmail.com     | Iamhell2023 |