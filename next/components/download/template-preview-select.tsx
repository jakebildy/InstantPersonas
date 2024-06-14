"use client";
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { VariantProps } from "class-variance-authority";
import { useToPng } from "@hugocxl/react-to-image";
import { cn, delay } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { DownloadCloudIcon } from "lucide-react";
import { ColorVariant, gradientVariants } from "@/components/variants";
import { StaticImport } from "next/dist/shared/lib/get-img-props";

type DownloadTemplateOptionConfig =
  | DownloadComponentTemplateOption
  | DownloadTextTemplateOption;

type DownloadComponentTemplateOption = {
  type: "component";
  label: string;
  img: {
    src: string | StaticImport;
    width: number;
    height: number;
  };
  width: number;
  height?: number;
  component: React.ReactNode;
};

type DownloadTextTemplateOption = {
  type: "text";
  label: string;
  img: {
    src: string | StaticImport;
    width: number;
    height: number;
  };
  onDownload: () => void;
};

export interface TemplatePreviewSelectProps
  extends VariantProps<typeof gradientVariants>,
    TemplateSelectStateProps {
  isLoading?: boolean;
  downloadTemplateOptions: DownloadTemplateOptionConfig[];
  className?: string;
  header?: string;
  subHeader?: string;
}

export default function TemplatePreviewSelect({
  variant,
  header = "Choose a template to download.",
  subHeader,
  className,
  downloadTemplateOptions,
  onLoadingChange,
  onSuccess,
  onError,
}: TemplatePreviewSelectProps) {
  // State management for template display and download process
  const [
    overlayIsVisible,
    downloadTemplateComponentIsMounted,
    downloadTemplateRef,
    handleDownload,
  ] = useTemplateSelectState({
    onLoadingChange,
    onSuccess,
    onError,
  });

  const [templateWidth, setTemplateWidth] = useState<number>(600);
  const [templateHeight, setTemplateHeight] = useState<number>(1000);
  const [component, setComponent] = useState<React.ReactNode | null>();
  const hasDownloadedSingleTemplate = useRef(false);

  function mapTemplateOptionToDownloadConfig(
    template: DownloadTemplateOptionConfig,
  ): HandleDownloadConfig {
    switch (template.type) {
      case "component":
        return {
          onClick: () => {
            setTemplateWidth(template.width);
            if (template.height) {
              setTemplateHeight(template.height);
            }
            setComponent(template.component);
          },
        };
      case "text":
        return { onDownload: template.onDownload };
    }
  }

  useEffect(() => {
    if (!hasDownloadedSingleTemplate.current) {
      if (downloadTemplateOptions.length === 1 && overlayIsVisible === false) {
        console.log(
          "Downloading single template...",
          downloadTemplateOptions[0],
        );
        const template = downloadTemplateOptions[0];
        const config = mapTemplateOptionToDownloadConfig(template);
        handleDownload(config);
        // Set the flag to true
        hasDownloadedSingleTemplate.current = true;
      }
    }
  }, [downloadTemplateOptions, handleDownload, overlayIsVisible]);

  return (
    <div
      className={cn(
        gradientVariants({
          variant,
          className:
            "scrollbar-hidden h-full w-full overflow-auto rounded-lg p-4",
        }),
        className,
      )}
    >
      <h3 className="text-sm font-semibold text-black/80 empty:hidden">
        {header}
      </h3>
      <p className="text-xs font-medium text-black/75 empty:hidden">
        {subHeader}
      </p>
      <div className="m-4 grid grid-cols-2 gap-2 pt-10">
        {downloadTemplateOptions.map((option, index) => {
          return (
            <div
              key={index}
              className={cn(
                "grid place-items-center",
                // Full width for the last item in the list if odd number of items
                downloadTemplateOptions.length % 2 &&
                  index === downloadTemplateOptions.length - 1
                  ? "col-span-2"
                  : "",
              )}
            >
              <Button
                variant={"outline"}
                className="group h-fit w-fit"
                onClick={() =>
                  handleDownload(mapTemplateOptionToDownloadConfig(option))
                }
              >
                <div className="relative grid place-items-center">
                  <Image
                    src={option.img.src}
                    width={option.img.width}
                    height={option.img.height}
                    alt={option.label + " Download Template"}
                    className="transition-all duration-200 ease-out group-hover:blur-sm"
                  />
                  <span className="absolute left-1/2 top-1/2 z-[60] hidden -translate-x-1/2 -translate-y-1/2 animate-pulse text-xs font-semibold text-black/75 group-hover:block">
                    {option.label}
                  </span>
                </div>
              </Button>
            </div>
          );
        })}
      </div>
      {overlayIsVisible ? <DownloadingOverlay /> : null}
      <div className="absolute">
        <div id="download-template-component-area" ref={downloadTemplateRef}>
          {downloadTemplateComponentIsMounted ? (
            <div
              className={"visible w-[600px] overflow-visible"}
              style={{ width: templateWidth }}
            >
              {component ? component : null}
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}

type TemplateSelectStateProps = {
  onLoadingChange?: (loading: boolean) => void;
  onSuccess?: (data: string) => unknown;
  onError?: (error: string) => unknown;
  fileName?: string;
};

type HandleDownloadConfig = {
  onClick?: () => void;
  onDownload?: () => void;
  fileName?: string;
};

export function useTemplateSelectState({
  onLoadingChange,
  onSuccess,
  onError,
  fileName = "InstantPersonas-template.png",
}: TemplateSelectStateProps) {
  const [
    downloadTemplateComponentIsMounted,
    setDownloadTemplateComponentIsMounted,
  ] = useState<boolean>(false);
  const [overlayIsVisible, setOverlayIsVisible] = useState<boolean>(false);
  // useToPng hook for converting the selected template into a downloadable PNG image
  const [{ isLoading: isDownloading }, convert, downloadTemplateRef] =
    useToPng<HTMLDivElement>({
      onSuccess: async (data) => {
        const link = document.createElement("a");
        link.download = fileName;
        link.href = data;
        link.click();
        setDownloadTemplateComponentIsMounted(false);
        if (onSuccess) {
          onSuccess(data);
        }
      },
      onError: async (error) => {
        console.error(error);
        setDownloadTemplateComponentIsMounted(false);
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

  const handleDownload = async ({
    onClick,
    onDownload,
  }: HandleDownloadConfig) => {
    onClick && onClick();
    // setTemplateWidth(width);
    setOverlayIsVisible(true);
    setDownloadTemplateComponentIsMounted(true);
    await delay(500); // Simulated processing delay to ensure the template is rendered
    console.log("Downloading...");
    if (onDownload) {
      onDownload();
    } else {
      convert();
    }

    await delay(1000); // Simulated download delay
    setDownloadTemplateComponentIsMounted(false);
    setOverlayIsVisible(false);
  };

  return [
    overlayIsVisible,
    downloadTemplateComponentIsMounted,
    downloadTemplateRef,
    handleDownload,
  ] as const;
}

export function DownloadingOverlay({
  variant = "blue",
  placeholder = "Downloading...",
}: {
  variant?: ColorVariant;
  placeholder?: string;
}) {
  return (
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
          {placeholder}
        </p>
      </div>
    </div>
  );
}
