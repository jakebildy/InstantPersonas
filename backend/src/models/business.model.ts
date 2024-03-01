import mongoose, { ObjectId } from "mongoose";

export interface LeanCanvas {
  problem: string;
  customerSegments: string;
  solution: string;
  uniqueValueProposition: string;
  channels: string;
  revenueStreams: string;
  costStructure: string;
  keyMetrics: string;
  unfairAdvantage: string;
}

export interface PESTELAnalysis {
  political: string;
  economic: string;
  sociocultural: string;
  technological: string;
  environmental: string;
  legal: string;
}

export interface SWOTAnalysis {
  strengths: string;
  weaknesses: string;
  opportunities: string;
  threats: string;
}

export interface UserPersona {
  _id?: string;
  name: string;
  gender: string;
  age: string;
  location: string;
  occupation: string;
  familyStatus: string;
  bio: string;
  goals: string;
  motivations: string;
  pains: string;
  devices: string;
  brandAffiliations: string;
  imageURL: string;
}

export interface ValueProposition {
  gainCreators: string;
  productsAndServices: string;
  painRelievers: string;
  customerJobs: string;
  customerPains: string;
  customerGains: string;
}

export interface Porters5Forces {
  threatOfNewEntrants: string;
  bargainingPowerOfSuppliers: string;
  bargainingPowerOfBuyers: string;
  threatOfSubstitutes: string;
  competitiveRivalry: string;
}

export interface BusinessI {
  _id?: string;
  user?: string;
  description: string;
  // SWOT Analysis
  // PESTEL Analysis
  // Lean Canvas
  // User Persona
  // Value Proposition
  // Porter's 5 Forces
  swotAnalysis?: SWOTAnalysis;
  pestelAnalysis?: PESTELAnalysis;
  leanCanvas?: LeanCanvas;
  userPersona?: UserPersona;
  valueProposition?: ValueProposition;
  porters5Forces?: Porters5Forces;

  // Timestamps
  createdAt?: Date;
  updatedAt?: Date;
}

export type UserId = string | ObjectId | BusinessI;

const BusinessSchema = new mongoose.Schema<BusinessI>(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    description: { type: String, required: true },

    // SWOT Analysis
    // PESTEL Analysis
    // Lean Canvas
    // User Persona
    swotAnalysis: { type: Object },
    pestelAnalysis: { type: Object },
    leanCanvas: { type: Object },
    userPersona: { type: Object },
    valueProposition: { type: Object },
    porters5Forces: { type: Object },
  },
  {
    versionKey: false,
    timestamps: true,
  },
);

export const Business = mongoose.model("Business", BusinessSchema);
