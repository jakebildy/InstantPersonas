import api, { Message, Persona } from "@/services/api.service";
import { useEffect, useLayoutEffect, useState } from "react";
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

  useLayoutEffect(() => {
    // Ensure this runs on the client side only due to DOM manipulation
    if (typeof window !== "undefined") {
      // Convert the selected color from hex to HSL and then to a palette
      const paletteHSL = convertMainHSLtoPalette(hexToHSL(selectedColor));

      // Iterate over the palette keys and update CSS variables for each
      Object.entries(paletteHSL).forEach(([key, value]) => {
        document.documentElement.style.setProperty(
          `--persona-${key}`,
          `${value.h.toFixed(1)} ${value.s.toFixed(1)}% ${value.l.toFixed(1)}%`
        );
      });
    }
  }, [selectedColor]);

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

type HSL = {
  h: number;
  s: number;
  l: number;
};

function hexToHSL(hex: string): HSL {
  // Remove the hash at the start if it's there
  hex = hex.replace(/^#/, "");

  // Parse the r, g, b values
  let r, g, b;
  if (hex.length === 3) {
    r = parseInt(hex[0] + hex[0], 16);
    g = parseInt(hex[1] + hex[1], 16);
    b = parseInt(hex[2] + hex[2], 16);
  } else {
    r = parseInt(hex.substring(0, 2), 16);
    g = parseInt(hex.substring(2, 4), 16);
    b = parseInt(hex.substring(4, 6), 16);
  }

  // Convert to HSL
  r /= 255;
  g /= 255;
  b /= 255;
  const max = Math.max(r, g, b),
    min = Math.min(r, g, b);
  let h = 0, // Initialize h to 0 to ensure it's never undefined
    s,
    l = (max + min) / 2;

  if (max === min) {
    s = 0; // achromatic
  } else {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
    }
    h /= 6;
  }

  // Convert to percentages and ensure h is defined
  s *= 100;
  l *= 100;
  h *= 360; // Convert hue to degrees

  return {
    h,
    s,
    l,
  };
}

function convertMainHSLtoPalette(foreground: HSL): {
  background: HSL;
  foreground: HSL;
  border: HSL;
  accent: HSL;
  text: HSL;
  title: HSL;
} {
  // Adjust the lightness for the background to be lighter than the foreground
  const background = { ...foreground, l: Math.min(95, foreground.l + 30) };

  // Create a border color by slightly decreasing the lightness
  const border = { ...foreground, l: Math.max(20, foreground.l - 10) };

  // Accent color can be a complementary color (180 degrees hue shift)
  const accent = {
    h: (foreground.h + 180) % 360,
    s: foreground.s,
    l: foreground.l,
  };

  // Text color for readability; dark or light based on the foreground's lightness
  const text =
    foreground.l > 50 ? { h: 0, s: 0, l: 10 } : { h: 0, s: 0, l: 90 };

  // Title color is a slightly darker version of the foreground for emphasis
  const title = { ...foreground, l: Math.max(15, foreground.l - 15) };

  return { background, foreground, border, accent, text, title };
}
