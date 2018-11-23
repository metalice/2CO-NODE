# 2Checkout payment gateway and react 

React stateful component with or without credit form that connect to 2CO api and generate client token

## Getting Started

2Checkout payment gateway need a token to create and charge orders.
This package will create a token for you.

Using this token, you will need to send your order and customer info to 2Checkout to make the charge.

This can be done by [2Checkout API](https://www.2checkout.com/documentation/payment-api/create-sale) or by [2Checkout-Node](https://www.npmjs.com/package/2checkout-node).

I recommend using [2Checkout-Node](https://www.npmjs.com/package/2checkout-node) along with this package to generate token and send it to [2Checkout-Node](https://www.npmjs.com/package/2checkout-node) to create the charge.


### Installing & Usage

A step by step series of examples that tell you how to get a token:

#### Install:

```
npm i 2co-react
```
` or `
```
yarn add 2co-react
```
#### Usage: 

Importing:

```Javascript
import TCO from '2co-react';
```
This is the only component you need to add:
```Javascript
        <TCO
          sellerId="xxxxx"
          publishableKey="xxxxx"
          sandbox
          showForm
          showModal
          showLoading
          returnToken={this.returnToken}
        />
```        

#### Props Options:

| TCO Prop      | VALUE         | Effect |
| ------------- |:-------------:| -----:|
| sellerId     | selled id from 2checkout account| - |
| publishableKey     | publishable key from 2checkout account      |   - |
| sandbox | true or false   |    generate a sandbox or production token |
| showForm | true or false      |    show cedit card form |
| showModal | true or false       |    show credit card form on modal or on page |
| showLoading| true or false     |    show loading bar while waiting for response back |
| returnToken| true or false      |    function that will recive one argument as the token string |



## Authors

* **Matan Schatzman** - [Email](mailto:matanschatzman@gmail.com)

## License

This project is licensed under the MIT License
