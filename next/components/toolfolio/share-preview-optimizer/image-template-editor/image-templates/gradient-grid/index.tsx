"use client";
import {
  Border600,
  ColorVariant,
  gradientGridTextVariants,
  gradientGridTitleTextVariants,
  gradientLightVariants,
  gradientVariants,
  shadowVariants,
  textColorVariants,
  textPastelColorVariants,
} from "@/components/variants";
import Image from "next/image";
import { PersonStandingIcon } from "lucide-react";
import { GetDomainFromString } from "../../../utils";
import { cx } from "class-variance-authority";
import { capitalizeFirstLetter, cn } from "@/lib/utils";
import RadialGradient from "@/components/ui/magicui/radial-gradient";
import RetroGrid from "@/components/ui/magicui/retro-grid";
import {
  OpenGraphImageTemplatePreviewProps,
  OpenGraphImageTemplateProps,
} from "..";

export function GradientGridTemplate({
  variant = "blue",
  url,
  title,
  description,
  image,
}: OpenGraphImageTemplateProps) {
  const domain = GetDomainFromString(url);
  const siteName = capitalizeFirstLetter(domain.split(".")[0]);

  return (
    <div
      className={gradientLightVariants({
        variant,
        className:
          "relative flex h-[600px] w-[1200px] items-center justify-center overflow-hidden rounded-lg border bg-background p-4 md:shadow-xl",
      })}
    >
      <div
        className={cx(
          gradientVariants({
            variant,
            className:
              "relative grid h-full w-full place-items-center overflow-hidden rounded-lg border",
          }),
          shadowVariants({
            variant,
          }),
          Border600({
            variant,
          }),
        )}
      >
        <RadialGradient size={600} />
        <div className="flex flex-col items-center gap-2">
          <div className="flex w-fit items-center gap-4">
            {image ? (
              <div className="relative z-10 size-[60px] overflow-hidden rounded-lg">
                <Image
                  src={image}
                  alt={title}
                  fill={true}
                  className="object-fill"
                  priority
                />
              </div>
            ) : null}
            <span
              className={gradientGridTextVariants({
                variant,
                className:
                  "pointer-events-none z-10 whitespace-pre-wrap bg-gradient-to-tl text-5xl",
              })}
            >
              {siteName}
            </span>
          </div>
          <span
            className={gradientGridTitleTextVariants({
              variant,
              className: "pointer-events-none z-10 whitespace-pre-wrap",
            })}
          >
            {title}
          </span>
          <span
            className={gradientGridTextVariants({
              variant,
              className: "pointer-events-none z-10 whitespace-pre-wrap",
            })}
          >
            {description}
          </span>
        </div>
      </div>
      <RetroGrid />
      <div className="absolute top-0 h-3/4 w-full bg-gradient-to-b from-white to-transparent" />
    </div>
  );
}

export function GradientGridTemplatePreview({
  variant = "blue",
  url,
  title,
  description,
  image,
  size,
}: OpenGraphImageTemplatePreviewProps) {
  const domain = GetDomainFromString(url);
  const siteName = capitalizeFirstLetter(domain.split(".")[0]);

  const isSmall = size === "sm";

  return (
    <div
      className={gradientLightVariants({
        variant,
        className:
          "relative flex aspect-[2/1] h-full w-full items-center justify-center overflow-hidden rounded-md border bg-background p-1",
      })}
    >
      <div
        className={cx(
          gradientVariants({
            variant,
            className:
              "relative grid h-full w-full place-items-center overflow-hidden rounded-md border",
          }),
          shadowVariants({
            variant,
          }),
          Border600({
            variant,
          }),
        )}
      >
        <RadialGradient size={isSmall ? 100 : 150} />
        <div
          className={cn(
            "flex flex-col items-center",
            isSmall ? "gap-0.5" : "gap-2",
          )}
        >
          <div
            className={cn(
              "flex w-fit items-center",
              isSmall ? "gap-1" : "gap-3",
            )}
          >
            {image ? (
              <div
                className={cn(
                  "relative z-10 overflow-hidden rounded-lg",
                  isSmall ? "size-[15px]" : "size-[40px]",
                )}
              >
                <Image
                  src={image}
                  alt={title}
                  fill={true}
                  className="object-fill"
                  priority
                />
              </div>
            ) : null}
            <span
              className={gradientGridTextVariants({
                variant,
                className: cn(
                  "pointer-events-none z-10 whitespace-pre-wrap bg-gradient-to-tl font-semibold",
                  isSmall ? "text-[10px] leading-[12px]" : "text-3xl",
                ),
              })}
            >
              {siteName}
            </span>
          </div>
          <span
            className={cn(
              gradientGridTitleTextVariants({
                variant,
                className: cn("pointer-events-none z-10 whitespace-pre-wrap"),
              }),
              isSmall ? "text-sm" : "text-4xl",
            )}
          >
            {title}
          </span>
          <span
            className={cn(
              gradientGridTextVariants({
                variant,
                className: "pointer-events-none z-10 whitespace-pre-wrap",
              }),
              isSmall ? "text-[8px]" : "text-2xl",
            )}
          >
            {description}
          </span>
        </div>
      </div>
      <RetroGrid />
      <div className="absolute top-0 h-3/4 w-full bg-gradient-to-b from-white to-transparent" />
    </div>
  );
}

import * as ImagePreview from "./template-preview.png";
import { StaticImport } from "next/dist/shared/lib/get-img-props";

export const GRADIENT_GRID_IMAGE_TEMPLATE_CONFIG = {
  title: "Gradient Grid Template",
  description:
    "Basic Gradient Grid Template *animation not included in export*",
  image: ImagePreview as StaticImport,
  imageTemplate: GradientGridTemplate,
  preview: GradientGridTemplatePreview,
} as const;
