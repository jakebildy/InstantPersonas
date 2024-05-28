import {
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
import { cx } from "class-variance-authority";
import { splitUrl } from "../../../utils";

export function GitSimpleTemplate({
  variant = "blue",
  url,
  title,
  description,
  image,
}: OpenGraphImageTemplateProps) {
  const [domain, lastPart] = splitUrl(url);

  return (
    <div className="w-[1200px] h-[600px]  grid grid-cols-3 place-items-center border p-10 rounded-lg shadow-md relative overflow-hidden bg-white">
      <p
        className={textColorVariants({
          variant,
          className:
            "z-20 text-2xl absolute top-0 left-0 p-10  text-opacity-90",
        })}
      >
        {description}
      </p>
      <div
        className={textColorVariants({
          variant,
          className: "relative w-full h-full overflow-hidden col-span-2",
        })}
      >
        <div
          className={textColorVariants({
            variant,
            className:
              "z-20 py-4 text-left grid place-items-center gap-4 w-full h-full ",
          })}
        >
          <div className="flex flex-col w-full gap-4">
            <h1 className="z-20 text-5xl font-bold">{title}</h1>

            <div className="bg-white rounded-full p-1 shadow-lg w-fit">
              <span
                className={cx(
                  gradientLightVariants({
                    variant,
                    className:
                      "inline-flex  items-center justify-center whitespace-nowrap gap-2 rounded-full px-6 py-1.5 text-2xl font-medium text-foreground shadow-lg z-10",
                  }),
                  textColorVariants({
                    variant,
                  })
                )}
              >
                Read more <ArrowRightIcon className="size-8" />
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className=" p-2 col-span-1 flex  w-full h-1/2 relative">
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
      <span
        className={
          "z-20 text-2xl absolute bottom-0 left-0 p-10  text-opacity-90 inline-flex"
        }
      >
        {domain}{" "}
        <span
          className={textColorVariants({
            variant,
            className: "font-semibold empty:hidden",
          })}
        >
          {lastPart}
        </span>
      </span>
      <div
        className={background600({
          variant,
          className: "absolute bottom-0 left-0 h-4 w-full",
        })}
      />
    </div>
  );
}

export function GitSimpleTemplatePreview({
  variant = "blue",
  url,
  title,
  description,
  image,
  size,
}: OpenGraphImageTemplatePreviewProps) {
  const [domain, lastPart] = splitUrl(url);
  const isSmall = size === "sm";

  return (
    <div
      className={cn(
        "size-full aspect-[2/1] grid grid-cols-3 place-items-center border rounded-md shadow-sm relative overflow-hidden bg-white",
        isSmall ? "p-2" : "p-8"
      )}
    >
      <p
        className={textColorVariants({
          variant,
          className: cn(
            "z-20  absolute top-0 left-0 text-left text-opacity-90",
            isSmall ? "text-[5px] p-2" : "text-xl p-8"
          ),
        })}
      >
        {description}
      </p>
      <div
        className={textColorVariants({
          variant,
          className: "relative w-full h-full overflow-hidden col-span-2",
        })}
      >
        <div
          className={textColorVariants({
            variant,
            className: cn(
              "z-20 text-left grid place-items-center gap-4 w-full h-full ",
              isSmall ? "gap-1 py-1" : "gap-4 py-4"
            ),
          })}
        >
          <div
            className={cn(
              "flex flex-col w-full",
              isSmall ? "gap-0.5" : "gap-2"
            )}
          >
            <h1
              className={cn(
                "z-20 text-5xl font-bold",
                isSmall ? "text-[8px]" : "text-3xl"
              )}
            >
              {title}
            </h1>
            <span
              className={cn(
                "bg-white rounded-full flex shadow-lg  w-fit max-h-fit min-h-0 z-30",
                isSmall ? " p-0.5" : "p-1"
              )}
            >
              <span
                className={cx(
                  gradientLightVariants({
                    variant,
                    className:
                      "inline-flex  items-center justify-center whitespace-nowrap gap-2 rounded-full font-medium text-foreground shadow-lg z-10",
                  }),
                  textColorVariants({
                    variant,
                    className: cn(
                      isSmall
                        ? "px-2 py-0.5 text-[4px] gap-0.5 leading-[8px]"
                        : "px-6 py-1.5 text-sm gap-1"
                    ),
                  })
                )}
              >
                Read more{" "}
                <ArrowRightIcon className={cn(isSmall ? "size-2" : "size-6")} />
              </span>
            </span>
          </div>
        </div>
      </div>
      <div className=" p-2 col-span-1 flex  w-full h-1/2 relative">
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
      <span
        className={cn(
          "z-20  absolute bottom-0 left-0  text-opacity-90 inline-flex",
          isSmall ? "text-[8px] p-2" : "text-xl p-8"
        )}
      >
        {domain}{" "}
        <span
          className={textColorVariants({
            variant,
            className: "font-semibold empty:hidden",
          })}
        >
          {lastPart}
        </span>
      </span>
      <div
        className={background600({
          variant,
          className: cn(
            "absolute bottom-0 left-0 h-4 w-full",
            isSmall ? "h-1" : "h-4"
          ),
        })}
      />
    </div>
  );
}

import * as ImagePreview from "./template-preview.png";
import { StaticImport } from "next/dist/shared/lib/get-img-props";
import { cn } from "@/lib/utils";

export const GIT_SIMPLE_IMAGE_TEMPLATE_CONFIG = {
  title: "Git Simple",
  description: "A simple and clean template inspired by the git-commit style.",
  image: ImagePreview as StaticImport,
  imageTemplate: GitSimpleTemplate,
  preview: GitSimpleTemplatePreview,
} as const;
