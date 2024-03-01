import express from "express";
import { router } from "./auth.route";
import { router as testRouter } from "./test.route";
import { router as stripeRouter } from "./stripe.route";
import { router as stytchRouter } from "./stytch.route";
import { router as BusinessRouter } from "./business.route";
import { router as imageRouter } from "./image.route";

export const Api = express.Router();
Api.use("/test", testRouter);
Api.use(router);
Api.use(stripeRouter);
Api.use(stytchRouter);
Api.use(BusinessRouter);
Api.use(imageRouter);