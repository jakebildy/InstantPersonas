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

export function InstantPersonasOGBlogImageTemplate({
  url,
  title,
  description,
  image,
}: OGPreviewMetadata) {
  const [variantIndex, setVariantIndex] = useState<number>(0);
  const variant = ColorVariants[
    variantIndex % ColorVariants.length
  ] as ColorVariant;

  const domain = GetDomainFromString(url);

  return (
    <div
      onClick={() => setVariantIndex((prev) => prev + 1)}
      className="w-[1200px] h-[600px] bg-white grid place-items-center border rounded-lg shadow-md relative p-4 "
    >
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

export const INSTANT_PERSONAS_OG_BLOG_IMAGE_TEMPLATE_CONFIG = {
  title: "Instant Personas Blog",
  description: "OG Image Template for the Instant Personas Blog",
  content: InstantPersonasOGBlogImageTemplate,
} as const;
