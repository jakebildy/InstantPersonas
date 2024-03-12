import Sidebar from "@/components/Sidebar";
import Chat from "@/components/chat";
import UserPersona, { PersonaActions } from "@/components/persona";
import { ScrollArea } from "@/components/ui/scroll-area";
import api, { Persona, Message } from "@/services/api.service";
import { useState } from "react";
// import { Message } from "ai";

export const PersonaChat = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      sender: "bot",
      text: `Describe your product or service, and I can create a user persona.`,
    },
  ]);
  const [input, setInput] = useState<string>("");
  const [persona, setPersona] = useState<Persona>({
    name: "",
    gender: "",
    pictureURL: "",
    shortDescriptors: [],
    sections: [],
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (input.trim() === "") return;
    const data = await api.userPersona.messagePersona(input);
    setMessages(data.messageHistory);
    setPersona(data.persona);
    setInput("");
  };

  return (
    <Sidebar currentSelectedPage="Consulting Tools">
      <ScrollArea className="h-screen">
        <div className="flex flex-col">
          <div className="flex-1 flex flex-col">
            <UserPersona {...persona} />
            <PersonaActions />
          </div>
          <Chat
            className="border rounded-lg min-h-[400px]"
            messages={messages}
            handleSubmit={handleSubmit}
            handleInputChange={(e) => setInput(e.target.value)}
            input={input}
          />
        </div>
      </ScrollArea>
    </Sidebar>
  );
};
