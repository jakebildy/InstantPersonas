"use client";
import {
  ColorVariant,
  gradientVariants,
  shadowVariants,
  textColorVariants,
  textPastelColorVariants,
} from "@/components/variants";
import Image from "next/image";
import { PersonStandingIcon } from "lucide-react";
import { GetDomainFromString } from "../../../utils";
import { cx } from "class-variance-authority";
import { cn } from "@/lib/utils";

export function InstantPersonasBasicTemplate({
  variant = "blue",
  url,
  title,
  description,
  image,
}: OpenGraphImageTemplateProps) {
  const domain = GetDomainFromString(url);

  return (
    <div className="relative grid h-[600px] w-[1200px] place-items-center rounded-lg border bg-white p-4 shadow-md">
      <div
        className={cx(
          gradientVariants({
            variant,
            className:
              "relative h-full w-full overflow-hidden rounded-lg border",
          }),
          shadowVariants({
            variant,
          }),
        )}
      >
        <Image
          src={image}
          alt={title}
          fill={true}
          className="object-cover opacity-30 blur-xl"
          priority
        />
        <div
          className={textColorVariants({
            variant,
            className:
              "absolute left-1/2 top-1/2 grid w-full -translate-x-1/2 -translate-y-1/2 place-items-center gap-4 p-4 text-center",
          })}
        >
          <PersonStandingIcon className="size-14" />
          <div>
            <h1 className="text-4xl font-bold">{title}</h1>
            <p className="text-2xl">{description}</p>
            <span
              className={textColorVariants({
                variant,
                className:
                  "my-4 inline-flex items-center justify-center whitespace-nowrap rounded-full bg-white px-6 py-1.5 text-2xl font-medium text-foreground shadow-lg",
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
            "tilt-backward-right absolute -right-[30px] bottom-0 z-20 size-[250px] blur-[1px] transition-colors duration-150 ease-out",
        })}
      />
      <PersonStandingIcon
        className={textPastelColorVariants({
          variant,
          className:
            "tilt-backward-right absolute -right-[30px] bottom-0 z-10 size-[250px] blur-sm transition-colors duration-150 ease-out",
        })}
      />
      <PersonStandingIcon
        className={textPastelColorVariants({
          variant,
          className:
            "tilt-backward-right absolute -right-[30px] bottom-0 z-10 size-[250px] blur-md transition-colors duration-150 ease-out",
        })}
      />
      <PersonStandingIcon
        className={textPastelColorVariants({
          variant,
          className:
            "tilt-backward-right absolute -right-[30px] bottom-0 z-10 size-[250px] blur-lg transition-colors duration-150 ease-out",
        })}
      />
    </>
  );
}

export function InstantPersonasBasicTemplatePreview({
  variant = "blue",
  url,
  title,
  description,
  image,
  size,
}: OpenGraphImageTemplatePreviewProps) {
  const domain = GetDomainFromString(url);

  return (
    <div className="relative grid aspect-[2/1] h-full w-full place-items-center rounded-md border bg-white p-1 shadow-sm">
      <div
        className={cx(
          gradientVariants({
            variant,
            className:
              "relative h-full w-full overflow-hidden rounded-md border",
          }),
          shadowVariants({
            variant,
            className: "shadow-sm",
          }),
        )}
      >
        <Image
          src={image}
          alt={title}
          fill={true}
          className="object-cover opacity-50 blur-md"
          priority
        />
        <div
          className={textColorVariants({
            variant,
            className:
              "absolute left-1/2 top-1/2 grid w-full -translate-x-1/2 -translate-y-1/2 place-items-center gap-1 p-2 text-center",
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
                  "my-2 inline-flex items-center justify-center whitespace-nowrap rounded-full bg-white font-medium text-foreground shadow-md empty:hidden",
                  size === "sm"
                    ? "px-4 py-1 text-[6px]"
                    : "px-6 py-1.5 text-sm",
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
              "tilt-backward-right absolute bottom-0 right-0 z-20 blur-[1px] transition-colors duration-150 ease-out",
              size === "sm" ? "size-10" : "size-[180px]",
            ),
          })}
        />
        <PersonStandingIcon
          className={textPastelColorVariants({
            variant,
            className: cn(
              "tilt-backward-right absolute bottom-0 right-0 z-20 blur-sm transition-colors duration-150 ease-out",
              size === "sm" ? "size-10" : "size-[180px]",
            ),
          })}
        />
        <PersonStandingIcon
          className={textPastelColorVariants({
            variant,
            className: cn(
              "tilt-backward-right absolute bottom-0 right-0 z-20 blur-md transition-colors duration-150 ease-out",
              size === "sm" ? "size-10" : "size-[180px]",
            ),
          })}
        />
        <PersonStandingIcon
          className={textPastelColorVariants({
            variant,
            className: cn(
              "tilt-backward-right absolute bottom-0 right-0 z-20 blur-lg transition-colors duration-150 ease-out",
              size === "sm" ? "size-10" : "size-[180px]",
            ),
          })}
        />
      </div>
    </div>
  );
}

import * as ImagePreview from "./template-preview.png";
import { StaticImport } from "next/dist/shared/lib/get-img-props";
import {
  OpenGraphImageTemplatePreviewProps,
  OpenGraphImageTemplateProps,
} from "..";

export const INSTANT_PERSONAS_BASIC_IMAGE_TEMPLATE_CONFIG = {
  title: "Instant Personas Basic",
  description: "Our Standard Image Template for Instant Personas",
  image: ImagePreview as StaticImport,
  imageTemplate: InstantPersonasBasicTemplate,
  preview: InstantPersonasBasicTemplatePreview,
} as const;
