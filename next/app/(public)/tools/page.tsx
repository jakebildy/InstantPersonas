import { ToolPreviewCard } from "@/components/toolfolio/tool-preview-card";
import { SEO_LINKS } from "@/lib/site";
import React from "react";

type Props = {};

export default function ToolsPage({}: Props) {
  return (
    <section className="flex-1">
      <title>Instant Personas | Free SEO Tools</title>
      <meta
        name="description"
        content="Free SEO tools to help you reach your audience quickly. No signup required."
      />
      <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
        <div className="mx-auto max-w-screen-sm text-center lg:mb-16 mb-8">
          <h2 className="mb-4 text-4xl lg:text-5xl tracking-tight font-extrabold text-gray-900 ">
            Reach Your Audience Quickly with Our Free SEO Tools
          </h2>
          <p className="font-light text-gray-500 sm:text-xl ">
            SEO is hard. We want to make it easier for you, so we created these
            free tools. No signup required.
            <br></br>
            <br></br>
            <div className=" text-xs">
              {" "}
              P.S. our paid software is even better. 😉
            </div>
          </p>
        </div>
        <div className="grid gap-8 lg:grid-cols-2">
          {SEO_LINKS.map((tool, i) => (
            <ToolPreviewCard
              tool={tool}
              key={tool.href}
              category={tool.category}
              className={
                SEO_LINKS.length % 2 !== 0 && i == SEO_LINKS.length - 1
                  ? "lg:col-span-2"
                  : ""
              }
            />
          ))}
        </div>
      </div>
    </section>
  );
}
