import mongoose, { Schema } from "mongoose";
import { AIState } from "./ai-state-type-validators";

export interface PersonaChatType {
  aiState: AIState;
  aiSuggestedChats?: string[];
  user?: string;
  contentLastGeneratedAt?: Date;
  _id?: string;
}

const PersonaChatSchema = new mongoose.Schema<PersonaChatType>(
  {
    aiState: { type: Schema.Types.Mixed, required: false },
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
