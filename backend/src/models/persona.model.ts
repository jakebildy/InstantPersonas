import mongoose from "mongoose";

export interface UserPersona {
    id: string;
    name: string;
    pictureURL: string;
    sections: [{label: string, description: string}]
  }
  

  const PersonaSchema = new mongoose.Schema<UserPersona>(
    {
        id: { type: String, required: true },
        name: { type: String, required: true },
        pictureURL: { type: String, required: true },
        sections: [
            {
            label: { type: String, required: true },
            description: { type: String, required: true },
            },
        ],
    },
    {
      versionKey: false,
      timestamps: true,
    },
  );
  
  export const Persona = mongoose.model("Persona", PersonaSchema);
  