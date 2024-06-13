import mongoose, { Schema, Document, Model } from "mongoose";
import { AIState, AIStateValidator } from "./persona-ai.model";
import z from "zod";
import { MongoIDValidator } from "@/app/(server)/api/(persona-crud)/fix-persona-chat/validate-mongo-id";

export interface PersonaChatType {
  aiState: AIState;
  aiSuggestedChats?: string[];
  user?: string;
  createdAt?: Date;
  updatedAt?: Date;
  _id?: string;
}

export const PersonaChatTypeValidator = z.object({
  aiState: AIStateValidator,
  aiSuggestedChats: z.array(z.string()).optional(),
  user: z.string().optional(),
  contentLastGeneratedAt: z.date().optional(),
  _id: MongoIDValidator,
  createdAt: z.union([z.date(), z.string().pipe(z.coerce.date())]).optional(),
  updatedAt: z.union([z.date(), z.string().pipe(z.coerce.date())]).optional(),
});

// Interface for PersonaChat document
// Omitting _id field from PersonaChatType to avoid conflicts with Document._id
export interface PersonaChatDocument extends Document<PersonaChatType> {}

const PersonaChatSchema = new mongoose.Schema<PersonaChatType>(
  {
    aiState: { type: Schema.Types.Mixed, required: false },
    user: { type: String, required: true },
  },
  {
    versionKey: false,
    timestamps: true,
  },
);

export const PersonaChat: Model<PersonaChatDocument> =
  mongoose.models?.PersonaChat ||
  mongoose.model("PersonaChat", PersonaChatSchema);
