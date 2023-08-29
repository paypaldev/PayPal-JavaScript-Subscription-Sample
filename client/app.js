// Sample Data
const product = {
  name: "Membership",
  type: "PHYSICAL",
  id: "1693308636D", // When you create products, this id always has to be unique.
  description: "Country Club",
  category: "BUSINESS",
  image_url: "https://example.com/gallary/images/1693308636.jpg",
  home_url: "https://example.com/catalog/1693308636.jpg",
};

const createProduct = async (product) => {
  try {
    const response = await fetch("/api/catalogs/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(product),
    });
    const productData = await response.json();
    resultMessage(`Product created succesfully...<br><br>`);
    console.log(productData);
  } catch (error) {
    console.error(error);
    resultMessage(`Could not initiate PayPal Checkout...<br><br>${error}`);
  }
};

const createPlan = async (product) => {
  try {
    const response = await fetch("/api/billing/plans", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(product),
    });
    const { id } = await response.json();
    if (id) {
      resultMessage(`Subcription Plan created succesfully...<br><br>`);
      renderPayPalButtons(id);
    } else {
      throw new Error();
    }
  } catch (error) {
    console.error(error);
    resultMessage(`Could not create PayPal Subscription...<br><br>${error}`);
  }
};

const createProductButton = document
  .getElementById("createProduct")
  .addEventListener("click", ()=>createProduct(product));
const createPlanButton = document
  .getElementById("createPlan")
  .addEventListener("click", () => createPlan(product));

const renderPayPalButtons = (planId) => {
  window.paypal
    .Buttons({
      createSubscription: function (data, actions) {
        return actions.subscription.create({
          plan_id: planId, // Creates the subscription
        });
      },
      onApprove: function (data, actions) {
        resultMessage("You have successfully subscribed to " + data.subscriptionID); // Optional message given to subscriber
      },
    })
    .render("#paypal-button-container"); // Renders the PayPal button
};

// Example function to show a result to the user. Your site's UI library can be used instead.
function resultMessage(message) {
  const container = document.querySelector("#result-message");
  container.innerHTML = message;
}
