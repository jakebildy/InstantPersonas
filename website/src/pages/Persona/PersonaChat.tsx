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
import { ColorResult, CompactPicker } from "react-color";
import { generateTimestamp } from "@/lib/utils";
import { toPng } from "html-to-image";
import { Dialog } from "@/components/ui/dialog";
import { SubscriptionTrialDialog } from "./SubscriptionTrialDialog";
import { useUser } from "@/contexts/UserContext";

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
    updateColor,
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
    // if (!subscriptionActive) {
    //   setShowSubscriptionPromptDialog(true);
    // } else {
    handleSubmit(e);
    // }
  };

  return (
    <Sidebar currentSelectedPage="Persona Creator">
      <Dialog
        open={showSubscriptionPromptDialog}
        onOpenChange={setShowSubscriptionPromptDialog}
      >
        <div className="flex flex-col relative">
          {renderPersona ? (
            <div className="flex-1 flex flex-col">
              <div ref={personaRef}>
                <UserPersona
                  {...{ selectedColor, setPersona, id, ...persona }}
                />
              </div>
              <div className="flex gap-4 lg:gap-8 my-4 overflow-hidden flex-wrap justify-center">
                <Button onClick={() => setShowPicker(!showPicker)}>
                  {"Change Colour"}
                </Button>
                {showPicker && (
                  <div style={{ position: "relative" }}>
                    <CompactPicker
                      color={selectedColor}
                      onChangeComplete={(color: ColorResult) => {
                        setSelectedColor(color.hex);
                        setShowPicker(false);
                        updateColor(color.hex);
                      }}
                    />
                  </div>
                )}
                <Button
                  onClick={() => {
                    const newPicture = `https://instantpersonas.com/public/assets/profiles/${persona.gender.toLowerCase()}/${Math.ceil(
                      Math.random() * 78
                    )}.jpg`;

                    updatePicture(newPicture);
                    setPersona({
                      ...persona,
                      pictureURL: newPicture,
                    });
                  }}
                >
                  {"Change Picture"}
                </Button>
                <Button onClick={() => downloadImage(personaRef)}>
                  {"Download Image"}
                </Button>
              </div>
            </div>
          ) : null}
          <div
            className={cn(
              "flex-1",
              renderPersona ? "min-h-[35dvh] lg:min-h-[10dvh]" : ""
            )}
            id="scroll-spacer"
          />
          {/* 288px is w-72 the sidebar lg width */}
          <div className="fixed bottom-0 w-full lg:w-[calc(100%-288px)]">
            {/* 18px is padding + margin of the chat component */}
            {/* 78px: 18px + 60px is the height of margin + mobile header */}
            <Chat
              className={cn(
                "border rounded-lg bg-white shadow-xl",
                renderPersona
                  ? "min-h-[400px] max-h-[33dvh]"
                  : "min-h-[calc(100dvh-78px)] lg:min-h-[calc(100vh-18px)]"
              )}
              messages={messages}
              handleSubmit={handleCheckSubscriptionSubmit}
              handleInputChange={(e) => setInput(e.target.value)}
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
