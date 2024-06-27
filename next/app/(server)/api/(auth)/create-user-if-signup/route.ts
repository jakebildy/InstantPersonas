import { User } from "@/app/(server)/models/user.model";
import { initMongoDB } from "@/app/(server)/mongodb";
import { IS_TEST_DEV_ENV } from "@/lib/utils";
import axios from "axios";
import { NextApiResponse } from "next";
const crypto = require('crypto');

export async function POST(req: any, res: NextApiResponse) {
  const data = await req.json();

  const { userID, email } = data;
  if (!userID) throw "User ID is not defined";
  if (!email) throw "User ID is not defined";

  await initMongoDB();

  //  after u have this. make sure the logic to update the stripe subscriptionID exists.
  IS_TEST_DEV_ENV
    ? console.log(
        "DEV: POST -> Creating user with ID: ",
        userID,
        " and email: ",
        email,
      )
    : null;

  try {
    const user = await User.findOne({ stytchID: userID });
    console.log("Found User: ", user);
    if (!user) throw "User not found";
    return Response.json(user);
  } catch (error) {
    // create user
    const newUser = new User({
      stytchID: userID,
      email: email,
      stripeCustomerId: null,
      stripeSubscriptionId: null,
      onBoarded: false,
    });
    await newUser.save();

    const hashedEmail = crypto.createHash('sha256').update(email).digest('hex');
    const TOKEN = process.env.FB_ACCESS_TOKEN;
    const PIXEL_ID = process.env.FB_PIXEL_ID;

    // A Unix timestamp in seconds indicating when the actual event occurred
    const eventTime = Math.round(new Date().getTime() / 1000);

    // Log FB Conversions API event
    const body = {
        "data": [
            {
                "event_name": "CompleteRegistration",
                "event_time": eventTime,
                "action_source": "website",
                "user_data": {
                    "em": [
                      hashedEmail
                    ]
                }
            }
        ]
    };

    try {
      const response = await axios.post(`https://graph.facebook.com/v20.0/${PIXEL_ID}/events?access_token=${TOKEN}`, body, {
          headers: {
              'Content-Type': 'application/json'
          }
      });
      console.log('Event logged successfully:', response.data);
  } catch (error) {
      console.error('Error logging event:', error);
  }

    console.log("Created new user: ", newUser);
    return Response.json(newUser);
  }
}
