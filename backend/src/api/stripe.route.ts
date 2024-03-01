
import express, { Response } from "express";
import { RequestI } from "../types/request";
import { userAuth } from "../middleware/auth.middleware";
import * as StripeService from "../services/stripe.service";
import dotenv from "dotenv";
dotenv.config();
export const router = express.Router();

const STRIPE_ENDPOINT_SECRET = process.env.STRIPE_ENDPOINT_SECRET as string;
if (!STRIPE_ENDPOINT_SECRET) throw "process.env.STRIPE_ENDPOINT_SECRET is not defined!";

// This is your Stripe CLI webhook secret for testing your endpoint locally.
// const endpointSecret = "whsec_e5213b077d35b0f795370d9e7d76000e0a2579ead6799a42728ca00fe47296d0";
// prod whsec_1QFJgVJn6G5rTfbXOIaguqMGiYyZIOer

async function webhook(request: RequestI, response: Response) {
  try {
    // console.log("Webhook: ", request.body);
    const sig = request.headers['stripe-signature'];
    await StripeService.webhook(request, sig, STRIPE_ENDPOINT_SECRET);
    response.status(200).send({ received: true });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    console.error("Error in webhook: ", err);
    response.status(400).send(`Webhook Error: ${err.message}`);
    return;
  }

  // Return a 200 response to acknowledge receipt of the event
  response.send();
};

// Get subscription status.
async function isSubscriptionActive(req: RequestI, res: Response) {
  // TODO: remove this default response after approved by openai.
  // return res.status(200).json(true);
  console.log("🚀  Testing isSubscriptionActive: ", req.user);

  try {
    if (!req.user) throw "Not logged in";
    const isActive = await StripeService.isStripeSubscriptionActive(req.user);
    console.log("🚀 isSubscriptionActive: ", isActive);
    res.status(200).json(isActive);
  } catch (e) {
    console.error(e);
    res.status(500).send(e);
  }
}

// Get customer portal url.
async function getCustomerPortalUrl(req: RequestI, res: Response) {
  try {
    if (!req.user) throw "Not logged in";
    const url = await StripeService.getCustomerPortalUrl(req.user);
    res.status(200).json(url);
  } catch (e) {
    console.error(e);
    res.status(500).send(e);
  }
}

router.post("/stripe/webhook", express.raw({ type: 'application/json' }), webhook);
router.get("/stripe/subscription/active", userAuth, isSubscriptionActive);
router.get("/stripe/portal", userAuth, getCustomerPortalUrl);

// stripe listen --forward-to localhost:7001/api/stripe/webhook
