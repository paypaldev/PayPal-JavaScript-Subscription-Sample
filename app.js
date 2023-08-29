/**
 * To run subscriptions you need to have subscription plan & a product.
 * @see https://developer.paypal.com/docs/subscriptions/
 */
window.paypal
    .Buttons({
      createSubscription: function (data, actions) {
        return actions.subscription.create({
          // Replace this pland id with your own plan id. The plan id comes from your subscription plan.
          plan_id: "P-1YF851708F902354HMTW66HI",
        });
      },
      onApprove: function (data, actions) {
        resultMessage("You have successfully subscribed to " + data.subscriptionID); // Optional message given to subscriber
      },
    })
    .render("#paypal-button-container"); // Renders the PayPal button


// Example function to show a result to the user. Your site's UI library can be used instead.
function resultMessage(message) {
  const container = document.querySelector("#result-message");
  container.innerHTML = message;
}