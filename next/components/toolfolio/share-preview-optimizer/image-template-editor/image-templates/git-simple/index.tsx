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
    <div className="relative grid h-[600px] w-[1200px] grid-cols-3 place-items-center overflow-hidden rounded-lg border bg-white p-10 shadow-md">
      <p
        className={textColorVariants({
          variant,
          className: "absolute left-0 top-0 z-20 p-10 text-2xl text-opacity-90",
        })}
      >
        {description}
      </p>
      <div
        className={textColorVariants({
          variant,
          className: "relative col-span-2 h-full w-full overflow-hidden",
        })}
      >
        <div
          className={textColorVariants({
            variant,
            className:
              "z-20 grid h-full w-full place-items-center gap-4 py-4 text-left",
          })}
        >
          <div className="flex w-full flex-col gap-4">
            <h1 className="z-20 text-5xl font-bold">{title}</h1>

            <div className="w-fit rounded-full bg-white p-1 shadow-lg">
              <span
                className={cx(
                  gradientLightVariants({
                    variant,
                    className:
                      "z-10 inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full px-6 py-1.5 text-2xl font-medium text-foreground shadow-lg",
                  }),
                  textColorVariants({
                    variant,
                  }),
                )}
              >
                Read more <ArrowRightIcon className="size-8" />
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="relative col-span-1 flex h-1/2 w-full p-2">
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
      <span
        className={
          "absolute bottom-0 left-0 z-20 inline-flex p-10 text-2xl text-opacity-90"
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
        "relative grid aspect-[2/1] size-full grid-cols-3 place-items-center overflow-hidden rounded-md border bg-white shadow-sm",
        isSmall ? "p-2" : "p-8",
      )}
    >
      <p
        className={textColorVariants({
          variant,
          className: cn(
            "absolute left-0 top-0 z-20 text-left text-opacity-90",
            isSmall ? "p-2 text-[5px]" : "p-8 text-xl",
          ),
        })}
      >
        {description}
      </p>
      <div
        className={textColorVariants({
          variant,
          className: "relative col-span-2 h-full w-full overflow-hidden",
        })}
      >
        <div
          className={textColorVariants({
            variant,
            className: cn(
              "z-20 grid h-full w-full place-items-center gap-4 text-left",
              isSmall ? "gap-1 py-1" : "gap-4 py-4",
            ),
          })}
        >
          <div
            className={cn(
              "flex w-full flex-col",
              isSmall ? "gap-0.5" : "gap-2",
            )}
          >
            <h1
              className={cn(
                "z-20 text-5xl font-bold",
                isSmall ? "text-[8px]" : "text-3xl",
              )}
            >
              {title}
            </h1>
            <span
              className={cn(
                "z-30 flex max-h-fit min-h-0 w-fit rounded-full bg-white shadow-lg",
                isSmall ? "p-0.5" : "p-1",
              )}
            >
              <span
                className={cx(
                  gradientLightVariants({
                    variant,
                    className:
                      "z-10 inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full font-medium text-foreground shadow-lg",
                  }),
                  textColorVariants({
                    variant,
                    className: cn(
                      isSmall
                        ? "gap-0.5 px-2 py-0.5 text-[4px] leading-[8px]"
                        : "gap-1 px-6 py-1.5 text-sm",
                    ),
                  }),
                )}
              >
                Read more{" "}
                <ArrowRightIcon className={cn(isSmall ? "size-2" : "size-6")} />
              </span>
            </span>
          </div>
        </div>
      </div>
      <div className="relative col-span-1 flex h-1/2 w-full p-2">
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
      <span
        className={cn(
          "absolute bottom-0 left-0 z-20 inline-flex text-opacity-90",
          isSmall ? "p-2 text-[8px]" : "p-8 text-xl",
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
            isSmall ? "h-1" : "h-4",
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
