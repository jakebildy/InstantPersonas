import api, { Message, Persona } from "@/services/api.service";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export function usePersonaChat(id: string | undefined) {
  const [messages, setMessages] = useState<Message[]>([
    {
      sender: "bot",
      text: `Describe your product or service, and I can create a user persona.`,
      _id: "000",
    },
  ]);
  const [input, setInput] = useState<string>("");
  const [persona, setPersona] = useState<Persona>({
    color: "#ADD8E6",
    name: "",
    gender: "",
    pictureURL: "",
    shortDescriptors: [],
    sections: [],
  });
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [currentID, setCurrentID] = useState<string | undefined>(undefined);
  const [selectedColor, setSelectedColor] = useState<string>("#ADD8E6");
  const navigate = useNavigate();

  const updateColor = async (color: string) => {
    if (!id) return console.error("No id to update persona");
    await api.userPersona.updatePersona({ ...persona, color }, id);
  };

  const updatePicture = async (pictureURL: string) => {
    if (!id) return console.error("No id to update persona");
    await api.userPersona.updatePersona({ ...persona, pictureURL }, id);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setMessages((m) =>
      m.concat([
        {
          sender: "user",
          text: input,
          _id:
            Math.random().toString(36).substring(2, 15) +
            Math.random().toString(36).substring(2, 15),
        },
        {
          sender: "bot",
          text: "...",
          _id:
            Math.random().toString(36).substring(2, 15) +
            Math.random().toString(36).substring(2, 15),
        },
      ])
    );
    if (input.trim() === "") return;
    try {
      const data = await api.userPersona.messagePersona(input, id);
      console.log("New Message History: ", data.messageHistory);
      setMessages(data.messageHistory);
      if (data.persona) {
        setPersona(data.persona);
      }
      setSuggestions(data.aiSuggestedChats ?? []);
      setInput("");
      if (!id && data.persona) {
        navigate("/persona/" + data._id);
        setCurrentID(data._id);
      }
    } catch (error) {
      console.error("Error sending message", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      if (!id) return;
      const data = await api.userPersona.getPersonaHistory(id);
      const persona = data.at(-1);
      if (!persona) return;
      setMessages(persona.messageHistory);
      setPersona(persona.persona!);
      setSelectedColor(persona.persona?.color ?? "#ADD8E6");
      setSuggestions(persona.aiSuggestedChats ?? []);
      setCurrentID(persona._id);
    };
    fetchData();
  }, [id]);

  useEffect(() => {
    if (id !== currentID) {
      setMessages([
        {
          sender: "bot",
          text: `Describe your product or service, and I can create a user persona.`,
          _id: "000",
        },
      ]);
      setInput("");
      setPersona({
        color: "#ADD8E6",
        name: "",
        gender: "",
        pictureURL: "",
        shortDescriptors: [],
        sections: [],
      });
      setSuggestions([]);
      setSelectedColor("#ADD8E6");
    }
  }, [id, currentID]);

  return {
    messages,
    input,
    persona,
    suggestions,
    loading,
    selectedColor,
    setInput,
    setLoading,
    updateColor,
    updatePicture,
    handleSubmit,
    setPersona,
    setSelectedColor,
    currentID,
  };
}
