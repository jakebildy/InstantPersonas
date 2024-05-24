"use client";
import React, { useEffect, useState } from "react";
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

  function mapTemplateOptionToDownloadConfig(
    template: DownloadTemplateOptionConfig
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
    if (downloadTemplateOptions.length === 1) {
      handleDownload(
        mapTemplateOptionToDownloadConfig(downloadTemplateOptions[0])
      );
    }
  }, [downloadTemplateOptions, handleDownload]);

  return (
    <div
      className={cn(
        gradientVariants({
          variant,
          className:
            "p-4 overflow-auto rounded-lg h-full w-full scrollbar-hidden",
        }),
        className
      )}
    >
      <h3 className="text-black/80 font-semibold text-sm empty:hidden">
        {header}
      </h3>
      <p className="font-medium text-xs text-black/75 empty:hidden">
        {subHeader}
      </p>
      <div className="grid grid-cols-2 gap-2  m-4 pt-10">
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
                  : ""
              )}
            >
              <Button
                variant={"outline"}
                className="h-fit w-fit group "
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
                    className="group-hover:blur-sm transition-all duration-200 ease-out"
                  />
                  <span className="animate-pulse hidden group-hover:block font-semibold text-xs text-black/75 z-[60] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
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
              className={"w-[600px] visible overflow-visible "}
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
};

type HandleDownloadConfig = {
  onClick?: () => void;
  onDownload?: () => void;
  fileName?: string;
};

function useTemplateSelectState({
  onLoadingChange,
  onSuccess,
  onError,
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
        link.download = "InstantPersonas-template.jpeg";
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

function DownloadingOverlay({
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
          "z-[100] top-0 left-0 to-white absolute w-full h-full grid place-items-center",
      })}
    >
      <div className="grid place-items-center gap-4">
        <DownloadCloudIcon className="animate-pulse text-muted-foreground" />
        <p className="animate-pulse text-muted-foreground text-xs">
          {placeholder}
        </p>
      </div>
    </div>
  );
}
