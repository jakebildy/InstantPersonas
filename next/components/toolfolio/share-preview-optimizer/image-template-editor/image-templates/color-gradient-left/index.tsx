import {
  gradientLightVariants,
  gradientDarkVariants,
} from "@/components/variants";
import { ArrowRightIcon } from "lucide-react";
import {
  OpenGraphImageTemplatePreviewProps,
  OpenGraphImageTemplateProps,
} from "..";
import { GetDomainFromString } from "../../../utils";
import Image from "next/image";
import { cn } from "@/lib/utils";

export function ColorGradientLeftTemplate({
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
          className={
            "text-white z-10 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center p-4 grid place-items-center gap-4 w-full"
          }
        >
          <div className="flex flex-col items-center">
            <h1 className="z-20 text-white text-4xl font-bold">{title}</h1>
            <p className="z-20 text-2xl">{description}</p>
            <div className="bg-white rounded-full p-1 shadow-lg mt-8 w-fit">
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
          </div>
        </div>
      </div>
      <Image
        src={image}
        alt={title}
        fill={true}
        className=" object-cover brightness-50 z-0"
        priority
      />
      <div
        className={gradientDarkVariants({
          variant,
          className:
            "absolute bottom-0 h-full w-full bg-gradient-to-r  to-transparent z-0",
        })}
      />
    </div>
  );
}

export function ColorGradientLeftTemplatePreview({
  variant = "blue",
  url,
  title,
  description,
  image,
  size,
}: OpenGraphImageTemplatePreviewProps) {
  const isSmall = size === "sm";

  return (
    <div className="size-full aspect-[2/1]  grid place-items-center border rounded-md shadow-sm relative overflow-hidden bg-white">
      <div
        className={"relative w-full h-full border rounded-md overflow-hidden "}
      >
        <div
          className={cn(
            "text-white z-10 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center  grid place-items-center w-full",
            isSmall ? "p-1 gap-1" : "p-4 gap-4"
          )}
        >
          <div className="flex flex-col items-center">
            <h1
              className={cn(
                "z-20 text-white font-bold",
                isSmall ? "text-xs" : "text-3xl"
              )}
            >
              {title}
            </h1>
            <p className={cn("z-20 ", isSmall ? "text-[6px]" : "text-lg")}>
              {description}
            </p>
            <span
              className={cn(
                "bg-white rounded-full flex shadow-lg  w-fit max-h-fit min-h-0 ",
                isSmall ? "mt-2 p-0.5" : "p-1 mt-4"
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
          </div>
        </div>
      </div>
      <Image
        src={image}
        alt={title}
        fill={true}
        className=" object-cover brightness-50 z-0"
        priority
      />
      <div
        className={gradientDarkVariants({
          variant,
          className:
            "absolute bottom-0 h-full w-full bg-gradient-to-r  to-transparent z-0",
        })}
      />
    </div>
  );
}
import * as ImagePreview from "./template-preview.png";
import { StaticImport } from "next/dist/shared/lib/get-img-props";

export const COLOR_GRADIENT_LEFT_IMAGE_TEMPLATE_CONFIG = {
  title: "Color Gradient Left",
  description:
    "A simple and elegant template with a gradient overlay on the left side.",
  image: ImagePreview as StaticImport,
  imageTemplate: ColorGradientLeftTemplate,
  preview: ColorGradientLeftTemplatePreview,
} as const;
