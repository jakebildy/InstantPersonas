import mongoose, { Schema } from "mongoose";
import { AIState } from "./ai-state-type-validators";

export interface UserPersona {
  name: string;
  hair: string;
  glasses: string;
  body: string;
  gender: string;
  pictureURL: string;
  color: string;
  productDescription?: string;
  sections: [{ label: string; description: string }];
  shortDescriptors: [{ label: string; description: string; emoji: string }];
}

export interface PersonaChat {
  aiState: AIState;
  personas?: UserPersona[];
  aiSuggestedChats?: string[];
  user?: string;
  contentLastGeneratedAt?: Date;
  _id?: string;
}

const PersonaChatSchema = new mongoose.Schema<PersonaChat>(
  {
    aiState: { type: Schema.Types.Mixed, required: false },
    personas: [{ type: Schema.Types.Mixed, required: false }],
    aiSuggestedChats: [{ type: String, required: false }],
    user: { type: String, required: true },
    contentLastGeneratedAt: { type: Date, required: false },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

export const PersonaChat =
  mongoose.models.PersonaChat ||
  mongoose.model("PersonaChat", PersonaChatSchema);
