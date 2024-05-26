"use client";

import { TemplateEditView } from "@/components/toolfolio/share-preview-optimizer/image-template-editor/image-template-edit-view";
import { OpenGraphImageTemplateProps } from "@/components/toolfolio/share-preview-optimizer/image-template-editor/image-templates";
import { GradientGridTemplate } from "@/components/toolfolio/share-preview-optimizer/image-template-editor/image-templates/gradient-grid";
import { InstantPersonasBasicTemplate } from "@/components/toolfolio/share-preview-optimizer/image-template-editor/image-templates/instant-personas-basic";
import { SocialPreviewIntegrationShowcase } from "@/components/toolfolio/share-preview-optimizer/integration-showcase";
import { Button } from "@/components/ui/button";
import RadialGradient from "@/components/ui/magicui/radial-gradient";
import RetroGrid from "@/components/ui/magicui/retro-grid";
import {
  Border600,
  ColorVariant,
  ColorVariants,
  gradientLightVariants,
  gradientVariants,
  shadowVariants,
} from "@/components/variants";
import { cva, cx } from "class-variance-authority";
import React, { useEffect, useState } from "react";

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
    <div className="flex flex-col gap-4 items-center justify-center h-screen w-screen relative ">
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
