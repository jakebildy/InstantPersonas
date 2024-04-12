import stripe from "../stripe-config";

const SITE_URL = process.env.NEXT_PUBLIC_API_URL;

export async function GET(req: Request, { params }: { params: { user: any } }) {
  return Response.json(true);
}
