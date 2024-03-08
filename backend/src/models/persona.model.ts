import mongoose, { Schema } from "mongoose";

export interface UserPersona {
    name: string;
    gender: string;
    pictureURL: string;
    sections: [{label: string, description: string}]
  }
  

// const PersonaSchema = new mongoose.Schema<UserPersona>(
// {
//     id: { type: String, required: true },
//     name: { type: String, required: true },
//     pictureURL: { type: String, required: true },
//     sections: [
//         {
//         label: { type: String, required: true },
//         description: { type: String, required: true },
//         },
//     ],
// },
// {
//     versionKey: false,
//     timestamps: true,
// },
// );

// export const Persona = mongoose.model("Persona", PersonaSchema);


//   PersonaHistory object - contains the message history, AI suggested messages, and the User Persona

export interface PersonaHistory {
    messageHistory: [{sender: "bot"|"user", text: string}]
    persona?: UserPersona
    aiSuggestedChats?: string[]
    user?: string
}

const PersonaHistorySchema = new mongoose.Schema<PersonaHistory>(
    {
    messageHistory: [
        {
        sender: { type: String, required: true },
        text: { type: String, required: true },
        },
    ],
    persona: {type: Schema.Types.Mixed, required: false },
    aiSuggestedChats: [{ type: String, required: false }],
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    },
    {
        versionKey: false,
        timestamps: true,
    },
    );
    
export const PersonaHistory = mongoose.model("PersonaHistory", PersonaHistorySchema);
    
    