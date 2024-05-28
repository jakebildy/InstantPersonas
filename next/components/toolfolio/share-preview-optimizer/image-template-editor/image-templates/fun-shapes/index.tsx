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
    <div className="w-[1200px] h-[600px]  grid place-items-center border rounded-lg shadow-md relative overflow-hidden bg-white">
      <div
        className={gradientVariants({
          variant,
          className:
            "relative w-full h-full border rounded-lg overflow-hidden z-10",
        })}
      >
        <div
          className={textColorVariants({
            variant,
            className:
              " z-10 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center p-4 grid place-items-center  grid-cols-2 gap-4 w-full",
          })}
        >
          <div className="flex flex-col items-center col-start-2">
            <h1 className="z-20 text-4xl font-bold">{title}</h1>
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
        <div
          className="z-10 aspect-[2/1] w-[800px] h-[400px] absolute bottom-[90px] -left-[200px] bg-white p-2 rounded-t-md border shadow-lg"
          style={{
            transform: "rotate(-6deg)",
          }}
        >
          <Image
            src={image}
            alt={title}
            fill={true}
            className=" object-cover z-0"
            priority
          />
        </div>
        {/* Circle top left */}
        <div
          className={background600({
            variant,
            className:
              "absolute -top-[45px]  -left-[45px] size-[190px] rounded-full opacity-25 z-0 shadow-sm",
          })}
        />
        <div
          className={background600({
            variant,
            className:
              "absolute -top-[45px]  -left-[45px] size-[190px] rounded-full opacity-25 z-0 shadow-sm blur-sm",
          })}
        />
        {/* Square with a semicircular protrusion Bottom Middle */}
        <div
          className={background600({
            variant,
            className:
              " w-[190px] h-[200px] rounded-t-full absolute -bottom-[80px]  left-1/2 -translate-x-1/2  opacity-20  z-0 shadow-sm blur-sm",
          })}
        />

        {/* Square Bottom Middle  */}
        <div
          className={background600({
            variant,
            className:
              "size-[180px] absolute -bottom-[105px]  left-1/2 -translate-x-[calc(50%+186px)] rounded-sm shadow-[1px]  opacity-10  z-0 shadow-sm",
          })}
        />
        {/* Square with a semicircular protrusion Middle Left */}
        <div
          className={background600({
            variant,
            className:
              " size-[160px] rounded-r-full absolute bottom-[60px] right-[50px]  opacity-5  z-0 shadow-sm",
          })}
        />
        <div
          className={background600({
            variant,
            className:
              "size-[160px] rounded-r-full absolute bottom-[60px] right-[50px]  opacity-5  z-0 shadow-sm blur-sm",
          })}
        />
        {/* Left-sided Semi-circle Top 3/4-ths */}
        <div
          className={background600({
            variant,
            className:
              "absolute -top-10 right-1/4  h-[190px] w-[95px] rounded-l-full opacity-20 z-0 shadow-sm",
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
    <div className="size-full aspect-[2/1]  grid place-items-center border rounded-md shadow-sm relative overflow-hidden bg-white">
      <div
        className={gradientVariants({
          variant,
          className:
            "relative w-full h-full border rounded-md overflow-hidden z-10",
        })}
      >
        <div
          className={textColorVariants({
            variant,
            className: cn(
              " z-10 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center grid place-items-center grid-cols-2 w-full",
              isSmall ? "p-1 gap-1" : "p-4 gap-4"
            ),
          })}
        >
          <div className="flex flex-col items-center col-start-2">
            <h1
              className={cn(
                "z-20 text-white font-bold",
                isSmall ? "text-[10px]" : "text-2xl"
              )}
            >
              {title}
            </h1>
            <p className={cn("z-20 ", isSmall ? "text-[4px]" : "text-lg")}>
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
                    ? "px-2 py-[1px] text-[4px] gap-0.5 leading-[8px]"
                    : "px-6 py-1.5 text-sm gap-1"
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
            "z-10 aspect-[2/1] absolute bg-white border",
            isSmall
              ? "w-[200px] h-[100px] bottom-[15px] -left-[75px] p-0.5 rounded-t-md shadow-sm"
              : "w-[600px] h-[300px] bottom-[40px] -left-[175px] p-1 rounded-t-md shadow-md"
          )}
          style={{
            transform: "rotate(-6deg)",
          }}
        >
          <Image
            src={image}
            alt={title}
            fill={true}
            className=" object-cover z-0"
            priority
          />
        </div>
        {/* Circle top left */}
        <div
          className={background600({
            variant,
            className: cn(
              "absolute rounded-full opacity-25 z-0 shadow-sm",
              isSmall
                ? "-top-[15px]  -left-[15px] size-[50px]"
                : "-top-[24px]  -left-[24px] size-[95px]"
            ),
          })}
        />
        <div
          className={background600({
            variant,
            className: cn(
              "absolute rounded-full opacity-25 z-0 shadow-sm blur-sm",
              isSmall
                ? "-top-[15px]  -left-[15px] size-[50px]"
                : "-top-[24px]  -left-[24px] size-[95px]"
            ),
          })}
        />
        {/* Square with a semicircular protrusion Bottom Middle */}
        <div
          className={background600({
            variant,
            className: cn(
              "absolute left-1/2 -translate-x-1/2 rounded-t-full opacity-20 z-0 shadow-sm",
              isSmall
                ? "w-[50px] h-[50px] -bottom-[10px] "
                : "w-[95px] h-[100px] -bottom-[40px] blur-sm"
            ),
          })}
        />

        {/* Square Bottom Middle  */}
        <div
          className={background600({
            variant,
            className: cn(
              " absolute left-1/2 rounded-sm shadow-[1px] opacity-10 z-0 shadow-sm",
              isSmall
                ? "size-[45px] -bottom-[26px] -translate-x-[calc(50%+48px)]"
                : "size-[90px] -bottom-[53px] -translate-x-[calc(50%+93px)]"
            ),
          })}
        />
        {/* Square with a semicircular protrusion Middle Left */}
        <div
          className={background600({
            variant,
            className: cn(
              "rounded-r-full absolute opacity-5 z-0 shadow-sm",
              isSmall
                ? "size-[40px] bottom-[15px] right-[12px]"
                : "size-[80px] bottom-[30px] right-[25px]"
            ),
          })}
        />
        <div
          className={background600({
            variant,
            className: cn(
              "rounded-r-full absolute opacity-5 z-0 shadow-sm blur-sm",
              isSmall
                ? "size-[40px] bottom-[15px] right-[12px]"
                : "size-[80px] bottom-[30px] right-[25px]"
            ),
          })}
        />
        {/* Left-sided Semi-circle Top 3/4-ths */}
        <div
          className={background600({
            variant,
            className: cn(
              "absolute right-1/4 rounded-l-full opacity-20 z-0 shadow-sm",
              isSmall ? "-top-2 h-[48px] w-[24px]" : "-top-5 h-[95px] w-[48px]"
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
