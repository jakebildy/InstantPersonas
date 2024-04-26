import { User } from "@/app/(server)/models/user.model";
import { initMongoDB } from "@/database/mongodb";
import mongoose from "mongoose";
import { NextApiRequest, NextApiResponse } from "next";

export async function POST (req: any, res: NextApiResponse) {

  const data = await req.json()

  const { userID, email } = data;
  if (!userID) throw "User ID is not defined";
  if (!email) throw "User ID is not defined";

  // check if mongodb is connected
  //  if not, connect to mongodb
  mongoose.connection.readyState === 1 ? console.log("Mongoose Connected") : await initMongoDB();

//  after u have this. make sure the logic to update the stripe subscriptionID exists.

  console .log("POST -> Creating user with ID: ", userID, " and email: ", email);

  try {
  const user = await User.findOne({stytchID: userID});
  console.log ("Found User: ", user);
  if (!user) throw "User not found";
  return Response.json(user);
  } catch (error) {
    // create user
    const newUser = new User({
      stytchID: userID,
      email : email,
      stripeCustomerId: null,
      stripeSubscriptionId: null,
      onBoarded: false,
    });
    await newUser.save();
    console.log("Created new user: ", newUser);
    return Response.json(newUser);
  }
}