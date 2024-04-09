"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  avatarVariants,
  downloadButtonVariants,
  gradientVariants,
  PersonaAvatarPopoverProps,
} from "..";
import { Button } from "@/components/ui/button";
import { DownloadCloudIcon, LoaderIcon } from "lucide-react";
import { PersonaTemplate } from "../template";
import { useToPng } from "@hugocxl/react-to-image";
import { delay } from "@/lib/utils";
import { useState } from "react";

export function PersonaTab({ variant, archetype }: PersonaAvatarPopoverProps) {
  const { archetype_name, persona_components, insights } = archetype;
  const avatarFallbackName = archetype_name
    .split(" ")
    .map((word) => word.charAt(0))
    .join("");
  const templateID = [archetype_name.toLocaleLowerCase(), "persona template"]
    .join("-")
    .replace(/ /g, "-");

  const [showTemplate, setShowTemplate] = useState(false);

  const [{ isLoading }, convert, templateRef] = useToPng<HTMLDivElement>({
    onSuccess: async (data) => {
      const link = document.createElement("a");
      link.download = "persona-template.jpeg";
      link.href = data;
      link.click();
      setShowTemplate(false);
    },
    onError: async (error) => {
      console.error(error);
      setShowTemplate(false);
    },
  });

  const handleConvert = async () => {
    setShowTemplate(true);
    await delay(50);
    console.log("Downloading...");
    convert();
  };

  return (
    <div>
      <div className="flex gap-2 border-b">
        <Avatar
          className={avatarVariants({
            variant,
            size: "xl",
            interactive: false,
          })}
        >
          <AvatarImage
            src="/test-persona-avatar.jpg"
            alt={[archetype_name.toLocaleLowerCase(), "persona avatar"].join(
              " "
            )}
          />
          <AvatarFallback>{avatarFallbackName}</AvatarFallback>
        </Avatar>

        <div className="flex flex-col my-6 gap-2">
          <div className="flex flex-col">
            <span className="text-muted-foreground font-semibold text-sm">
              Archetype
            </span>
            <span className="font-bold">{archetype_name}</span>
          </div>
          <Button
            size="icon"
            variant={"secondary"}
            className={downloadButtonVariants({
              variant,
              className: "flex gap-2 px-2 pr-3 items-center",
            })}
            onClick={handleConvert}
          >
            {isLoading ? (
              <>
                <LoaderIcon className="h-4 w-4 animate-spin" />{" "}
                <span>Downloading...</span>
              </>
            ) : (
              <>
                <DownloadCloudIcon className="h-4 w-4" /> <span>Download</span>
              </>
            )}
          </Button>
        </div>
      </div>

      <div
        className={gradientVariants({
          variant,
          className: "flex gap-2 p-4 overflow-auto rounded-lg m-2",
        })}
      >
        <ul>
          {Object.entries(persona_components).map(([key, value]) => (
            <li key={key} className="flex flex-col gap-1 mb-4">
              <span className="text-muted-foreground font-semibold text-sm">
                {key.replace(/_/g, " ")}
              </span>
              <span className="text-sm font-medium">{value}</span>
            </li>
          ))}
        </ul>
      </div>
      <div id={templateID} ref={templateRef}>
        {showTemplate ? (
          <div className={"w-[600px] visible"}>
            <PersonaTemplate archetype={archetype} variant={variant} />
          </div>
        ) : null}
      </div>
    </div>
  );
}
