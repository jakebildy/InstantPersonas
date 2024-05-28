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
    <div className="w-[1200px] h-[600px]  grid place-items-center border rounded-lg shadow-md relative overflow-hidden bg-white">
      <div
        className={"relative w-full h-full border rounded-lg overflow-hidden "}
      >
        <div
          className={textColorVariants({
            variant,
            className:
              "z-20 absolute top-0 left-1/2 -translate-x-1/2 h-[300px] py-4 text-center p-4 grid place-items-center gap-4 w-full",
          })}
        >
          <div className="flex flex-col items-center gap-4">
            <h1 className="z-20 text-6xl font-bold">{title}</h1>
            <p className="z-20 text-2xl">{description}</p>
          </div>
        </div>
      </div>
      <div className="bg-white rounded-full p-1 shadow-lg  w-fit absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 z-30">
        <span
          className={gradientLightVariants({
            variant,
            className:
              "inline-flex  items-center justify-center whitespace-nowrap gap-2 rounded-full px-6 py-1.5 text-2xl font-medium text-foreground shadow-lg z-10",
          })}
        >
          Read more <ArrowRightIcon className="size-8" />
        </span>
      </div>
      <div className="z-10 w-[90%] h-1/2 absolute bottom-0 left-1/2 -translate-x-1/2 bg-white p-2 rounded-t-md border shadow-lg">
        <div className=" h-[600px] relative rounded-md overflow-hidden shadow-md border">
          <Image
            src={image}
            alt={title}
            fill={true}
            className=" object-cover z-0"
            priority
          />
        </div>
      </div>
      <div className="absolute top-0 h-3/4 bg-gradient-to-b from-white to-transparent w-full z-10" />
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
    <div className="size-full aspect-[2/1] grid place-items-center border rounded-lg shadow-md relative overflow-hidden bg-white">
      <div
        className={"relative w-full h-full border rounded-lg overflow-hidden "}
      >
        <div
          className={textColorVariants({
            variant,
            className:
              "z-20 absolute top-0 left-1/2 -translate-x-1/2 h-1/2 py-4 text-center p-4 grid place-items-center gap-4 w-full",
          })}
        >
          <div
            className={cn(
              "flex flex-col items-center",
              isSmall ? "gap-1" : "gap-4"
            )}
          >
            <h1
              className={cn(
                "z-20  font-bold",
                isSmall ? "text-[8px]" : "text-3xl"
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
          "bg-white rounded-full flex shadow-lg  w-fit max-h-fit min-h-0 absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 z-30",
          isSmall ? "mt-0.5 p-0.5" : "p-1 mt-4"
        )}
      >
        <span
          className={cn(
            gradientLightVariants({
              variant,
              className:
                "inline-flex  items-center justify-center whitespace-nowrap rounded-full  font-medium text-foreground shadow-md z-10",
            }),
            isSmall
              ? "px-4 py-1 text-[6px] gap-0.5 leading-[8px]"
              : "px-6 py-1.5 text-sm gap-1"
          )}
        >
          Read more{" "}
          <ArrowRightIcon className={cn(isSmall ? "size-2" : "size-6")} />
        </span>
      </span>

      <div className="z-10 w-[90%] h-1/2 absolute bottom-0 left-1/2 -translate-x-1/2 bg-white p-2 rounded-t-md border shadow-lg">
        <div className=" h-[140%] relative rounded-md overflow-hidden shadow-md border">
          <Image
            src={image}
            alt={title}
            fill={true}
            className=" object-cover z-0"
            priority
          />
        </div>
      </div>
      <div className="absolute top-0 h-3/4 bg-gradient-to-b from-white to-transparent w-full z-10" />
      <RadialGradient size={1200} from={ColorVariantMap[variant]} />
    </div>
  );
}

import * as ImagePreview from "../template-preview.png";
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
