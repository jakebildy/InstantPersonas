import { User } from "@/app/(server)/models/user.model";
import stripe from "../stripe-config";
import mongoose from "mongoose";
import { initMongoDB } from "@/app/(server)/mongodb";
import { IS_TEST_DEV_ENV } from "@/lib/utils";

export async function GET(req: Request) {
  const url = new URL(req.url);
  const userID = url.searchParams.get("id");
  if (!userID) throw "User ID is not defined";

  try {
    await initMongoDB();

    // console.log("Checking subscription status for user: ", userID);
    const user = await User.findOne({ stytchID: userID });

    if (!user) throw "User not found";
    // console.log("User: ", user);
    //? If in test/dev environment, return active subscription status but only if user is found
    if (IS_TEST_DEV_ENV) {
      return Response.json({
        status: "active",
        cancel_at_period_end: false,
        interval: "month",
      });
    } else {
      if (!user.stripeSubscriptionId) throw "User has no subscriptionId";

      const subscription = await stripe.subscriptions.retrieve(
        user.stripeSubscriptionId
      );
      // Log subscription status with user's email.
      //? Should never trigger, but is here for future debugging purposes
      IS_TEST_DEV_ENV
        ? console.log(
            "Subscription status for user: ",
            user.email,
            subscription.status
          )
        : null;
      return Response.json({
        status: subscription.status,
        cancel_at_period_end: subscription.cancel_at_period_end,
        interval: (subscription as any).plan.interval,
      });
    }
  } catch (error) {
    console.error("Error retrieving subscription", error);
    return Response.json({ status: "error" });
  }
}
