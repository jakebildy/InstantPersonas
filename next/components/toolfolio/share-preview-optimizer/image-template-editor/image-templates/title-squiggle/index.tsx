import {
  textColorVariants,
  gradientLightVariants,
  SVG600,
} from "@/components/variants";
import {
  OpenGraphImageTemplateProps,
  OpenGraphImageTemplatePreviewProps,
} from "..";
import Image from "next/image";

export function TitleSquiggleTemplate({
  variant = "blue",
  url,
  title,
  description,
  image,
}: OpenGraphImageTemplateProps) {
  return (
    <div className="relative grid h-[600px] w-[1200px] place-items-center overflow-hidden rounded-lg border bg-white shadow-md">
      <Image
        src={image}
        alt={title}
        fill={true}
        className="z-0 object-cover blur-3xl"
        priority
      />
      <div
        className={gradientLightVariants({
          variant,
          className: "z-10 h-full w-full p-10",
        })}
      >
        <div
          className={textColorVariants({
            variant,
            className:
              "z-20 grid h-full w-full place-items-center gap-4 py-4 text-center",
          })}
        >
          <div className="flex w-full flex-col gap-4">
            <div className="relative mb-8">
              <h1 className="relative z-20 text-8xl font-bold">{title}</h1>
              <svg
                aria-hidden="true"
                viewBox="0 0 418 42"
                className={SVG600({
                  variant,
                  className:
                    "absolute bottom-0 left-0 z-10 h-[50px] w-full translate-y-1/2",
                })}
                preserveAspectRatio="none"
              >
                <path d="M203.371.916c-26.013-2.078-76.686 1.963-124.73 9.946L67.3 12.749C35.421 18.062 18.2 21.766 6.004 25.934 1.244 27.561.828 27.778.874 28.61c.07 1.214.828 1.121 9.595-1.176 9.072-2.377 17.15-3.92 39.246-7.496C123.565 7.986 157.869 4.492 195.942 5.046c7.461.108 19.25 1.696 19.17 2.582-.107 1.183-7.874 4.31-25.75 10.366-21.992 7.45-35.43 12.534-36.701 13.884-2.173 2.308-.202 4.407 4.442 4.734 2.654.187 3.263.157 15.593-.78 35.401-2.686 57.944-3.488 88.365-3.143 46.327.526 75.721 2.23 130.788 7.584 19.787 1.924 20.814 1.98 24.557 1.332l.066-.011c1.201-.203 1.53-1.825.399-2.335-2.911-1.31-4.893-1.604-22.048-3.261-57.509-5.556-87.871-7.36-132.059-7.842-23.239-.254-33.617-.116-50.627.674-11.629.54-42.371 2.494-46.696 2.967-2.359.259 8.133-3.625 26.504-9.81 23.239-7.825 27.934-10.149 28.304-14.005.417-4.348-3.529-6-16.878-7.066Z" />
              </svg>
            </div>

            <p className="z-20 text-2xl">{description}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export function TitleSquiggleTemplatePreview({
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
      <Image
        src={image}
        alt={title}
        fill={true}
        className={cn("z-0 object-cover", isSmall ? "blur-md" : "blur-xl")}
        priority
      />
      <div
        className={gradientLightVariants({
          variant,
          className: cn("z-10 h-full w-full", isSmall ? "p-2" : "p-8"),
        })}
      >
        <div
          className={textColorVariants({
            variant,
            className: cn(
              "z-20 grid h-full w-full place-items-center gap-4 text-center",
              isSmall ? "gap-1 py-1" : "gap-2 py-2",
            ),
          })}
        >
          <div
            className={cn(
              "flex w-full flex-col gap-4",
              isSmall ? "gap-0" : "gap-2",
            )}
          >
            <div className={cn("relative", isSmall ? "mb-1" : "mb-6")}>
              <h1
                className={cn(
                  "relative z-20 text-8xl font-bold",
                  isSmall ? "text-base" : "text-4xl",
                )}
              >
                {title}
              </h1>
              <svg
                aria-hidden="true"
                viewBox="0 0 418 42"
                className={SVG600({
                  variant,
                  className: cn(
                    "absolute bottom-0 left-0 z-10 h-[50px] w-full translate-y-1/2",
                    isSmall ? "h-[20px] opacity-50" : "h-[25px]",
                  ),
                })}
                preserveAspectRatio="none"
              >
                <path d="M203.371.916c-26.013-2.078-76.686 1.963-124.73 9.946L67.3 12.749C35.421 18.062 18.2 21.766 6.004 25.934 1.244 27.561.828 27.778.874 28.61c.07 1.214.828 1.121 9.595-1.176 9.072-2.377 17.15-3.92 39.246-7.496C123.565 7.986 157.869 4.492 195.942 5.046c7.461.108 19.25 1.696 19.17 2.582-.107 1.183-7.874 4.31-25.75 10.366-21.992 7.45-35.43 12.534-36.701 13.884-2.173 2.308-.202 4.407 4.442 4.734 2.654.187 3.263.157 15.593-.78 35.401-2.686 57.944-3.488 88.365-3.143 46.327.526 75.721 2.23 130.788 7.584 19.787 1.924 20.814 1.98 24.557 1.332l.066-.011c1.201-.203 1.53-1.825.399-2.335-2.911-1.31-4.893-1.604-22.048-3.261-57.509-5.556-87.871-7.36-132.059-7.842-23.239-.254-33.617-.116-50.627.674-11.629.54-42.371 2.494-46.696 2.967-2.359.259 8.133-3.625 26.504-9.81 23.239-7.825 27.934-10.149 28.304-14.005.417-4.348-3.529-6-16.878-7.066Z" />
              </svg>
            </div>

            <p
              className={cn(
                "z-20 text-2xl",
                isSmall ? "text-[8px]" : "text-lg",
              )}
            >
              {description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

import * as ImagePreview from "./template-preview.png";
import { StaticImport } from "next/dist/shared/lib/get-img-props";
import { cn } from "@/lib/utils";

export const TITLE_SQUIGGLE_IMAGE_TEMPLATE_CONFIG = {
  title: "Title Squiggle",
  description:
    "A large title with a squiggly underline and a description below it.",
  image: ImagePreview as StaticImport,
  imageTemplate: TitleSquiggleTemplate,
  preview: TitleSquiggleTemplatePreview,
} as const;
