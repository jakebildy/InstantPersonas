"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { PersonaArchetype } from "..";
import { VariantProps } from "class-variance-authority";
import { PersonaTemplate } from "./template";
import { useToPng } from "@hugocxl/react-to-image";
import { delay } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { DownloadCloudIcon } from "lucide-react";
import * as PersonaTemplate2x3 from "./persona-template-600w.jpeg";
import * as PersonaTemplate4x3 from "./persona-template-900w.jpeg";
import { gradientVariants } from "../../../variants";

export interface TemplatePreviewSelectProps
  extends VariantProps<typeof gradientVariants> {
  archetype: PersonaArchetype;
  isLoading?: boolean;
  onLoadingChange?: (loading: boolean) => void;
  onSuccess?: (data: string) => unknown;
  onError?: (error: string) => unknown;
}

export default function TemplatePreviewSelect({
  variant,
  isLoading,
  onLoadingChange,
  archetype,
  onSuccess,
  onError,
}: TemplatePreviewSelectProps) {
  // Template ID generation based on archetype for reference and download
  const templateID = [
    archetype.archetype_name.toLocaleLowerCase(),
    "persona template",
  ]
    .join("-")
    .replace(/ /g, "-");

  // State management for template display and download process
  const [showTemplate, setShowTemplate] = useState<boolean>(false);
  const [showScreen, setShowScreen] = useState<boolean>(false);
  const [templateWidth, setTemplateWidth] = useState<number>(600);

  // useToPng hook for converting the selected template into a downloadable PNG image
  const [{ isLoading: isDownloading }, convert, templateRef] =
    useToPng<HTMLDivElement>({
      onSuccess: async (data) => {
        const link = document.createElement("a");
        link.download = "persona-template.jpeg";
        link.href = data;
        link.click();
        setShowTemplate(false);
        if (onSuccess) {
          onSuccess(data);
        }
      },
      onError: async (error) => {
        console.error(error);
        setShowTemplate(false);
        if (onError) {
          onError(error);
        }
      },
    });

  // Effect hook to notify parent components about the downloading state
  useEffect(() => {
    if (onLoadingChange) {
      onLoadingChange(isDownloading);
    }
  }, [isDownloading, onLoadingChange]);

  /**
   * Initiates the template download process, demonstrating the system's interface for
   * user interaction and extension/adaptation of functionality.
   *
   * @param {{ width: number }} { width } - The width of the template to be downloaded.
   */
  const handleConvert = async ({ width }: { width: number }) => {
    setTemplateWidth(width);
    setShowScreen(true);
    setShowTemplate(true);
    await delay(500); // Simulated processing delay
    console.log("Downloading...");
    convert();
    await delay(1000); // Simulated download delay
    setShowScreen(false);
  };
  return (
    <div
      className={gradientVariants({
        variant,
        className: "p-4 overflow-auto rounded-lg m-2 ",
      })}
    >
      <h3 className="text-black/80 font-semibold text-sm">
        Choose a template to download for the persona archetype.
      </h3>
      <p className="font-medium text-xs text-black/75">
        Colour and Information will match the current persona
      </p>
      <div className="grid grid-cols-2 gap-2  m-4">
        <Button
          variant={"outline"}
          className="h-fit w-full group"
          onClick={() => handleConvert({ width: 600 })}
        >
          <div className="relative grid place-items-center">
            <Image
              src={PersonaTemplate2x3}
              width={200}
              height={300}
              alt="2/3 Persona Template"
              placeholder="blur"
            />
            <span className="animate-pulse hidden group-hover:block font-semibold text-xs text-black/75 z-[60] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
              2/3
            </span>
          </div>
        </Button>
        <Button
          variant={"outline"}
          className="h-fit w-full group"
          onClick={() => handleConvert({ width: 900 })}
        >
          <div className="relative grid place-items-center">
            <Image
              src={PersonaTemplate4x3}
              width={200}
              height={300}
              alt="4/3 Persona Template"
              placeholder="blur"
            />
            <span className="animate-pulse hidden group-hover:block font-semibold text-xs text-black/75 z-[60] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
              4/3
            </span>
          </div>
        </Button>
      </div>
      {showScreen ? (
        <div
          className={gradientVariants({
            variant,
            className:
              "z-[100] top-0 left-0 to-white absolute w-full h-full grid place-items-center",
          })}
        >
          <div className="grid place-items-center gap-4">
            <DownloadCloudIcon className="animate-pulse text-muted-foreground" />
            <p className="animate-pulse text-muted-foreground text-xs">
              Downloading Template...
            </p>
          </div>
        </div>
      ) : null}
      <div id={templateID} ref={templateRef}>
        {showTemplate ? (
          <div className={"w-[600px] visible"} style={{ width: templateWidth }}>
            <PersonaTemplate archetype={archetype} variant={variant} />
          </div>
        ) : null}
      </div>
    </div>
  );
}
