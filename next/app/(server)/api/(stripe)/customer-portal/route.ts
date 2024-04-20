import { User } from "@/app/(server)/models/user.model";
import stripe from "../stripe-config";

const SITE_URL = process.env.NEXT_PUBLIC_API_URL;

export async function GET(req: Request, { params }: { params: { user: any } }) {

  const url = new URL(req.url)

  const userID = url.searchParams.get("id")
  if (!userID) throw "User ID is not defined";

  try { 
    console.log("Checking subscription status for user: ", userID)
    const user = await User.findOne({stytchID: userID});

    if (!user) throw "User not found";
  
    if (!user.stripeCustomerId)
      throw "User has an active subscription but no stripe customer id";
    const session = await stripe.billingPortal.sessions.create({
      customer: user.stripeCustomerId,
      return_url: SITE_URL + "/subscription",
    });

    return Response.json({
      url: session.url,
    });

  } catch (error) {

    console.log("Error retrieving customer portal");
    console.log(error);
    return Response.json(false);
  }


}
