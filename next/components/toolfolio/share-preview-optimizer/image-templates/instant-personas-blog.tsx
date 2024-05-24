"use client";
import {
  ColorVariant,
  ColorVariantMap,
  ColorVariants,
  gradientLightVariants,
  gradientVariants,
  shadowVariants,
  SurveyCardBackGroundElementCircle,
  SurveyCardBackGroundElementRing,
  tabTriggerVariants,
  textColorVariants,
  textPastelColorVariants,
} from "@/components/variants";
import { OGPreviewMetadata } from "../social-share-tool";
import Image from "next/image";
import { useState } from "react";
import { PersonStandingIcon } from "lucide-react";
import { GetDomainFromString } from "../utils";
import { cx } from "class-variance-authority";
import { cn } from "@/lib/utils";

export function InstantPersonasOGBlogImageTemplate({
  variant = "blue",
  url,
  title,
  description,
  image,
}: OGPreviewMetadata & {
  variant?: ColorVariant;
}) {
  const domain = GetDomainFromString(url);

  return (
    <div className="w-[1200px] h-[600px] bg-white grid place-items-center border rounded-lg shadow-md relative p-4 ">
      <div
        className={cx(
          gradientVariants({
            variant,
            className:
              "relative w-full h-full border rounded-lg overflow-hidden ",
          }),
          shadowVariants({
            variant,
          })
        )}
      >
        <Image
          src={image}
          alt={title}
          fill={true}
          className=" object-cover blur-xl opacity-30"
          priority
        />
        <div
          className={textColorVariants({
            variant,
            className:
              "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center p-4 grid place-items-center gap-4",
          })}
        >
          <PersonStandingIcon className="size-14" />
          <div>
            <h1 className="text-3xl font-bold">{title}</h1>
            <p className="text-lg">{description}</p>
            <span
              className={textColorVariants({
                variant,
                className:
                  "inline-flex my-4 items-center justify-center whitespace-nowrap rounded-full px-6 py-1.5 text-sm font-medium bg-white text-foreground shadow-lg",
              })}
            >
              {domain}
            </span>
          </div>
        </div>
        <PersonaIconBackgroundElement variant={variant} />
      </div>
    </div>
  );
}

function PersonaIconBackgroundElement({ variant }: { variant: ColorVariant }) {
  return (
    <>
      <PersonStandingIcon
        className={textPastelColorVariants({
          variant,
          className:
            "size-[250px] transition-colors duration-150 ease-out absolute bottom-0 -right-[30px] z-20 blur-[1px] tilt-backward-right",
        })}
      />
      <PersonStandingIcon
        className={textPastelColorVariants({
          variant,
          className:
            "size-[250px] transition-colors duration-150 ease-out absolute bottom-0 -right-[30px] z-10 blur-sm tilt-backward-right",
        })}
      />
      <PersonStandingIcon
        className={textPastelColorVariants({
          variant,
          className:
            "size-[250px] transition-colors duration-150 ease-out absolute bottom-0 -right-[30px] z-10 blur-md tilt-backward-right",
        })}
      />
      <PersonStandingIcon
        className={textPastelColorVariants({
          variant,
          className:
            "size-[250px] transition-colors duration-150 ease-out absolute bottom-0 -right-[30px] z-10 blur-lg tilt-backward-right",
        })}
      />
    </>
  );
}

export function InstantPersonasOGBlogImageTemplatePreview({
  variant = "blue",
  url,
  title,
  description,
  image,
  size,
}: OGPreviewMetadata & {
  size: "sm" | "md";
  variant?: ColorVariant;
}) {
  const domain = GetDomainFromString(url);

  return (
    <div className="w-full h-full aspect-[2/1] bg-white grid place-items-center border rounded-md shadow-sm relative p-1 ">
      <div
        className={cx(
          gradientVariants({
            variant,
            className:
              "relative w-full h-full border rounded-md overflow-hidden ",
          }),
          shadowVariants({
            variant,
            className: "shadow-sm",
          })
        )}
      >
        <Image
          src={image}
          alt={title}
          fill={true}
          className=" object-cover blur-md opacity-50"
          priority
        />
        <div
          className={textColorVariants({
            variant,
            className:
              "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center p-2 grid place-items-center gap-1 w-full",
          })}
        >
          <PersonStandingIcon className={size === "sm" ? "size-4" : "size-6"} />
          <div>
            <h1
              className={
                size === "sm" ? "text-xs font-semibold" : "text-lg font-bold"
              }
            >
              {title}
            </h1>
            <p className={size === "sm" ? "text-[6px]" : "text-sm"}>
              {description}
            </p>
            <span
              className={textColorVariants({
                variant,
                className: cn(
                  "empty:hidden inline-flex my-2 items-center justify-center whitespace-nowrap rounded-full  font-medium bg-white text-foreground shadow-md",
                  size === "sm" ? "px-4 py-1 text-[6px]" : "px-6 py-1.5 text-sm"
                ),
              })}
            >
              {domain}
            </span>
          </div>
        </div>
        <PersonStandingIcon
          className={textPastelColorVariants({
            variant,
            className: cn(
              "transition-colors duration-150 ease-out absolute bottom-0 right-0 z-20 blur-[1px] tilt-backward-right",
              size === "sm" ? "size-10 " : "size-[180px]"
            ),
          })}
        />
        <PersonStandingIcon
          className={textPastelColorVariants({
            variant,
            className: cn(
              "transition-colors duration-150 ease-out absolute bottom-0 right-0 z-20 blur-sm tilt-backward-right",
              size === "sm" ? "size-10 " : "size-[180px]"
            ),
          })}
        />
        <PersonStandingIcon
          className={textPastelColorVariants({
            variant,
            className: cn(
              "transition-colors duration-150 ease-out absolute bottom-0 right-0 z-20 blur-md tilt-backward-right",
              size === "sm" ? "size-10 " : "size-[180px]"
            ),
          })}
        />
        <PersonStandingIcon
          className={textPastelColorVariants({
            variant,
            className: cn(
              "transition-colors duration-150 ease-out absolute bottom-0 right-0 z-20 blur-lg tilt-backward-right",
              size === "sm" ? "size-10 " : "size-[180px]"
            ),
          })}
        />
      </div>
    </div>
  );
}

import * as InstantPersonasBlogOGImage from "./instant-personas-blog-template-preview.png";
import { StaticImport } from "next/dist/shared/lib/get-img-props";

export const INSTANT_PERSONAS_OG_BLOG_IMAGE_TEMPLATE_CONFIG = {
  title: "Instant Personas Blog",
  description: "OG Image Template for the Instant Personas Blog",
  image: InstantPersonasBlogOGImage as StaticImport,
  imageTemplate: InstantPersonasOGBlogImageTemplate,
  preview: InstantPersonasOGBlogImageTemplatePreview,
} as const;
