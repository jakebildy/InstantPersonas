
import { User, UserI } from "../../../next/database/models/user.model";
import dotenv from "dotenv";
import jwt from 'jsonwebtoken';
import * as StripeService from "./stripe.service";

dotenv.config();
const JWT_PRIVATE_KEY = process.env.JWT_PRIVATE_KEY;

export async function findByEmail(email: string): Promise<UserI | null> {
  const user = await User.findOne({email: email});
  if (user) return user;

  return await User.findOne({ email: email.toLowerCase() });
}

export async function findById(id: string): Promise<UserI | null> {
  return await User.findById(id);
}

// findByStripeCustomerId
export async function findByStripeCustomerId(customerId: string): Promise<UserI | null> {
  return await User.findOne({ stripeCustomerId: customerId });
}

export async function createUser(email: string): Promise<UserI> {
  email = email.toLowerCase();

  const _user: UserI | null = await findByEmail(email);
  if (_user) throw "There is already a user with the email: " + email;

  return await User.create({ email });
}

export async function getJwtFromUser(user: UserI): Promise<string> {
  if (!JWT_PRIVATE_KEY) throw "process.env.JWT_PRIVATE_KEY is not defined!";
  return jwt.sign({ _id: user._id }, JWT_PRIVATE_KEY);
}

export async function getUserFromJwt(token: string): Promise<UserI> {
  if (!JWT_PRIVATE_KEY) throw "process.env.JWT_PRIVATE_KEY is not defined!";
  const jwtPayload = jwt.verify(token, JWT_PRIVATE_KEY);
  const user = await User.findById((<UserI>jwtPayload)._id);
  if (!user) throw "User not found";
  return user;
}

// Update user stripeCustomerId and stripeSubscriptionId.
export async function updateStripeCustomerIdAndSubscriptionId(user: UserI, stripeCustomerId: string, stripeSubscriptionId: string): Promise<UserI | null> {
  if (!user) throw "User is not defined";
  if (!stripeCustomerId) throw "Stripe customer id is not defined";
  if (!stripeSubscriptionId) throw "Stripe subscription id is not defined";
  user.stripeCustomerId = stripeCustomerId;
  user.stripeSubscriptionId = stripeSubscriptionId;
  return await User.findByIdAndUpdate(user._id, user, { new: true });
}

// Get user by subscription id.
export async function findByStripeSubscriptionId(stripeSubscriptionId: string): Promise<UserI | null> {
  return await User.findOne({ stripeSubscriptionId });
}

// Use credit.
export async function useCredit(user: UserI, amount = 1): Promise<UserI> {
  if (!user) throw "User is not defined";
  if (!user.credits) throw "User credits is not defined";

  if (amount < 0) throw "Amount must be greater than 0";
  if (user.credits < amount) throw "Not enough credits";
  user.credits -= amount;
  const updatedUser = await User.findByIdAndUpdate(user._id, user, { new: true });
  if (!updatedUser) throw "Update User not found";
  return updatedUser;
}

// Give credit to user.
export async function giveCredit(user: UserI, amount = 1): Promise<UserI> {
  if (!user) throw "User is not defined";
  // if (user.credits) throw "User credits is not defined";

  if (amount < 0) throw "Amount must be greater than 0";
  user.credits += amount;
  const updatedUser = await User.findByIdAndUpdate(user._id, user, { new: true });
  if (!updatedUser) throw "Update User not found";
  return updatedUser;
}


// Set the user to be onboarded.
export async function setOnboarded(user: UserI): Promise<UserI> {
  if (!user) throw "User is not defined"; 

  user.onboarded = true;
  const updatedUser = await User.findByIdAndUpdate(user._id, user, { new: true });
  if (!updatedUser) throw "Updated user not found";
  return updatedUser;
}