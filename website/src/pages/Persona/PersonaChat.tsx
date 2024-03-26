import Sidebar from "@/components/Sidebar";
import Chat from "@/components/chat";
import UserPersona from "@/components/persona";
import download from "downloadjs";
import useGetPersonaPathId from "./useGetPersonaPathId";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utilities";
import { Persona } from "@/services/api.service";
import { usePersonaChat } from "./usePersonaChat";
import { RefObject, useRef, useState } from "react";
import { generateTimestamp } from "@/lib/utils";
import { toPng } from "html-to-image";
import { Dialog } from "@/components/ui/dialog";
import { SubscriptionTrialDialog } from "./SubscriptionTrialDialog";
import { useUser } from "@/contexts/UserContext";
import { motion } from "framer-motion";
import { TypewriterEffectSmooth } from "@/components/ui/typewriter_effect";
import createFirstBusiness from "../../images/history.gif";
import { HexColorPicker } from "react-colorful";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export const PersonaChat = () => {
  const { id } = useGetPersonaPathId();
  const {
    persona,
    messages,
    suggestions,
    selectedColor,
    input,
    loading,
    currentID,
    handleSubmit,
    setInput,
    setLoading,
    setPersona,
    setSelectedColor,
    updatePicture,
  } = usePersonaChat(id);
  const personaRef = useRef<HTMLDivElement>(null);
  const [showPicker, setShowPicker] = useState<boolean>(false);
  const [showSubscriptionPromptDialog, setShowSubscriptionPromptDialog] =
    useState<boolean>(false);
  const renderPersona = id
    ? id == currentID || !personaHasNoValues(persona)
    : false;

  const downloadImage = (elementRef: RefObject<HTMLElement>) => {
    const element = elementRef.current;
    if (!element) return console.error("😭 No element to print");
    const timeStamp = generateTimestamp();
    toPng(element, { cacheBust: true }).then(function (dataUrl: any) {
      download(dataUrl, "Persona-" + timeStamp + ".png");
    });
  };

  //@ts-ignore
  const { subscriptionActive } = useUser();

  const handleCheckSubscriptionSubmit = (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    if (!subscriptionActive && window.location.hostname !== "localhost") {
      setShowSubscriptionPromptDialog(true);
    } else {
      handleSubmit(e);
    }
  };

  const words = [
    {
      text: "Create",
    },
    {
      text: "a",
    },
    { text: "new" },
    {
      text: "User Persona 👋",
      className: "text-green-500 dark:text-blue-500",
    },
  ];

  return (
    <Sidebar currentSelectedPage="Persona Creator">
      <Dialog
        open={showSubscriptionPromptDialog}
        onOpenChange={setShowSubscriptionPromptDialog}
      >
        <div className="flex flex-col relative">
          {loading && !renderPersona ? (
            <div className="h-[40rem] w-full bg-slate-50 flex flex-col items-center justify-center overflow-hidden rounded-md">
              <motion.img
                // bounce in
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
                src={createFirstBusiness}
                style={{ height: "300px" }}
                className="mx-auto"
              />
            </div>
          ) : renderPersona ? (
            <div className="flex-1 grid grid-cols-6 place-items-center min-h-[70dvh] pb-20">
              <div ref={personaRef} className="col-span-5 m-2">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  transition={{
                    type: "spring",
                    stiffness: 260,
                    damping: 20,
                  }}
                >
                  <UserPersona {...{ setPersona, id, ...persona }} />
                </motion.div>
              </div>
              <div className="max-sm:fixed max-sm:right-0 max-sm:top-0 max-sm:translate-y-1/2 flex flex-col overflow-hidden flex-wrap justify-center gap-2 p-4 ">
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      onClick={() => setShowPicker(!showPicker)}
                      className="rounded-md"
                    >
                      {"Change Colour"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-full">
                    <HexColorPicker
                      color={selectedColor}
                      onChange={setSelectedColor}
                    />
                  </PopoverContent>
                </Popover>

                <Button
                  onClick={() => {
                    const newPicture = `https://instantpersonas.com/profiles/${persona.gender.toLowerCase()}/${Math.ceil(
                      Math.random() * 78
                    )}.jpg`;

                    updatePicture(newPicture);
                    setPersona({
                      ...persona,
                      pictureURL: newPicture,
                    });
                  }}
                  className="rounded-md"
                >
                  {"Change Picture"}
                </Button>
                <Button
                  onClick={() => downloadImage(personaRef)}
                  className="rounded-md"
                >
                  {"Download Image"}
                </Button>
              </div>
            </div>
          ) : (
            <div className="h-[40rem] w-full bg-slate-50 flex flex-col items-center justify-center overflow-hidden rounded-md">
              <TypewriterEffectSmooth words={words} />
            </div>
          )}
          <div
            className={cn(
              "flex-1 sm:hidden",
              renderPersona ? "min-h-[35dvh]" : ""
            )}
            id="scroll-spacer"
          />
          {/* 288px is w-72 the sidebar lg width */}
          <div className="fixed bottom-0 w-full lg:w-[calc(100%-288px)]">
            {/* 18px is padding + margin of the chat component */}
            {/* 78px: 18px + 60px is the height of margin + mobile header */}
            <Chat
              className={"border rounded-lg bg-white shadow-xl"}
              messages={messages}
              handleSubmit={handleCheckSubscriptionSubmit}
              handleInputChange={(e) => {
                if (e.target.value.length < 2000) {
                  setInput(e.target.value);
                }
              }}
              input={input}
              loading={loading}
              setLoading={(b) => setLoading(b)}
            >
              <div className="flex flex-col flex-wrap z-50">
                <div className="flex gap-4 overflow-hidden flex-wrap ">
                  {loading ? (
                    <div />
                  ) : (
                    suggestions.map((suggestion, i) => (
                      <Button
                        key={i}
                        variant={"secondary"}
                        className="text-white bg-gray-400 rounded-lg text-xs hover:bg-green-400"
                        type="submit"
                        onClick={() => setInput(suggestion)}
                      >
                        {suggestion}
                      </Button>
                    ))
                  )}
                </div>
              </div>
            </Chat>
          </div>
        </div>
        <SubscriptionTrialDialog
          onCloseAutoFocus={() => personaRef.current?.focus()}
        />
      </Dialog>
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
