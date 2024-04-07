import mongoose, { Schema } from "mongoose";

export interface UserPersona {
    name: string;
    gender: string;
    pictureURL: string;
    color: string;
    productDescription?: string
    sections: [{label: string, description: string}]
    shortDescriptors: [{label: string, description: string, emoji: string}]
  }
  

export interface PersonaChat {
    messageHistory: [{sender: "bot"|"user", text: string}]
    personas?: UserPersona[]
    aiSuggestedChats?: string[]
    user?: string
    contentLastGeneratedAt?: Date
}

const PersonaChatSchema = new mongoose.Schema<PersonaChat>(
    {
    messageHistory: [
        {
        sender: { type: String, required: true },
        text: { type: String, required: true },
        },
    ],
    personas: {type: Schema.Types.Mixed, required: false },
    aiSuggestedChats: [{ type: String, required: false }],
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    contentLastGeneratedAt: { type: Date, required: false },
    },
    {
        versionKey: false,
        timestamps: true,
    },
    );
    
export const PersonaChat = mongoose.models.PersonaChat || mongoose.model("PersonaChat", PersonaChatSchema);

    
    