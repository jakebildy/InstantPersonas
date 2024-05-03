import { User } from "@/app/(server)/models/user.model";
import stripe from "../stripe-config";
import mongoose from "mongoose";
import { initMongoDB } from "@/database/mongodb";

export async function GET(req: Request,) {
  const url = new URL(req.url)

  const userID = url.searchParams.get("id")
  if (!userID) throw "User ID is not defined";

  try { 
    mongoose.connection.readyState === 1 ? console.log("Mongoose Connected") : await initMongoDB();

    console.log("Checking subscription status for user: ", userID)
    const user = await User.findOne({stytchID: userID});


    if (!user) throw "User not found";
    console.log ("User: ", user);
    if (!user.stripeSubscriptionId) throw "User has no subscriptionId";

    const subscription = await stripe.subscriptions.retrieve(user.stripeSubscriptionId);
    // Log subscription status with user's email.
    console.log(subscription)
    console.log("Subscription status for user: ", user.email, subscription.status);
    return Response.json({
      status: subscription.status,
      cancel_at_period_end: subscription.cancel_at_period_end,
      interval: (subscription  as any).plan.interval,
    });
  }
  catch (error) {
    console.log("Error retrieving subscription");
    console.log(error);
    return Response.json({status: "error"});
  }

}
