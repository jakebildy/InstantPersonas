import {
  textColorVariants,
  gradientLightVariants,
} from "@/components/variants";
import { ArrowRightIcon } from "lucide-react";
import {
  OpenGraphImageTemplatePreviewProps,
  OpenGraphImageTemplateProps,
} from "..";
import { GetDomainFromString } from "../../../utils";
import Image from "next/image";
import { cn } from "@/lib/utils";

export function TwoColumnTemplate({
  variant = "blue",
  url,
  title,
  description,
  image,
}: OpenGraphImageTemplateProps) {
  const domain = GetDomainFromString(url);

  return (
    <div className="w-[1200px] h-[600px]  grid grid-cols-2 place-items-center border rounded-lg shadow-md relative overflow-hidden bg-white">
      <div className={"relative w-full h-full overflow-hidden "}>
        <div
          className={textColorVariants({
            variant,
            className:
              "z-20 py-4 text-center p-4 grid place-items-center gap-4 w-full h-full",
          })}
        >
          <div className="flex flex-col items-center gap-4">
            <h1 className="z-20 text-6xl font-bold">{title}</h1>
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
      <div className=" p-2 col-span-1 flex  w-full h-full relative">
        <div className=" relative rounded-md overflow-hidden shadow-md border h-full flex-1">
          <Image
            src={image}
            alt={title}
            fill={true}
            className=" object-cover z-0"
            priority
          />
        </div>
      </div>
    </div>
  );
}

export function TwoColumnTemplatePreview({
  variant = "blue",
  url,
  title,
  description,
  image,
  size,
}: OpenGraphImageTemplatePreviewProps) {
  const isSmall = size === "sm";

  return (
    <div className="size-full aspect-[2/1] grid grid-cols-2 place-items-center border rounded-md shadow-sm relative overflow-hidden bg-white">
      <div className={"relative w-full h-full overflow-hidden "}>
        <div
          className={textColorVariants({
            variant,
            className: cn(
              "z-20 text-center grid place-items-center w-full h-full",
              isSmall ? "p-1 gap-1" : "p-4 gap-4"
            ),
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
            <span
              className={cn(
                "bg-white rounded-full flex shadow-lg  w-fit max-h-fit min-h-0 z-30",
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
          </div>
        </div>
      </div>
      <div className=" p-2 col-span-1 flex  w-full h-full relative">
        <div className=" relative rounded-md overflow-hidden shadow-md border h-full flex-1">
          <Image
            src={image}
            alt={title}
            fill={true}
            className=" object-cover z-0"
            priority
          />
        </div>
      </div>
    </div>
  );
}

import * as ImagePreview from "./template-preview.png";
import { StaticImport } from "next/dist/shared/lib/get-img-props";

export const TWO_COLUMN_IMAGE_TEMPLATE_CONFIG = {
  title: "Two Column Template",
  description:
    "A two column template with a large image on the right and text on the left.",
  image: ImagePreview as StaticImport,
  imageTemplate: TwoColumnTemplate,
  preview: TwoColumnTemplatePreview,
} as const;
