"use client";

import { InstantPersonasOGBlogImageTemplate } from "@/components/toolfolio/share-preview-optimizer/image-templates/instant-personas-blog";

type Props = {};

const OG_PREVIEW_TEST = {
  url: "https://instantpersonas.com",
  title: "Instant Personas | Get Started",
  description:
    "Save hours understanding your customers with our User Persona generator.",
  image: "/test-og-preview.png",
};

export default function PageTest({}: Props) {
  return (
    <div className="flex flex-col items-center justify-center h-screen w-screen relative ">
      <InstantPersonasOGBlogImageTemplate {...OG_PREVIEW_TEST} />
    </div>
  );
}
