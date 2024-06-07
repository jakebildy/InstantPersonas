import mongoose, { Schema } from "mongoose";
import { AIState } from "./ai-state-type-validators";

export interface DocumentDraft {
  title: string;
  content: string;
  user: string;
  // associatedPersonas 
}

export interface DocumentDraft {
  title: string;
  content: string;
  user: string;

  _id?: string;
}

const DocumentDraftSchema = new mongoose.Schema<DocumentDraft>(
  {
    title: { type: String, required: true },
    content: { type: String, required : true },
    user: { type: String, required: true },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

export const DocumentDraft =
  mongoose.models.DocumentDraft ||
  mongoose.model("DocumentDraft", DocumentDraftSchema);
