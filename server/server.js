import express from "express";
import fetch from "node-fetch";
import "dotenv/config";
import path from "path";

const {
  PAYPAL_CLIENT_ID,
  PAYPAL_CLIENT_SECRET,
  PLAN_ID,
  PORT = 8888,
} = process.env;
const base = "https://api-m.sandbox.paypal.com";
const app = express();

// host static files
app.use(express.static("client"));

// parse post params sent in body in json format
app.use(express.json());

/**
 * Generate an OAuth 2.0 access token for authenticating with PayPal REST APIs.
 * @see https://developer.paypal.com/api/rest/authentication/
 */
const generateAccessToken = async () => {
  try {
    if (!PAYPAL_CLIENT_ID || !PAYPAL_CLIENT_SECRET) {
      throw new Error("MISSING_API_CREDENTIALS");
    }
    const auth = Buffer.from(
      PAYPAL_CLIENT_ID + ":" + PAYPAL_CLIENT_SECRET,
    ).toString("base64");
    const response = await fetch(`${base}/v1/oauth2/token`, {
      method: "POST",
      body: "grant_type=client_credentials",
      headers: {
        Authorization: `Basic ${auth}`,
      },
    });

    const data = await response.json();
    return data.access_token;
  } catch (error) {
    console.error("Failed to generate Access Token:", error);
  }
};

/**
 * Create a product for you catalog.
 * @see https://developer.paypal.com/docs/api/catalog-products/v1/#products_create
 */
const createSubscription = async () => {
  const url = `${base}/v1/billing/subscriptions`;
  const accessToken = await generateAccessToken();
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
      Accept: "application/json",
      Prefer: "return=representation",
    },
    body: JSON.stringify({
      plan_id: PLAN_ID,
    }),
  });

  return handleResponse(response);
};
/**
 * Create a subscription plan.
 * @see https://developer.paypal.com/docs/api/subscriptions/v1/#plans_create
 */
const activateSubscription = async ({subscriptionId}) => {
  console.log('SUB ID', subscriptionId);
  const url = `${base}/v1/billing/subscriptions/${subscriptionId}/activate`;
  const accessToken = await generateAccessToken();
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify({ reason: "Reactivating the subscription" }),
  });

  return handleResponse(response);
};

const handleResponse = async (response) => {
  try {
    const jsonResponse = await response.json();
    return {
      jsonResponse,
      httpStatusCode: response.status,
    };
  } catch (err) {
    const errorMessage = await response.text();
    throw new Error(errorMessage);
  }
};

app.post("/api/paypal/create-subscription", async (req, res) => {
  try {
    const { jsonResponse, httpStatusCode } = await createSubscription();
    res.status(httpStatusCode).json(jsonResponse);
  } catch (error) {
    console.error("Failed to create order:", error);
    res.status(500).json({ error: "Failed to create order." });
  }
});

app.post("/api/paypal/activate-subscription", async (req, res) => {
  try {
    const { jsonResponse, httpStatusCode } = await activateSubscription(req.body);
    res.status(httpStatusCode).json(jsonResponse);
  } catch (error) {
    console.error("Failed to create order:", error);
    res.status(500).json({ error: "Failed to create order." });
  }
});

// serve index.html
app.get("/", (req, res) => {
  res.sendFile(path.resolve("./client/checkout.html"));
});

app.listen(PORT, () => {
  console.log(`Node server listening at http://localhost:${PORT}/`);
});
