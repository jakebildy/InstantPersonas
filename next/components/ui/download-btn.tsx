"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { cva, VariantProps } from "class-variance-authority";
import {
  LoaderIcon,
  MousePointerSquareDashedIcon,
  DownloadCloudIcon,
  BanIcon,
} from "lucide-react";

export const downloadButtonVariants = cva(
  "p-1 hover:bg-slate-200 h-fit w-fit rounded-full text-black/50 hover:text-black/75 flex gap-2 px-2 pr-3 items-center",
  {
    variants: {
      variant: {
        blue: "hover:bg-pastel-blue/50 bg-pastel-blue/25",
        purple: "hover:bg-pastel-purple/50 bg-pastel-purple/25",
        red: "hover:bg-pastel-red/50 bg-pastel-red/25",
        yellow: "hover:bg-pastel-yellow/50 bg-pastel-yellow/25",
        green: "hover:bg-pastel-green/50 bg-pastel-green/25",
        brown: "hover:bg-pastel-brown/50 bg-pastel-brown/25",
        pink: "hover:bg-pastel-pink/50 bg-pastel-pink/25",
      },
    },
    defaultVariants: {
      variant: "blue",
    },
  }
);

export interface DownloadButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof downloadButtonVariants> {
  loading?: boolean;
  selectingTemplate?: boolean;
  onCancel?: () => void;
  placeholders?: {
    selecting?: string;
    downloading?: string;
    default?: string;
    stop?: string;
  };
}

export function DownloadButton({
  variant,
  placeholders,
  loading,
  selectingTemplate,
  onCancel,
  onClick,
  onMouseEnter,
  onMouseLeave,
  className,
  ...Props
}: DownloadButtonProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Button
      size="icon"
      variant={"secondary"}
      className={downloadButtonVariants({
        variant,
        className,
      })}
      onMouseEnter={(
        event: React.MouseEvent<HTMLButtonElement, MouseEvent>
      ) => {
        setIsHovered(true);
        if (onMouseEnter) onMouseEnter(event);
      }}
      onMouseLeave={(
        event: React.MouseEvent<HTMLButtonElement, MouseEvent>
      ) => {
        setIsHovered(false);
        if (onMouseLeave) onMouseLeave(event);
      }}
      onClick={(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        if (selectingTemplate && onCancel) {
          onCancel();
        } else if (onClick) {
          onClick(event);
        }
      }}
      {...Props}
    >
      {selectingTemplate ? (
        isHovered ? (
          <>
            <BanIcon className="h-4 w-4 animate-pulse text-red-500" />{" "}
            <span className="animate-pulse text-red-500">
              {placeholders?.stop ?? "Stop Download"}
            </span>
          </>
        ) : loading ? (
          <>
            <LoaderIcon className="h-4 w-4 animate-spin" />{" "}
            <span>{placeholders?.downloading ?? "Downloading..."}</span>
          </>
        ) : (
          <>
            <MousePointerSquareDashedIcon className="h-4 w-4 animate-pulse" />{" "}
            <span>{placeholders?.selecting ?? "Selecting a Template..."}</span>
          </>
        )
      ) : (
        <>
          <DownloadCloudIcon className="h-4 w-4" />{" "}
          <span>{placeholders?.default ?? "Download"}</span>
        </>
      )}
    </Button>
  );
}
