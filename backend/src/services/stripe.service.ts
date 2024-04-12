
import { User, UserI } from "../../../next/database/models/user.model";
import dotenv from "dotenv";
import stripe from "../connections/stripe.client";
import Stripe from 'stripe';
import { RequestI } from "../types/request";
import * as UserService from "./user.service";

dotenv.config();

const SITE_URL = process.env.SITE_URL;
if (!SITE_URL) throw "process.env.SITE_URL is not defined!";

type Session = Stripe.Response<Stripe.Checkout.Session>;


export async function webhook(request: RequestI, sig: any, endpointSecret: string): Promise<void> {
  console.log("webhook called");
  if (!request.rawBody) throw "Request rawBody is empty";

  const event = stripe.webhooks.constructEvent(request.rawBody, sig, endpointSecret);
  // Handle the event
  console.log("Stripe Event: ", event.type);

  // Handle the checkout.session.completed event
  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;
    await fulfillOrder(session as Session);
  }

  if (event.type === 'customer.subscription.deleted') {
    const subscription = event.data.object;
    // console.log("TODO: Delete subscription", subscription);
    console.log("TODO: Delete subscription");
    // await onSubscriptionCancelled(subscription);
  }

  if (event.type === 'invoice.payment_succeeded') {
    const invoice = event.data.object;
    // console.log("TODO: Invoice payment succeeded", invoice);
    console.log("TODO: Invoice payment succeeded");
    await onInvoicePaymentSucceeded(invoice as Stripe.Invoice);
  
    // const subscription = event.data.object;
    // console.log("TODO: invoice.payment_succeeded", subscription);
    // await onSubscriptionCancelled(subscription);
  }


  else {
    console.log("Unhandled event: ", event.type);
  }
}


// invoice.payment_succeeded event function. add 50 credits to user.
async function onInvoicePaymentSucceeded(invoice: Stripe.Invoice): Promise<void> {
  // const user = await UserService.findByStripeCustomerId(invoice.customer as string);
  // get client reference id from session
  // const session = await stripe.checkout.sessions.retrieve(invoice.subscription as string) as Session;
  // const user = await UserService.findById(session.client_reference_id as string);
  const email = invoice.customer_email;
  if (!email) throw "Email is empty";
  const user = await UserService.findByEmail(email);
  console.log("invoice.payment_succeeded: ", user?.email);
  if (!user) throw "User not found";
  await UserService.giveCredit(user, 50);
}

// TODO: Ensure we catch errors. If this function fails, it means the 
async function fulfillOrder(session: Session): Promise<void> {
  console.log('Fulfilling order', session);
  if (session.payment_status != "paid" ) {
    console.log("😭 Payment status is not paid");
    console.log("Payment status: ", session.payment_status);
    return;
  }

  const userId = session.client_reference_id;
  console.log("Fullfill order for user: ", userId);

  const stripeCustomerId: string = session.customer as string;
  const stripeSubscriptionId: string = session.subscription as string;

  if (!stripeCustomerId) throw "Stripe customer id is empty";
  if (!stripeSubscriptionId) throw "Stripe subscription id is empty";
  if (!userId) throw "User id is empty";

  let user = await UserService.findById(userId);
  if (!user) throw "User not found";

  user = await UserService.updateStripeCustomerIdAndSubscriptionId(user, stripeCustomerId, stripeSubscriptionId);
  if (!user) throw "User not found";

  console.log('Activated subscription for user: ', user.email);
};

// Is stripe subscription active?
export async function isStripeSubscriptionActive(user: UserI): Promise<boolean> {
  if (!user) throw "User is not defined";
  if (!user.stripeSubscriptionId) return false;
  try {
    const subscription = await stripe.subscriptions.retrieve(user.stripeSubscriptionId);
    // Log subscription status with user's email.
    console.log("Subscription status for user: ", user.email, subscription.status);
    return subscription.status === "active" || subscription.status === "trialing";
  }
  catch (error) {
    console.log("Error retrieving subscription");
    console.log(error);
    return false;
  }
}

// Handle subscription cancelled
async function onSubscriptionCancelled(subscription: Stripe.Subscription): Promise<void> {
  console.log("Subscription cancelled: ", subscription);
  const user = await UserService.findByStripeSubscriptionId(subscription.id);
  if (!user) throw "User not found";

  console.log("TODO: Delete user subscription");
  // deleteStripeSubscriptions(user)
}


// Function Delete stripe users subscriptions.
async function deleteStripeSubscriptions(user: UserI): Promise<void> {
  const customer = await stripe.customers.retrieve("user.stripeCustomerId") as Stripe.Customer;
  if (!customer) throw "Customer not found";

  const subscriptions = customer.subscriptions?.data;
  if (!subscriptions || subscriptions.length === 0) return;

  for (const subscription of subscriptions) {
    await stripe.subscriptions.del(subscription.id);
  }
}

// Create stripe billing portal session. return url to redirect user to.
export async function getCustomerPortalUrl(user: UserI): Promise<string> {
  if (!user) throw "User is not defined";

  // throw "User has an active subscription";
  if (!user.stripeCustomerId) throw "!P0: User has an active subscription but no stripe customer id";

  const session = await stripe.billingPortal.sessions.create({
    customer: user.stripeCustomerId,
    return_url: SITE_URL + '/subscription',
  });

  return session.url;
}


// Create a stripe coupon code.
export async function createCoupon(id?: string): Promise<Stripe.Response<Stripe.Coupon>> {
  const coupon = await stripe.coupons.create({
    id: id,
    duration: 'once',
    // duration: 'repeating',
    "duration_in_months": 3,
    percent_off: 25,
  });

  console.log("Coupon created: ", coupon);
  return coupon;
}

// Get stripe coupon code.
export async function getCoupon(id: string): Promise<Stripe.Response<Stripe.Coupon> | null> {
  try {
    const coupon = await stripe.coupons.retrieve(id);
    console.log("Coupon retrieved: ", coupon);
    return coupon;
  }
  catch(e) {
    console.log("Coupon not found: ", id);
    return null;
  }
}