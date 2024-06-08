"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { VariantProps } from "class-variance-authority";
import { PersonaTemplate } from "./template";
import { useToPng } from "@hugocxl/react-to-image";
import { delay } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { DownloadCloudIcon } from "lucide-react";
import * as PersonaTemplate2x3 from "./persona-template-600w.jpeg";
import * as PersonaTemplate4x3 from "./persona-template-900w.jpeg";
import { gradientVariants } from "@/components/variants";
import { PersonaArchetype } from "@/app/(server)/models/persona-ai.model";

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
        className: "m-2 overflow-auto rounded-lg p-4",
      })}
    >
      <h3 className="text-sm font-semibold text-black/80">
        Choose a template to download for the persona archetype.
      </h3>
      <p className="text-xs font-medium text-black/75">
        Colour and Information will match the current persona
      </p>
      <div className="m-4 grid grid-cols-2 gap-2">
        <Button
          variant={"outline"}
          className="group h-fit w-full"
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
            <span className="absolute left-1/2 top-1/2 z-[60] hidden -translate-x-1/2 -translate-y-1/2 animate-pulse text-xs font-semibold text-black/75 group-hover:block">
              2/3
            </span>
          </div>
        </Button>
        <Button
          variant={"outline"}
          className="group h-fit w-full"
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
            <span className="absolute left-1/2 top-1/2 z-[60] hidden -translate-x-1/2 -translate-y-1/2 animate-pulse text-xs font-semibold text-black/75 group-hover:block">
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
              "absolute left-0 top-0 z-[100] grid h-full w-full place-items-center to-white",
          })}
        >
          <div className="grid place-items-center gap-4">
            <DownloadCloudIcon className="animate-pulse text-muted-foreground" />
            <p className="animate-pulse text-xs text-muted-foreground">
              Downloading Template...
            </p>
          </div>
        </div>
      ) : null}
      <div id={templateID} ref={templateRef}>
        {showTemplate ? (
          <div className={"visible w-[600px]"} style={{ width: templateWidth }}>
            <PersonaTemplate archetype={archetype} variant={variant} />
          </div>
        ) : null}
      </div>
    </div>
  );
}
