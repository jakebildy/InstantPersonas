import { User } from "@/app/(server)/models/user.model";
import stripe from "../stripe-config";

const SITE_URL = process.env.NEXT_PUBLIC_API_URL;

export async function GET(req: Request,) {
  const url = new URL(req.url)

  const userID = url.searchParams.get("id")
  if (!userID) throw "User ID is not defined";
  try { 
    console.log("Checking subscription status for user: ", userID)
    const user = await User.findOne({stytchID: userID});


    if (!user) throw "User not found";
    console.log ("User: ", user);
    if (!user.stripeSubscriptionId) throw "User has no subscriptionId";

    const subscription = await stripe.subscriptions.retrieve(user.stripeSubscriptionId);
    // Log subscription status with user's email.
    console.log("Subscription status for user: ", user.email, subscription.status);
    return Response.json(subscription.status === "active" || subscription.status === "trialing");
  }
  catch (error) {
    console.log("Error retrieving subscription");
    console.log(error);
    return Response.json(false);
  }

}
