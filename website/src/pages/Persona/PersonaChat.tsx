import Sidebar from "@/components/Sidebar";
import Chat from "@/components/chat";
import UserPersona, { PersonaActions } from "@/components/persona";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utilities";
import api, { Persona, Message } from "@/services/api.service";
import { useEffect, useState } from "react";
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
  const [suggestions, setSuggestions] = useState<string[]>([
    "Change sections to generate",
    "Provide more details about the product or service",
    "I need a user persona for a product manager",
    "What is a user persona?",
  ]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("input", input);
    if (input.trim() === "") return;
    // const data = await api.userPersona.messagePersona(input);
    // setMessages(data.messageHistory);
    // setPersona(data.persona);
    // setSuggestions(data.aiSuggestedChats ?? []);
    setInput("");
  };

  useEffect(() => {
    const fetchData = async () => {
      const data = await api.userPersona.getPersonaHistroy();
      const persona = data.at(-1);
      if (!persona) return;
      setMessages(persona.messageHistory);
      setPersona(persona.persona);
    };
    fetchData();
  }, []);

  const renderPersona = !personaHasNoValues(persona);

  return (
    <Sidebar currentSelectedPage="Consulting Tools">
      <ScrollArea className="h-screen">
        <div className="flex flex-col">
          {renderPersona ? (
            <div className="flex-1 flex flex-col">
              <UserPersona {...persona} />
              <PersonaActions />
            </div>
          ) : null}
          {/* 18px is padding + margin of the chat component */}
          {/* 78px: 18px + 60px is the height of margin + mobile header */}
          <Chat
            className={cn(
              "border rounded-lg",
              renderPersona
                ? "min-h-[400px]"
                : "min-h-[calc(100dvh-78px)] lg:min-h-[calc(100vh-18px)]"
            )}
            messages={messages}
            handleSubmit={handleSubmit}
            handleInputChange={(e) => setInput(e.target.value)}
            input={input}
          >
            <div className="flex flex-col flex-wrap ">
              <div className="flex gap-4 my-4 overflow-hidden flex-wrap">
                {suggestions.map((suggestion, i) => (
                  <Button
                    key={i}
                    variant={"secondary"}
                    className="text-white bg-gray-400/75 rounded-lg text-xs hover:bg-green-400"
                    type="submit"
                    onClick={() => setInput(suggestion)}
                  >
                    {suggestion}
                  </Button>
                ))}
              </div>
            </div>
          </Chat>
        </div>
      </ScrollArea>
    </Sidebar>
  );
};

function personaHasNoValues({
  name,
  gender,
  pictureURL,
  shortDescriptors,
  sections,
}: Persona): boolean {
  const isStringEmpty = (str: string) => !str || str.trim() === "";
  const isArrayEmpty = (arr: { [key: string]: string }[]) =>
    !arr ||
    arr.length === 0 ||
    arr.every((item) =>
      Object.values(item).every((value) => isStringEmpty(value))
    );

  if (
    isStringEmpty(name) &&
    isStringEmpty(gender) &&
    isStringEmpty(pictureURL) &&
    isArrayEmpty(shortDescriptors) &&
    isArrayEmpty(sections)
  ) {
    return true;
  }

  return false;
}
