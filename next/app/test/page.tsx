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
import { BlackGradientBottomTemplate } from "@/components/toolfolio/share-preview-optimizer/image-template-editor/image-templates/black-gradient-bottom";
import { ImageWindowTemplate } from "@/components/toolfolio/share-preview-optimizer/image-template-editor/image-templates/image-window";
import { TwoColumnTemplate } from "@/components/toolfolio/share-preview-optimizer/image-template-editor/image-templates/two-column";
import { ColorGradientLeftTemplate } from "@/components/toolfolio/share-preview-optimizer/image-template-editor/image-templates/color-gradient-left";
import { FunShapesTemplate } from "@/components/toolfolio/share-preview-optimizer/image-template-editor/image-templates/fun-shapes";
import { GitSimpleTemplate } from "@/components/toolfolio/share-preview-optimizer/image-template-editor/image-templates/git-simple";
import { TitleSquiggleTemplate } from "@/components/toolfolio/share-preview-optimizer/image-template-editor/image-templates/title-squiggle";

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
    <div className="relative flex w-screen flex-col items-center justify-center gap-4 py-[50px]">
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
