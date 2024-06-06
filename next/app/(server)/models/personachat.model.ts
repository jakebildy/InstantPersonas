import mongoose, { Schema, Document, Model } from "mongoose";
import { AIState } from "./persona-ai.model";

export interface PersonaChatType {
  aiState: AIState;
  aiSuggestedChats?: string[];
  user?: string;
  contentLastGeneratedAt?: Date;
  _id?: string;
}

// Interface for PersonaChat document
// Omitting _id field from PersonaChatType to avoid conflicts with Document._id
export interface PersonaChatDocument extends Document<PersonaChatType> {}

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

export const PersonaChat: Model<PersonaChatDocument> =
  mongoose.models?.PersonaChat ||
  mongoose.model("PersonaChat", PersonaChatSchema);
