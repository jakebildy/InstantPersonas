import express, { Response } from "express";
import { RequestI } from "../types/request";
import * as BusinessService from "../services/business.service";
import { userAuth } from "../middleware/auth.middleware";
import { UserI } from "../models/user.model";
import { Business, BusinessI } from "../models/business.model";

export const router = express.Router();

// Get User's Businesses.
async function getBusinesses(req: RequestI, res: Response) {
  try {
    const user = req.user;
    if (!user) return res.status(401).json({ error: "Unauthorized" });

    const businesses = await BusinessService.getBusinessesByUser(
      req.user as UserI,
    );
    res.status(200).json({ businesses });
  } catch (error: unknown) {
    console.error("Error getting businesses", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}

// Create Business.
async function createBusiness(req: RequestI, res: Response) {
  try {
    const user = req.user;
    if (!user) return res.status(401).json({ error: "Unauthorized" });
    const description: string = req.body.description as string;
    const business = await BusinessService.createBusiness(
      req.user as UserI,
      description,
    );
    res.status(200).json({ business });
  } catch (error: unknown) {
    console.error("Error creating business", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}

// Save / Update Business.
async function saveBusiness(req: RequestI, res: Response) {
  try {
    const user = req.user;
    if (!user || !user._id)
      return res.status(401).json({ error: "Unauthorized" });
    const id = req.params.id;
    if (!id) return res.status(400).json({ error: "Missing business id" });

    // Check if business exists and owned by user.
    const business = await BusinessService.getBusinessById(id);
    if (!business) return res.status(404).json({ error: "Business not found" });
    if (!business.user)
      return res.status(500).json({ error: "Business does not have a user" });

    if (business.user.toString() !== user._id.toString()) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const update = req.body as BusinessI;
    const newBusiness: BusinessI = business;
    newBusiness.description = update.description;
    newBusiness.swotAnalysis = update.swotAnalysis;
    newBusiness.pestelAnalysis = update.pestelAnalysis;
    newBusiness.leanCanvas = update.leanCanvas;
    newBusiness.userPersona = update.userPersona;
    newBusiness.valueProposition = update.valueProposition;
    newBusiness.porters5Forces = update.porters5Forces;

    console.log("💡 newBusiness: ", newBusiness);
    const savedBusiness = await BusinessService.saveBusiness(newBusiness);
    res.status(200).json({ business: savedBusiness });
  } catch (error: unknown) {
    console.error("Error saving business", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}

// Delete Business.
async function deleteBusiness(req: RequestI, res: Response) {
  try {
    const user = req.user;
    if (!user || !user._id)
      return res.status(401).json({ error: "Unauthorized" });
    const id = req.params.id;
    if (!id) return res.status(400).json({ error: "Missing business id" });
    const business = await BusinessService.getBusinessById(id);
    if (!business) return res.status(404).json({ error: "Business not found" });
    if (!business.user)
      return res.status(500).json({ error: "Business does not have a user" });
    if (business.user.toString() !== user._id.toString()) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    const deletedBusiness = await BusinessService.deleteBusinessById(id);
    res.status(200).json({ business: deletedBusiness });
  } catch (error: unknown) {
    console.error("Error deleting business", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}

// Get Business by ID.
async function getBusinessById(req: RequestI, res: Response) {
  try {
    const user = req.user;
    if (!user || !user._id)
      return res.status(401).json({ error: "Unauthorized" });
    const id = req.params.id;
    if (!id) return res.status(400).json({ error: "Missing business id" });
    const business = await BusinessService.getBusinessById(id);
    if (!business) return res.status(404).json({ error: "Business not found" });
    if (!business.user)
      return res.status(500).json({ error: "Business does not have a user" });
    if (business.user.toString() !== user._id.toString()) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    res.status(200).json({ business });
  } catch (error: unknown) {
    console.error("Error getting business", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}

// Generate User Persona.
async function generateUserPersona(req: RequestI, res: Response) {
  try {
    const user = req.user;
    if (!user || !user._id)
      return res.status(401).json({ error: "Unauthorized" });
    const id = req.params.id;
    if (!id) return res.status(400).json({ error: "Missing business id" });
    const business = await BusinessService.getBusinessById(id);
    if (!business) return res.status(404).json({ error: "Business not found" });
    if (!business.user)
      return res.status(500).json({ error: "Business does not have a user" });
    if (business.user.toString() !== user._id.toString()) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    const userPersona = await BusinessService.generateUserPersona(
      business.description,
    );
    const savedBusiness = await Business.findByIdAndUpdate(
      id,
      { userPersona },
      { new: true },
    );

    res.status(200).json({ business: savedBusiness, userPersona });
  } catch (error: unknown) {
    console.error("Error generating user persona", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}

// Generate SWOT Analysis.
async function generateSWOTAnalysis(req: RequestI, res: Response) {
  try {
    const user = req.user;
    if (!user || !user._id)
      return res.status(401).json({ error: "Unauthorized" });
    const id = req.params.id;
    if (!id) return res.status(400).json({ error: "Missing business id" });
    const business = await BusinessService.getBusinessById(id);
    if (!business) return res.status(404).json({ error: "Business not found" });
    if (!business.user)
      return res.status(500).json({ error: "Business does not have a user" });
    if (business.user.toString() !== user._id.toString()) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    const swotAnalysis = await BusinessService.generateSWOTAnalysis(
      business.description,
    );
    console.log("💡 swotAnalysis: ", swotAnalysis);
    const savedBusiness = await Business.findByIdAndUpdate(
      id,
      { swotAnalysis },
      { new: true },
    );

    console.log("💡 savedBusiness: ", savedBusiness);
    console.log("💡 business: ", business);
    res.status(200).json({ business: savedBusiness, swotAnalysis });
  } catch (error: unknown) {
    console.error("Error generating SWOT analysis", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}

// Generate Lean Canvas.
async function generateLeanCanvas(req: RequestI, res: Response) {
  try {
    const user = req.user;
    if (!user || !user._id)
      return res.status(401).json({ error: "Unauthorized" });
    const id = req.params.id;
    if (!id) return res.status(400).json({ error: "Missing business id" });
    const business = await BusinessService.getBusinessById(id);
    if (!business) return res.status(404).json({ error: "Business not found" });
    if (!business.user)
      return res.status(500).json({ error: "Business does not have a user" });
    if (business.user.toString() !== user._id.toString()) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    const leanCanvas = await BusinessService.generateLeanCanvas(
      business.description,
    );
    const savedBusiness = await Business.findByIdAndUpdate(
      id,
      { leanCanvas },
      { new: true },
    );
    res.status(200).json({ business: savedBusiness, leanCanvas });
  } catch (error: unknown) {
    console.error("Error generating lean canvas", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}

// PESTEL Analysis.
async function generatePESTELAnalysis(req: RequestI, res: Response) {
  try {
    const user = req.user;
    if (!user || !user._id)
      return res.status(401).json({ error: "Unauthorized" });
    const id = req.params.id;
    if (!id) return res.status(400).json({ error: "Missing business id" });
    const business = await BusinessService.getBusinessById(id);
    if (!business) return res.status(404).json({ error: "Business not found" });
    if (!business.user)
      return res.status(500).json({ error: "Business does not have a user" });
    if (business.user.toString() !== user._id.toString()) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    const pestelAnalysis = await BusinessService.generatePESTELAnalysis(
      business.description,
    );
    const savedBusiness = await Business.findByIdAndUpdate(
      id,
      { pestelAnalysis },
      { new: true },
    );
    res.status(200).json({ business: savedBusiness, pestelAnalysis });
  } catch (error: unknown) {
    console.error("Error generating PESTEL analysis", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}

// Value Proposition
async function generateValueProposition(req: RequestI, res: Response) {
  try {
    const user = req.user;
    if (!user || !user._id)
      return res.status(401).json({ error: "Unauthorized" });
    const id = req.params.id;
    if (!id) return res.status(400).json({ error: "Missing business id" });
    const business = await BusinessService.getBusinessById(id);
    if (!business) return res.status(404).json({ error: "Business not found" });
    if (!business.user)
      return res.status(500).json({ error: "Business does not have a user" });
    if (business.user.toString() !== user._id.toString()) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    const valueProposition = await BusinessService.generateValueProposition(
      business.description,
    );
    const savedBusiness = await Business.findByIdAndUpdate(
      id,
      { valueProposition },
      { new: true },
    );
    res.status(200).json({ business: savedBusiness, valueProposition });
  } catch (error: unknown) {
    console.error("Error generating Value Proposition", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}

// Porters 5 Forces
async function generatePorters5Forces(req: RequestI, res: Response) {
  try {
    const user = req.user;
    if (!user || !user._id)
      return res.status(401).json({ error: "Unauthorized" });
    const id = req.params.id;
    if (!id) return res.status(400).json({ error: "Missing business id" });
    const business = await BusinessService.getBusinessById(id);
    if (!business) return res.status(404).json({ error: "Business not found" });
    if (!business.user)
      return res.status(500).json({ error: "Business does not have a user" });
    if (business.user.toString() !== user._id.toString()) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    const porters5Forces = await BusinessService.generatePorters5Forces(
      business.description,
    );
    const savedBusiness = await Business.findByIdAndUpdate(
      id,
      { porters5Forces },
      { new: true },
    );
    res.status(200).json({ business: savedBusiness, porters5Forces });
  } catch (error: unknown) {
    console.error("Error generating Porter's 5 Forces", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}

// Business Assessment User Questions
async function generateAssessmentQuestions(req: RequestI, res: Response) {
  try {
    const user = req.user;
    if (!user || !user._id)
      return res.status(401).json({ error: "Unauthorized" });
    const description: string = req.body.description as string;
    if (!description)
      return res.status(400).json({ error: "Missing business description" });

    if (description == "ERROR:500") {
      return res.status(500).json({ error: "Simulated Internal Server Error" });
    }
    const assessmentQuestions =
      await BusinessService.generateAssessmentQuestions(description);
    res.status(200).json({ assessmentQuestions });
  } catch (error: unknown) {
    console.error("Error generating assessment questions", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}

router.post(
  "/business/:id/generate-user-persona",
  userAuth,
  generateUserPersona,
);
router.post(
  "/business/:id/generate-swot-analysis",
  userAuth,
  generateSWOTAnalysis,
);
router.post("/business/:id/generate-lean-canvas", userAuth, generateLeanCanvas);
router.post(
  "/business/:id/generate-pestel-analysis",
  userAuth,
  generatePESTELAnalysis,
);
router.post(
  "/business/:id/value-proposition",
  userAuth,
  generateValueProposition,
);
router.post("/business/:id/porters-5-forces", userAuth, generatePorters5Forces);

router.post(
  "/business/assessment-questions",
  userAuth,
  generateAssessmentQuestions,
);

router.post("/business/", userAuth, createBusiness);
router.put("/business/:id", userAuth, saveBusiness);
router.delete("/business/:id", userAuth, deleteBusiness);
router.get("/business/", userAuth, getBusinesses);
router.get("/business/:id", userAuth, getBusinessById);
