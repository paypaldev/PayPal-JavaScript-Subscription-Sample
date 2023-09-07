window.paypal
  .Buttons({
    async createSubscription() {
      try {
        const response = await fetch("/api/paypal/create-subscription", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userAction: "SUBSCRIBE_NOW" }),
        });
        const data = await response.json();
        if (data?.id) {
          resultMessage(`Successful subscription...<br><br>`);
          return data.id;
        } else {
          console.error(
            { callback: "createSubscription", serverResponse: data },
            JSON.stringify(data, null, 2),
          );
          // (Optional) The following hides the button container and shows a message about why checkout can't be initiated
          const errorDetail = data?.details?.[0];
          resultMessage(
            `Could not initiate PayPal Subscription...<br><br>${
              errorDetail?.issue || ""
            } ${errorDetail?.description || data?.message || ""} ` +
              (data?.debug_id ? `(${data.debug_id})` : ""),
            { hideButtons: true },
          );
        }
      } catch (error) {
        console.error(error);
        resultMessage(
          `Could not initiate PayPal Subscription...<br><br>${error}`,
        );
      }
    },
    onApprove(data) {
      /*
        No need to activate manually since  SUBSCRIBE_NOW is being used.
        Learn how to handle other user actions from our docs:
        https://developer.paypal.com/docs/api/subscriptions/v1/#subscriptions_create
      */
      if (data.orderID) {
        resultMessage(
          `You have successfully subscribed to the plan. Your subscription id is: ${data.subscriptionID}`,
        );
      } else {
        resultMessage(
          `Failed to activate the subscription: ${data.subscriptionID}`,
        );
      }
    },
  })
  .render("#paypal-button-container"); // Renders the PayPal button

// Example function to show a result to the user. Your site's UI library can be used instead.
function resultMessage(message) {
  const container = document.querySelector("#result-message");
  container.innerHTML = message;
}
