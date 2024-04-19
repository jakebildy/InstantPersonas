import { User } from "@/app/(server)/models/user.model";
import { NextApiRequest, NextApiResponse } from "next";

export async function POST (req: NextApiRequest, res: NextApiResponse) {
  const { userID, email} = req.body;

//   switch to URL params (todo). then, this should work. after u have this. make sure the logic to update the stripe subscriptionID exists.

  console.log("111" + req.body)

  console .log("Creating user with ID: ", userID, " and email: ", email);

  try {
  const user = await User.findById(userID);
  return res.status(200).json(user);
  } catch (error) {
    // create user
    const newUser = new User({
      _id: userID,
      email : email,
      stripeCustomerId: null,
      stripeSubscriptionId: null,
      onBoarded: false,
    });
    await newUser.save();
    return res.status(200).json(newUser);
  }
}