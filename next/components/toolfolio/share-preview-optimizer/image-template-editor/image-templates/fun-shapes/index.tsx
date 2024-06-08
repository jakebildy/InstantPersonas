import {
  gradientVariants,
  textColorVariants,
  gradientLightVariants,
  background600,
} from "@/components/variants";
import { ArrowRightIcon } from "lucide-react";
import {
  OpenGraphImageTemplateProps,
  OpenGraphImageTemplatePreviewProps,
} from "..";
import Image from "next/image";

export function FunShapesTemplate({
  variant = "blue",
  url,
  title,
  description,
  image,
}: OpenGraphImageTemplateProps) {
  return (
    <div className="relative grid h-[600px] w-[1200px] place-items-center overflow-hidden rounded-lg border bg-white shadow-md">
      <div
        className={gradientVariants({
          variant,
          className:
            "relative z-10 h-full w-full overflow-hidden rounded-lg border",
        })}
      >
        <div
          className={textColorVariants({
            variant,
            className:
              "absolute left-1/2 top-1/2 z-10 grid w-full -translate-x-1/2 -translate-y-1/2 grid-cols-2 place-items-center gap-4 p-4 text-center",
          })}
        >
          <div className="col-start-2 flex flex-col items-center">
            <h1 className="z-20 text-4xl font-bold">{title}</h1>
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
        <div
          className="absolute -left-[200px] bottom-[90px] z-10 aspect-[2/1] h-[400px] w-[800px] rounded-t-md border bg-white p-2 shadow-lg"
          style={{
            transform: "rotate(-6deg)",
          }}
        >
          <Image
            src={image}
            alt={title}
            fill={true}
            className="z-0 object-cover"
            priority
          />
        </div>
        {/* Circle top left */}
        <div
          className={background600({
            variant,
            className:
              "absolute -left-[45px] -top-[45px] z-0 size-[190px] rounded-full opacity-25 shadow-sm",
          })}
        />
        <div
          className={background600({
            variant,
            className:
              "absolute -left-[45px] -top-[45px] z-0 size-[190px] rounded-full opacity-25 shadow-sm blur-sm",
          })}
        />
        {/* Square with a semicircular protrusion Bottom Middle */}
        <div
          className={background600({
            variant,
            className:
              "absolute -bottom-[80px] left-1/2 z-0 h-[200px] w-[190px] -translate-x-1/2 rounded-t-full opacity-20 shadow-sm blur-sm",
          })}
        />

        {/* Square Bottom Middle  */}
        <div
          className={background600({
            variant,
            className:
              "absolute -bottom-[105px] left-1/2 z-0 size-[180px] -translate-x-[calc(50%+186px)] rounded-sm opacity-10 shadow-sm shadow-[1px]",
          })}
        />
        {/* Square with a semicircular protrusion Middle Left */}
        <div
          className={background600({
            variant,
            className:
              "absolute bottom-[60px] right-[50px] z-0 size-[160px] rounded-r-full opacity-5 shadow-sm",
          })}
        />
        <div
          className={background600({
            variant,
            className:
              "absolute bottom-[60px] right-[50px] z-0 size-[160px] rounded-r-full opacity-5 shadow-sm blur-sm",
          })}
        />
        {/* Left-sided Semi-circle Top 3/4-ths */}
        <div
          className={background600({
            variant,
            className:
              "absolute -top-10 right-1/4 z-0 h-[190px] w-[95px] rounded-l-full opacity-20 shadow-sm",
          })}
        />
      </div>
    </div>
  );
}
export function FunShapesTemplatePreview({
  variant = "blue",
  url,
  title,
  description,
  image,
  size,
}: OpenGraphImageTemplatePreviewProps) {
  const isSmall = size === "sm";

  return (
    <div className="relative grid aspect-[2/1] size-full place-items-center overflow-hidden rounded-md border bg-white shadow-sm">
      <div
        className={gradientVariants({
          variant,
          className:
            "relative z-10 h-full w-full overflow-hidden rounded-md border",
        })}
      >
        <div
          className={textColorVariants({
            variant,
            className: cn(
              "absolute left-1/2 top-1/2 z-10 grid w-full -translate-x-1/2 -translate-y-1/2 grid-cols-2 place-items-center text-center",
              isSmall ? "gap-1 p-1" : "gap-4 p-4",
            ),
          })}
        >
          <div className="col-start-2 flex flex-col items-center">
            <h1
              className={cn(
                "z-20 font-bold text-white",
                isSmall ? "text-[10px]" : "text-2xl",
              )}
            >
              {title}
            </h1>
            <p className={cn("z-20", isSmall ? "text-[4px]" : "text-lg")}>
              {description}
            </p>
            <span
              className={cn(
                "flex max-h-fit min-h-0 w-fit rounded-full bg-white shadow-lg",
                isSmall ? "mt-2 p-0.5" : "mt-4 p-1",
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
                    ? "gap-0.5 px-2 py-[1px] text-[4px] leading-[8px]"
                    : "gap-1 px-6 py-1.5 text-sm",
                )}
              >
                Read more{" "}
                <ArrowRightIcon className={cn(isSmall ? "size-1" : "size-6")} />
              </span>
            </span>
          </div>
        </div>
        <div
          className={cn(
            "absolute z-10 aspect-[2/1] border bg-white",
            isSmall
              ? "-left-[75px] bottom-[15px] h-[100px] w-[200px] rounded-t-md p-0.5 shadow-sm"
              : "-left-[175px] bottom-[40px] h-[300px] w-[600px] rounded-t-md p-1 shadow-md",
          )}
          style={{
            transform: "rotate(-6deg)",
          }}
        >
          <Image
            src={image}
            alt={title}
            fill={true}
            className="z-0 object-cover"
            priority
          />
        </div>
        {/* Circle top left */}
        <div
          className={background600({
            variant,
            className: cn(
              "absolute z-0 rounded-full opacity-25 shadow-sm",
              isSmall
                ? "-left-[15px] -top-[15px] size-[50px]"
                : "-left-[24px] -top-[24px] size-[95px]",
            ),
          })}
        />
        <div
          className={background600({
            variant,
            className: cn(
              "absolute z-0 rounded-full opacity-25 shadow-sm blur-sm",
              isSmall
                ? "-left-[15px] -top-[15px] size-[50px]"
                : "-left-[24px] -top-[24px] size-[95px]",
            ),
          })}
        />
        {/* Square with a semicircular protrusion Bottom Middle */}
        <div
          className={background600({
            variant,
            className: cn(
              "absolute left-1/2 z-0 -translate-x-1/2 rounded-t-full opacity-20 shadow-sm",
              isSmall
                ? "-bottom-[10px] h-[50px] w-[50px]"
                : "-bottom-[40px] h-[100px] w-[95px] blur-sm",
            ),
          })}
        />

        {/* Square Bottom Middle  */}
        <div
          className={background600({
            variant,
            className: cn(
              "absolute left-1/2 z-0 rounded-sm opacity-10 shadow-sm shadow-[1px]",
              isSmall
                ? "-bottom-[26px] size-[45px] -translate-x-[calc(50%+48px)]"
                : "-bottom-[53px] size-[90px] -translate-x-[calc(50%+93px)]",
            ),
          })}
        />
        {/* Square with a semicircular protrusion Middle Left */}
        <div
          className={background600({
            variant,
            className: cn(
              "absolute z-0 rounded-r-full opacity-5 shadow-sm",
              isSmall
                ? "bottom-[15px] right-[12px] size-[40px]"
                : "bottom-[30px] right-[25px] size-[80px]",
            ),
          })}
        />
        <div
          className={background600({
            variant,
            className: cn(
              "absolute z-0 rounded-r-full opacity-5 shadow-sm blur-sm",
              isSmall
                ? "bottom-[15px] right-[12px] size-[40px]"
                : "bottom-[30px] right-[25px] size-[80px]",
            ),
          })}
        />
        {/* Left-sided Semi-circle Top 3/4-ths */}
        <div
          className={background600({
            variant,
            className: cn(
              "absolute right-1/4 z-0 rounded-l-full opacity-20 shadow-sm",
              isSmall ? "-top-2 h-[48px] w-[24px]" : "-top-5 h-[95px] w-[48px]",
            ),
          })}
        />
      </div>
    </div>
  );
}

import * as ImagePreview from "./template-preview.png";
import { StaticImport } from "next/dist/shared/lib/get-img-props";
import { cn } from "@/lib/utils";

export const FUN_SHAPES_IMAGE_TEMPLATE_CONFIG = {
  title: "Fun Shapes",
  description:
    "A fun and playful template with various shapes and gradients to make your image stand out.",
  image: ImagePreview as StaticImport,
  imageTemplate: FunShapesTemplate,
  preview: FunShapesTemplatePreview,
} as const;
