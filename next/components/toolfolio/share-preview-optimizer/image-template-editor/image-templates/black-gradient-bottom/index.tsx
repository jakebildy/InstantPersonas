import { gradientLightVariants } from "@/components/variants";
import {
  OpenGraphImageTemplatePreviewProps,
  OpenGraphImageTemplateProps,
} from "..";
import { GetDomainFromString } from "../../../utils";
import { ArrowRightIcon } from "lucide-react";
import Image from "next/image";

export function BlackGradientBottomTemplate({
  variant = "blue",
  url,
  title,
  description,
  image,
}: OpenGraphImageTemplateProps) {
  const domain = GetDomainFromString(url);

  return (
    <div className="relative grid h-[600px] w-[1200px] place-items-center overflow-hidden rounded-lg border bg-white shadow-md">
      <div
        className={"relative h-full w-full overflow-hidden rounded-lg border"}
      >
        <div
          className={
            "absolute left-1/2 top-1/2 z-10 grid w-full -translate-x-1/2 -translate-y-1/2 place-items-center gap-4 p-4 text-center text-white"
          }
        >
          <div className="flex flex-col items-center">
            <h1 className="z-20 text-4xl font-bold text-white">{title}</h1>
            <p className="z-20 text-2xl">{description}</p>
            <div className="mt-8 w-fit rounded-full bg-white p-1 shadow-lg">
              <span
                className={gradientLightVariants({
                  variant,
                  className:
                    "z-10 inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full px-6 py-1.5 text-2xl font-medium text-foreground shadow-lg",
                })}
              >
                Read more <ArrowRightIcon className="size-8" />
              </span>
            </div>
          </div>
        </div>
      </div>
      <Image
        src={image}
        alt={title}
        fill={true}
        className="z-0 object-cover brightness-50"
        priority
      />
      <div className="absolute bottom-0 z-0 h-1/2 w-full bg-gradient-to-t from-black to-transparent" />
    </div>
  );
}

export function BlackGradientBottomTemplatePreview({
  variant = "blue",
  url,
  title,
  description,
  image,
  size,
}: OpenGraphImageTemplatePreviewProps) {
  const isSmall = size === "sm";

  return (
    <div className="relative grid aspect-[2/1] h-full w-full place-items-center overflow-hidden rounded-md border bg-white shadow-sm">
      <div
        className={"relative h-full w-full overflow-hidden rounded-md border"}
      >
        <div
          className={cn(
            "absolute left-1/2 top-1/2 z-10 grid w-full -translate-x-1/2 -translate-y-1/2 place-items-center text-center text-white",
            isSmall ? "gap-1 p-1" : "gap-4 p-4",
          )}
        >
          <div className="flex flex-col items-center">
            <h1
              className={cn(
                "z-20 font-bold text-white",
                isSmall ? "text-sm" : "text-2xl",
              )}
            >
              {title}
            </h1>
            <p
              className={cn(
                "z-20 text-2xl",
                isSmall ? "text-[10px]" : "text-xl",
              )}
            >
              {description}
            </p>
            <span
              className={cn(
                "flex max-h-fit min-h-0 w-fit rounded-full bg-white shadow-lg",
                isSmall ? "mt-0.5 p-0.5" : "mt-4 p-1",
              )}
            >
              <span
                className={cn(
                  gradientLightVariants({
                    variant,
                    className:
                      "z-10 inline-flex items-center justify-center whitespace-nowrap rounded-full font-medium text-foreground shadow-md",
                  }),
                  isSmall
                    ? "gap-0.5 px-4 py-1 text-[6px] leading-[8px]"
                    : "gap-1 px-6 py-1.5 text-sm",
                )}
              >
                Read more{" "}
                <ArrowRightIcon className={cn(isSmall ? "size-2" : "size-6")} />
              </span>
            </span>
          </div>
        </div>
      </div>
      <Image
        src={image}
        alt={title}
        fill={true}
        className="z-0 object-cover brightness-50"
        priority
      />
      <div className="absolute bottom-0 z-0 h-1/2 w-full bg-gradient-to-t from-black to-transparent" />
    </div>
  );
}

import * as ImagePreview from "./template-preview.png";
import { StaticImport } from "next/dist/shared/lib/get-img-props";
import { cn } from "@/lib/utils";

export const BLACK_GRADIENT_BOTTOM_IMAGE_TEMPLATE_CONFIG = {
  title: "Black Gradient Bottom Template",
  description:
    "A simple black gradient bottom template with a white text overlay.",
  image: ImagePreview as StaticImport,
  imageTemplate: BlackGradientBottomTemplate,
  preview: BlackGradientBottomTemplatePreview,
} as const;
