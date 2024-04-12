import stripe from "../stripe-config";

const SITE_URL = process.env.NEXT_PUBLIC_API_URL;

export async function GET(req: Request, { params }: { params: { user: any } }) {
  // const { user } = req.body;
  // try {
  //   if (!user) throw "Not logged in";
  //   // throw "User has an active subscription";
  //   if (!user.stripeCustomerId)
  //     throw "User has an active subscription but no stripe customer id";
  //   const session = await stripe.billingPortal.sessions.create({
  //     customer: user.stripeCustomerId,
  //     return_url: SITE_URL + "/subscription",
  //   });
  //   return Response.json({
  //     url: session.url,
  //   });
  // } catch (error: any) {
  //   return new Response(`Error: ${error.message}`, {
  //     status: 400,
  //   });
  // }
  //! This is a placeholder response
  return Response.json({
    url: SITE_URL,
  });
}
