![PayPal Developer Cover](https://github.com/paypaldev/.github/blob/main/pp-cover.png)

<div align="center">
  <a href="https://twitter.com/paypaldev" target="_blank">
    <img alt="Twitter: PayPal Developer" src="https://img.shields.io/twitter/follow/paypaldev?style=social" />
  </a>
  <br />
  <a href="https://twitter.com/paypaldev" target="_blank">Twitter</a>
    <span>&nbsp;&nbsp;-&nbsp;&nbsp;</span>
  <a href="https://www.paypal.com/us/home" target="_blank">PayPal</a>
    <span>&nbsp;&nbsp;-&nbsp;&nbsp;</span>
  <a href="https://developer.paypal.com/home" target="_blank">Docs</a>
    <span>&nbsp;&nbsp;-&nbsp;&nbsp;</span>
  <a href="https://github.com/paypaldev" target="_blank">Code Samples</a>
    <span>&nbsp;&nbsp;-&nbsp;&nbsp;</span>
  <a href="https://dev.to/paypaldeveloper" target="_blank">Blog</a>
  <br />
  <hr />
</div>

# PayPal JavasScript (NodeJS) Subscription

This sample app shows how to build and customize a subscripton payment. To learn more about the steps to create an app with subscriptions follow [this](https://developer.paypal.com/docs/subscriptions/) instructions.

This repo has two branches: 
- Main: You will only find the minimal development for integration the subscription buttons into your webn application.
- Advanced: You will find a more advanced version of the Main branch. In this branch we have added two buttons. These buttons make API calls to the PayPal REST APIs to create a product and a subscription plan.

**Notes:**
- Every time you create a new product, the product id needs to be different.
- The "PayPal-Request-Id" for the create product and create plan needs to be the same.

## Run this project

### PayPal Codespaces

[![Open Code In GitHub Codespaces](https://github.com/codespaces/badge.svg)](https://codespaces.new/paypaldev/PayPal-JavaScript-Subscription-Sample?devcontainer_path=.devcontainer%2Fdevcontainer.json)

- In the `app.js` replace the pland id with your own plan id. The plan id comes from your subscription plan.

### Locally

Open the `checkout.html` file in your browser.

- In the `app.js` replace the pland id with your own plan id. The plan id comes from your subscription plan.

### Frontend

- Open the `checkout.html` and replace the `test` string in the script tag with your PayPal Client ID.

## PayPal Developer Community

The PayPal Developer community helps you build your career while improving your products and the developer experience. You’ll be able to contribute code and documentation, meet new people and learn from the open-source community.

- Website: [developer.paypal.com](https://developer.paypal.com)
- Twitter: [@paypaldev](https://twitter.com/paypaldev)
- GitHub: [@paypal](https://github.com/paypal)
