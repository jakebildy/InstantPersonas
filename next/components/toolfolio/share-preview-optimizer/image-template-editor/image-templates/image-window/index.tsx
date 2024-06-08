import RadialGradient from "@/components/ui/magicui/radial-gradient";
import {
  textColorVariants,
  gradientLightVariants,
  ColorVariantMap,
} from "@/components/variants";
import { ArrowRightIcon } from "lucide-react";
import {
  OpenGraphImageTemplatePreviewProps,
  OpenGraphImageTemplateProps,
} from "..";
import { GetDomainFromString } from "../../../utils";
import Image from "next/image";

export function ImageWindowTemplate({
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
          className={textColorVariants({
            variant,
            className:
              "absolute left-1/2 top-0 z-20 grid h-[300px] w-full -translate-x-1/2 place-items-center gap-4 p-4 py-4 text-center",
          })}
        >
          <div className="flex flex-col items-center gap-4">
            <h1 className="z-20 text-6xl font-bold">{title}</h1>
            <p className="z-20 text-2xl">{description}</p>
          </div>
        </div>
      </div>
      <div className="absolute left-1/2 top-1/2 z-30 w-fit -translate-x-1/2 -translate-y-1/2 rounded-full bg-white p-1 shadow-lg">
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
      <div className="absolute bottom-0 left-1/2 z-10 h-1/2 w-[90%] -translate-x-1/2 rounded-t-md border bg-white p-2 shadow-lg">
        <div className="relative h-[600px] overflow-hidden rounded-md border shadow-md">
          <Image
            src={image}
            alt={title}
            fill={true}
            className="z-0 object-cover"
            priority
          />
        </div>
      </div>
      <div className="absolute top-0 z-10 h-3/4 w-full bg-gradient-to-b from-white to-transparent" />
      <RadialGradient size={1200} from={ColorVariantMap[variant]} />
    </div>
  );
}

export function ImageWindowTemplatePreview({
  variant = "blue",
  url,
  title,
  description,
  image,
  size,
}: OpenGraphImageTemplatePreviewProps) {
  const isSmall = size === "sm";

  return (
    <div className="relative grid aspect-[2/1] size-full place-items-center overflow-hidden rounded-lg border bg-white shadow-md">
      <div
        className={"relative h-full w-full overflow-hidden rounded-lg border"}
      >
        <div
          className={textColorVariants({
            variant,
            className:
              "absolute left-1/2 top-0 z-20 grid h-1/2 w-full -translate-x-1/2 place-items-center gap-4 p-4 py-4 text-center",
          })}
        >
          <div
            className={cn(
              "flex flex-col items-center",
              isSmall ? "gap-1" : "gap-4",
            )}
          >
            <h1
              className={cn(
                "z-20 font-bold",
                isSmall ? "text-[8px]" : "text-3xl",
              )}
            >
              {title}
            </h1>
            <p className={cn("z-20", isSmall ? "text-[6px]" : "text-xl")}>
              {description}
            </p>
          </div>
        </div>
      </div>
      <span
        className={cn(
          "absolute left-1/2 top-1/2 z-30 flex max-h-fit min-h-0 w-fit -translate-x-1/2 -translate-y-1/2 rounded-full bg-white shadow-lg",
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

      <div className="absolute bottom-0 left-1/2 z-10 h-1/2 w-[90%] -translate-x-1/2 rounded-t-md border bg-white p-2 shadow-lg">
        <div className="relative h-[140%] overflow-hidden rounded-md border shadow-md">
          <Image
            src={image}
            alt={title}
            fill={true}
            className="z-0 object-cover"
            priority
          />
        </div>
      </div>
      <div className="absolute top-0 z-10 h-3/4 w-full bg-gradient-to-b from-white to-transparent" />
      <RadialGradient size={1200} from={ColorVariantMap[variant]} />
    </div>
  );
}

import * as ImagePreview from "./template-preview.png";
import { StaticImport } from "next/dist/shared/lib/get-img-props";
import { cn } from "@/lib/utils";

export const IMAGE_WINDOW_IMAGE_TEMPLATE_CONFIG = {
  title: "Window Preview Template",
  description:
    "A template that displays the image in a window with a gradient background.",
  image: ImagePreview as StaticImport,
  imageTemplate: ImageWindowTemplate,
  preview: ImageWindowTemplatePreview,
} as const;
