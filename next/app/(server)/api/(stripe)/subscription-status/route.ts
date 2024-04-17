import { User } from "@/database/models/user.model";
import stripe from "../stripe-config";

const SITE_URL = process.env.NEXT_PUBLIC_API_URL;

export async function GET(req: Request, { params }: { params: { userID: any } }) {
  if (!params.userID) throw "User ID is not defined";
  try { 
    console.log("Checking subscription status for user: ", params.userID)

    // get the user from the UserID
    const user = await User.findById(params.userID);
    if (!user) throw "User not found";
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
