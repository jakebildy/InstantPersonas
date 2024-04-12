import Stripe from "stripe";

const STRIPE_KEY = process.env.STRIPE_PRIVATE_KEY!;
const STRIPE_API_VERSION = "2024-04-10";
const stripe = new Stripe(STRIPE_KEY, { apiVersion: STRIPE_API_VERSION });

export default stripe;
