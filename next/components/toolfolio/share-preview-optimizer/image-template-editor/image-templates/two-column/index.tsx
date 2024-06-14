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
    <div className="relative grid h-[600px] w-[1200px] grid-cols-2 place-items-center overflow-hidden rounded-lg border bg-white shadow-md">
      <div className={"relative h-full w-full overflow-hidden"}>
        <div
          className={textColorVariants({
            variant,
            className:
              "z-20 grid h-full w-full place-items-center gap-4 p-4 py-4 text-center",
          })}
        >
          <div className="flex flex-col items-center gap-4">
            <h1 className="z-20 text-6xl font-bold">{title}</h1>
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
      <div className="relative col-span-1 flex h-full w-full p-2">
        <div className="relative h-full flex-1 overflow-hidden rounded-md border shadow-md">
          <Image
            src={image}
            alt={title}
            fill={true}
            className="z-0 object-cover"
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
    <div className="relative grid aspect-[2/1] size-full grid-cols-2 place-items-center overflow-hidden rounded-md border bg-white shadow-sm">
      <div className={"relative h-full w-full overflow-hidden"}>
        <div
          className={textColorVariants({
            variant,
            className: cn(
              "z-20 grid h-full w-full place-items-center text-center",
              isSmall ? "gap-1 p-1" : "gap-4 p-4",
            ),
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
            <span
              className={cn(
                "z-30 flex max-h-fit min-h-0 w-fit rounded-full bg-white shadow-lg",
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
      <div className="relative col-span-1 flex h-full w-full p-2">
        <div className="relative h-full flex-1 overflow-hidden rounded-md border shadow-md">
          <Image
            src={image}
            alt={title}
            fill={true}
            className="z-0 object-cover"
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
