import Sidebar from "@/components/Sidebar";
import Chat from "@/components/chat";
import UserPersona from "@/components/persona";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utilities";
import api, { Persona, Message } from "@/services/api.service";
import { RefObject, useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toPng } from "html-to-image";
import download from "downloadjs";
import { generateTimestamp } from "@/lib/utils";
// import { Message } from "ai";

export const PersonaChat = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      sender: "bot",
      text: `Describe your product or service, and I can create a user persona.`,
      _id: "000",
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
  const [loading, setLoading] = useState<boolean>(false);
  const location = useLocation();
  const navigate = useNavigate();

  const pathSegments = location.pathname.split("/");
  // Checks if the path follows the exact structure ["", "persona", id]
  const id: string | undefined =
    pathSegments.length === 3 && pathSegments[1] === "persona"
      ? pathSegments[2]
      : undefined;

  const personaRef = useRef<HTMLDivElement>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    setLoading(true);
    e.preventDefault();
    if (input.trim() === "") return;
    try {
      const data = await api.userPersona.messagePersona(input, id);
      setMessages(data.messageHistory);
      setPersona(data.persona);
      setSuggestions(data.aiSuggestedChats ?? []);
      setInput("");
      if (!id) {
        navigate("/persona/" + data._id);
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
      setPersona(persona.persona);
    };
    fetchData();
  }, []);

  const renderPersona = !personaHasNoValues(persona);

  const downloadImage = (elementRef: RefObject<HTMLElement>) => {
    const element = elementRef.current;
    if (!element) return console.error("😭 No element to print");
    const timeStamp = generateTimestamp();
    toPng(element).then(function (dataUrl: any) {
      download(dataUrl, "Persona-" + timeStamp + ".png");
    });
  };

  return (
    <Sidebar currentSelectedPage="Persona Creator">
      <ScrollArea className="h-screen">
        <div className="flex flex-col">
          {renderPersona ? (
            <div className="flex-1 flex flex-col">
              <div ref={personaRef}>
                <UserPersona {...persona} />
              </div>
              <div className="flex gap-4 lg:gap-8 my-4 overflow-hidden flex-wrap justify-center">
                <Button>{"Change Colour"}</Button>
                <Button>{"Change Picture"}</Button>
                <Button onClick={() => downloadImage(personaRef)}>
                  {"Download Image"}
                </Button>
              </div>
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
            loading={loading}
            setLoading={(b) => setLoading(b)}
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
