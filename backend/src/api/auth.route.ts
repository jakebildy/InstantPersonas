import express, { Response } from "express";
import { UserI } from "../models/user.model";
import { RequestI } from "../types/request";
import { userAuth } from "../middleware/auth.middleware";
export const router = express.Router();
import * as UserService from "../services/user.service";

async function me(req: RequestI, res: Response) {
  try {
    if (!req.user) throw "Not logged in";
    const user: UserI = req.user;
    res.status(200).json(user);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
}

async function logout(req: RequestI, res: Response) {
  try {
    res.cookie("user", null);
    return res.json();
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
}

async function setOnboarded(req: RequestI, res: Response) {
  if (!req.user) {
    return res.status(401).send("Not logged in"); // Send 401 Unauthorized status code and message
  }
  try {
    await UserService.setOnboarded(req.user);
    return res.status(200).send("Successfully onboarded"); // Send 200 OK status code and message
  } catch (error) {
    console.error(error);
    return res.status(500).send(error); // Send 500 Internal Server Error status code and error message
  }
}

router.get("/auth/me", userAuth, me);
router.put("/auth/logout", userAuth, logout);
router.put("/auth/onboarded", userAuth, setOnboarded);
