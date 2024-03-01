
// import { User, UserI } from "../models/user.model";
import { User, UserI } from "../models/user.model";
import dotenv from "dotenv";
import jwt from 'jsonwebtoken';
// import { findUserByEmail } from "./user.service";
import { createUser, findByEmail } from "./user.service";
import * as stytch from "stytch";

dotenv.config();
// Load stytch project env variables from .env file.
const STYTCH_API_KEY: string = process.env.STYTCH_API_KEY || "";
const STYTCH_PROJECT_ID: string = process.env.STYTCH_PROJECT_ID || "";
const JWT_PRIVATE_KEY: string = process.env.JWT_PRIVATE_KEY || "";
const SITE_URL: string = process.env.SITE_URL || "";
const API_URL: string = process.env.API_URL || "";
const PROD: boolean = process.env.NODE_ENV === "production";

if (!STYTCH_API_KEY) throw "process.env.STYTCH_API_KEY is not defined!";
if (!STYTCH_PROJECT_ID) throw "process.env.STYTCH_PROJECT_ID is not defined!";
if (!JWT_PRIVATE_KEY) throw "process.env.JWT_PRIVATE_KEY is not defined!";
if (!SITE_URL) throw "process.env.SITE_URL is not defined!";

const client = new stytch.Client({
  project_id: STYTCH_PROJECT_ID,
  secret: STYTCH_API_KEY,
  env: PROD ? stytch.envs.live : stytch.envs.test,
});

export async function authenticate(token: string): Promise<{jwt: string, user: UserI}> {
  const response = await client.magicLinks
    .authenticate(token);

  if (!response) throw "No user found with token: " + token;
  const email = response.user.emails[0].email;

  const user = await getUser(email);
  const jwt = await getJwtFromUser(user);
  return { user: user, jwt };
}

export async function googleAuthenticate(token: string): Promise<{jwt: string, user: UserI}> {
  console.log("🪙 TOKEN: ", token);
  // client.oauth.authenticate(token);
  const response = await client.oauth.authenticate(token);

  if (!response) throw "No user found with token: " + token;
  const email = response.user.emails[0].email;

  const user = await getUser(email);
  const jwt = await getJwtFromUser(user);
  return { user: user, jwt };
}

export async function sendMagicLinkToEmail(email: string): Promise<void> {
  const response = await client.magicLinks.email
    .loginOrCreate({
      email: email,
      login_magic_link_url: API_URL + "/api/stytch",
      signup_magic_link_url: API_URL + "/api/stytch",
    });
  console.log(response);
}

export async function getUser(email: string): Promise<UserI> {
  const user = await findByEmail(email);
  if (user) return user;

  return await createUser(email);
}

export async function getJwtFromUser(user: UserI): Promise<string> {
  if (!JWT_PRIVATE_KEY) throw "process.env.JWT_PRIVATE_KEY is not defined!";
  return jwt.sign({ _id: user._id }, JWT_PRIVATE_KEY);
}

export async function getUserFromJwt(token: string): Promise<UserI | null> {
  if (!JWT_PRIVATE_KEY) throw "process.env.JWT_PRIVATE_KEY is not defined!";
  const jwtPayload = jwt.verify(token, JWT_PRIVATE_KEY);
  return await User.findById((<UserI>jwtPayload)._id);
}