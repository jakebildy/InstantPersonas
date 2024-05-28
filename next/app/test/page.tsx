"use client";

import { TemplateEditView } from "@/components/toolfolio/share-preview-optimizer/image-template-editor/image-template-edit-view";
import { OpenGraphImageTemplateProps } from "@/components/toolfolio/share-preview-optimizer/image-template-editor/image-templates";
import { GradientGridTemplate } from "@/components/toolfolio/share-preview-optimizer/image-template-editor/image-templates/gradient-grid";
import { InstantPersonasBasicTemplate } from "@/components/toolfolio/share-preview-optimizer/image-template-editor/image-templates/instant-personas-basic";
import { SocialPreviewIntegrationShowcase } from "@/components/toolfolio/share-preview-optimizer/integration-showcase";
import {
  GetDomainFromString,
  splitUrl,
} from "@/components/toolfolio/share-preview-optimizer/utils";
import { Button } from "@/components/ui/button";
import RadialGradient from "@/components/ui/magicui/radial-gradient";
import RetroGrid from "@/components/ui/magicui/retro-grid";
import {
  background600,
  Border600,
  ColorVariant,
  ColorVariantMap,
  ColorVariants,
  gradientDarkVariants,
  gradientLightVariants,
  gradientVariants,
  shadowVariants,
  SVG600,
  textColorVariants,
} from "@/components/variants";
import { cva, cx } from "class-variance-authority";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { ArrowLeftIcon, ArrowRightIcon } from "lucide-react";
import GridPattern from "@/components/ui/magicui/grid-pattern";

type Props = {};

const OG_PREVIEW_TEST = {
  url: "instantpersonas.com/test",
  title: "Instant Personas | Get Started",
  description:
    "Save hours understanding your customers with our User Persona generator.",
  image: "/test-og-preview.png",
};

export default function PageTest({}: Props) {
  const [variant, setVariant] = useState<ColorVariant>("blue");

  // State management for open-graph metadata
  const [title, setTitle] = useState(OG_PREVIEW_TEST.title);
  const [description, setDescription] = useState(OG_PREVIEW_TEST.description);
  const [url, setUrl] = useState(OG_PREVIEW_TEST.url);
  const [image, setImage] = useState(OG_PREVIEW_TEST.image);

  //function to change variant based on list of variants
  const changeVariant = () => {
    const index = ColorVariants.indexOf(variant);
    setVariant(ColorVariants[(index + 1) % ColorVariants.length]);
  };

  return (
    <div className="flex flex-col gap-4 items-center justify-center py-[50px] w-screen relative ">
      <Button variant={"outline"} onClick={() => changeVariant()}>
        Change Variant
      </Button>
      <InstantPersonasBasicTemplate
        variant={variant}
        url={url}
        title={title}
        description={description}
        image={image}
      />
      <GradientGridTemplate
        variant={variant}
        url={url}
        title={title}
        description={description}
        image={image}
      />
      <BlackGradientBottomTemplate
        variant={variant}
        url={url}
        title={title}
        description={description}
        image={image}
      />
      <ImageWindowTemplate
        variant={variant}
        url={url}
        title={title}
        description={description}
        image={image}
      />
      <TwoColumnTemplate
        variant={variant}
        url={url}
        title={title}
        description={description}
        image={image}
      />
      <ColorGradientLeftTemplate
        variant={variant}
        url={url}
        title={title}
        description={description}
        image={image}
      />
      <FunShapesTemplate
        variant={variant}
        url={url}
        title={title}
        description={description}
        image={image}
      />
      <GitSimpleTemplate
        variant={variant}
        url={url}
        title={title}
        description={description}
        image={image}
      />
      <TitleSquiggleTemplate
        variant={variant}
        url={url}
        title={title}
        description={description}
        image={image}
      />

      <Button variant={"outline"} onClick={() => changeVariant()}>
        Change Variant
      </Button>
    </div>
  );
}

function BlackGradientBottomTemplate({
  variant = "blue",
  url,
  title,
  description,
  image,
}: OpenGraphImageTemplateProps) {
  const domain = GetDomainFromString(url);

  return (
    <div className="w-[1200px] h-[600px]  grid place-items-center border rounded-lg shadow-md relative overflow-hidden">
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
      <div className="absolute bottom-0 h-1/2 w-full bg-gradient-to-t from-black to-transparent z-0" />
    </div>
  );
}

function ImageWindowTemplate({
  variant = "blue",
  url,
  title,
  description,
  image,
}: OpenGraphImageTemplateProps) {
  const domain = GetDomainFromString(url);

  return (
    <div className="w-[1200px] h-[600px]  grid place-items-center border rounded-lg shadow-md relative overflow-hidden">
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

function TwoColumnTemplate({
  variant = "blue",
  url,
  title,
  description,
  image,
}: OpenGraphImageTemplateProps) {
  const domain = GetDomainFromString(url);

  return (
    <div className="w-[1200px] h-[600px]  grid grid-cols-2 place-items-center border rounded-lg shadow-md relative overflow-hidden">
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

function ColorGradientLeftTemplate({
  variant = "blue",
  url,
  title,
  description,
  image,
}: OpenGraphImageTemplateProps) {
  const domain = GetDomainFromString(url);

  return (
    <div className="w-[1200px] h-[600px]  grid place-items-center border rounded-lg shadow-md relative overflow-hidden">
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

function FunShapesTemplate({
  variant = "blue",
  url,
  title,
  description,
  image,
}: OpenGraphImageTemplateProps) {
  const domain = GetDomainFromString(url);

  return (
    <div className="w-[1200px] h-[600px]  grid place-items-center border rounded-lg shadow-md relative overflow-hidden">
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

function GitSimpleTemplate({
  variant = "blue",
  url,
  title,
  description,
  image,
}: OpenGraphImageTemplateProps) {
  const [domain, lastPart] = splitUrl(url);

  return (
    <div className="w-[1200px] h-[600px]  grid grid-cols-3 place-items-center border p-10 rounded-lg shadow-md relative overflow-hidden">
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

function TitleSquiggleTemplate({
  variant = "blue",
  url,
  title,
  description,
  image,
}: OpenGraphImageTemplateProps) {
  const [domain, lastPart] = splitUrl(url);

  return (
    <div className="w-[1200px] h-[600px]  grid place-items-center border  rounded-lg shadow-md relative overflow-hidden">
      <Image
        src={image}
        alt={title}
        fill={true}
        className=" object-cover z-0 blur-3xl"
        priority
      />
      <div
        className={gradientLightVariants({
          variant,
          className: "z-10 h-full w-full p-10 ",
        })}
      >
        <div
          className={textColorVariants({
            variant,
            className:
              "z-20 py-4 grid place-items-center gap-4 w-full h-full text-center ",
          })}
        >
          <div className="flex flex-col w-full gap-4">
            <div className="relative mb-8">
              <h1 className="z-20 text-8xl font-bold relative">{title}</h1>
              <svg
                aria-hidden="true"
                viewBox="0 0 418 42"
                className={SVG600({
                  variant,
                  className:
                    "absolute left-0 bottom-0 translate-y-1/2 h-[50px] w-full z-10",
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
