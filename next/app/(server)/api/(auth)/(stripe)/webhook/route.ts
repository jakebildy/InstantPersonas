import { User } from "@/app/(server)/models/user.model";
import { initMongoDB } from "@/app/(server)/mongodb";
import mongoose from "mongoose";
import { NextApiResponse } from "next";
import { headers } from "next/headers";
import stripe from "stripe";
import Stripe from "stripe";

const STRIPE_ENDPOINT_SECRET: string | undefined =
  process.env.STRIPE_ENDPOINT_SECRET;

export async function POST(req: any, res: NextApiResponse) {
  const body = await req.text();
  const signature = headers().get("Stripe-Signature") as string;

  if (STRIPE_ENDPOINT_SECRET === undefined) {
    throw "STRIPE_ENDPOINT_SECRET is not defined";
  }
  const event = stripe.webhooks.constructEvent(
    body,
    signature,
    STRIPE_ENDPOINT_SECRET,
  );
  // Handle the event
  console.log("Stripe Event: ", event.type);

  // Handle the checkout.session.completed event
  if (event.type === "checkout.session.completed") {
    const session = event.data.object;
    await fulfillOrder(session as Session);
  }

  return Response.json(true);
}

type Session = Stripe.Response<Stripe.Checkout.Session>;

async function fulfillOrder(session: Session): Promise<void> {
  await initMongoDB();

  console.log("Fulfilling order", session);
  if (session.payment_status != "paid") {
    console.log("😭 Payment status is not paid");
    console.log("Payment status: ", session.payment_status);
    return;
  }

  const stytchID = session.client_reference_id;
  console.log("Fulfill order for user: ", stytchID);

  const stripeCustomerId: string = session.customer as string;
  const stripeSubscriptionId: string = session.subscription as string;

  if (!stripeCustomerId) throw "Stripe customer id is empty";
  if (!stripeSubscriptionId) throw "Stripe subscription id is empty";
  if (!stytchID) throw "User id is empty";

  let user = await User.findOne({ stytchID });
  if (!user) throw "User not found";

  // update User with stripeCustomerId and stripeSubscriptionId
  user = await User.updateOne(
    { stytchID: stytchID },
    { stripeCustomerId, stripeSubscriptionId },
  );

  if (!user) throw "User not found";

  console.log("Activated subscription for user: ", user.email);
}
