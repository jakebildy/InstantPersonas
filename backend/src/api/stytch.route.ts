
import express, { Response } from "express";
import { RequestI } from "../types/request";
import * as StytchService from "../services/stytch.service";
import dotenv from "dotenv";
dotenv.config();
export const router = express.Router();

const SITE_URL = process.env.SITE_URL as string;
if (!SITE_URL) throw new Error("SITE_URL is not defined");

async function magicLink(req: RequestI, res: Response) {
  try {
    const token: string = req.query.token as string;
    const response = await StytchService.authenticate(token);
    res.cookie('user', response.jwt);

    if (!response.user.onboarded) return res.redirect(302, SITE_URL + "/onboarding");
    return res.redirect(302, SITE_URL + "/home");
  } catch (e) {
    console.log(e);
    res.status(500).send(e);
  }
}

async function googleAuthenticate(req: RequestI, res: Response) {
  try {
    const token: string = req.query.token as string;
    const response = await StytchService.googleAuthenticate(token);
    res.cookie('user', response.jwt);
    
    if (!response.user.onboarded) return res.redirect(302, SITE_URL + "/onboarding");
    return res.redirect(302, SITE_URL + "/home");
  } catch (e) {
    console.log(e);
    res.status(500).send(e);
  }
}

async function loginOrSignup(req: RequestI, res: Response) {
  try {
    const email: string = req.body.email as string;
    console.log("Trying to Login or Signup", email);
    const response = await StytchService.sendMagicLinkToEmail(email);
    return res.status(200).json(response);
  } catch (e) {
    console.log(e);
    res.status(500).send(e);
  }
}

router.get("/stytch/", magicLink);
router.get("/stytch/google", googleAuthenticate);
router.post("/stytch/login-or-signup", loginOrSignup);