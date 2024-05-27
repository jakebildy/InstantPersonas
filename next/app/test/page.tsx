"use client";

import { TemplateEditView } from "@/components/toolfolio/share-preview-optimizer/image-template-editor/image-template-edit-view";
import { OpenGraphImageTemplateProps } from "@/components/toolfolio/share-preview-optimizer/image-template-editor/image-templates";
import { GradientGridTemplate } from "@/components/toolfolio/share-preview-optimizer/image-template-editor/image-templates/gradient-grid";
import { InstantPersonasBasicTemplate } from "@/components/toolfolio/share-preview-optimizer/image-template-editor/image-templates/instant-personas-basic";
import { SocialPreviewIntegrationShowcase } from "@/components/toolfolio/share-preview-optimizer/integration-showcase";
import { GetDomainFromString } from "@/components/toolfolio/share-preview-optimizer/utils";
import { Button } from "@/components/ui/button";
import RadialGradient from "@/components/ui/magicui/radial-gradient";
import RetroGrid from "@/components/ui/magicui/retro-grid";
import {
  Border600,
  ColorVariant,
  ColorVariantMap,
  ColorVariants,
  gradientDarkVariants,
  gradientLightVariants,
  gradientVariants,
  shadowVariants,
  textColorVariants,
} from "@/components/variants";
import { cva, cx } from "class-variance-authority";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { ArrowLeftIcon, ArrowRightIcon } from "lucide-react";

type Props = {};

const OG_PREVIEW_TEST = {
  url: "instantpersonas.com",
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
      <BasicTemplate
        variant={variant}
        url={url}
        title={title}
        description={description}
        image={image}
      />
      <BasicTemplate2
        variant={variant}
        url={url}
        title={title}
        description={description}
        image={image}
      />
      <BasicTemplate3
        variant={variant}
        url={url}
        title={title}
        description={description}
        image={image}
      />
      <BasicTemplate4
        variant={variant}
        url={url}
        title={title}
        description={description}
        image={image}
      />
    </div>
  );
}

function BasicTemplate({
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

function BasicTemplate2({
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

function BasicTemplate3({
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

function BasicTemplate4({
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
// function Template({
//   variant = "blue",
//   url,
//   title,
//   description,
//   image,
// }: OpenGraphImageTemplateProps) {
//   const domain = GetDomainFromString(url);

//   return (
//     <div className="w-[1200px] h-[600px] bg-white grid place-items-center border rounded-lg shadow-md relative p-4 ">
//       <div
//         className={cx(
// gradientVariants({
//   variant,
//   className:
//     "relative w-full h-full border rounded-lg overflow-hidden ",
// }),
//           shadowVariants({
//             variant,
//           })
//         )}
//       >
//         <Image
//           src={image}
//           alt={title}
//           fill={true}
//           className=" object-cover blur-xl opacity-30"
//           priority
//         />
//         <div
//           className={textColorVariants({
//             variant,
//             className:
//               "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center p-4 grid place-items-center gap-4 w-full",
//           })}
//         >
//           <PersonStandingIcon className="size-14" />
//           <div>
//             <h1 className=" text-4xl font-bold">{title}</h1>
//             <p className="text-2xl">{description}</p>
//             <span
//               className={textColorVariants({
//                 variant,
//                 className:
//                   "inline-flex my-4 items-center justify-center whitespace-nowrap rounded-full px-6 py-1.5 text-2xl font-medium bg-white text-foreground shadow-lg",
//               })}
//             >
//               {domain}
//             </span>
//           </div>
//         </div>
//         <PersonaIconBackgroundElement variant={variant} />
//       </div>
//     </div>
//   );
// }
