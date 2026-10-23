Feature: Ecommerce2 validations

Scenario Outline: Scenario Outline name: Placing the Order
    Given a login to Ecommerce2 application with "<username>" and "<password>"
    Then verify error message is displayed

    Examples:
        | username           | password | 
        | abd234@gmail.com   | Abdul@12345  |
        |hello@gmail.com     | Iamhell2023 |