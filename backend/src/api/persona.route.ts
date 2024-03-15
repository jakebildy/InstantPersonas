
import express, { Response } from "express";
import { RequestI } from "../types/request";
import * as PersonaService from "../services/persona.service";
import { userAuth } from "../middleware/auth.middleware";
import { UserI } from "../models/user.model";

export const router = express.Router();

// Get User's Businesses.
async function getPersonaHistory(req: RequestI, res: Response) {
  try {
    const user = req.user;
    if (!user) return res.status(401).json({ error: "Unauthorized" });
    const id = req.params.id;
    if (id) {
      const personaHistories = await PersonaService.getPersonaHistory(
        req.user as UserI,
        id
      );
      res.status(200).json({results: personaHistories });
      return;
    }
 
    const personaHistories = await PersonaService.getPersonaHistory(
      req.user as UserI,
    );
    
    res.status(200).json({results: personaHistories });
  } catch (error: unknown) {
    console.error("Error getting persona history", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}

async function messagePersona(req: RequestI, res: Response) {
  try {
    const user = req.user;
    if (!user) return res.status(401).json({ error: "Unauthorized" });

    const personaHistory = await PersonaService.messagePersona(
        req.user as UserI,
      req.body.newMessage,
      req.body.historyID,
    );
    res.status(200).json(personaHistory);
  } catch (error: unknown) {
    console.error("Error messaging persona", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}


router.get("/get-persona-history/:id", userAuth, getPersonaHistory);
router.get("/get-persona-history/", userAuth, getPersonaHistory);
router.post("/message-persona/", userAuth, messagePersona);
