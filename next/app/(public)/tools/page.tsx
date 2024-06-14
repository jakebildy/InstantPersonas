import { ToolPreviewCard } from "@/components/toolfolio/tool-preview-card";
import { SEO_LINKS } from "@/lib/site";
import React from "react";

type Props = {};

export default function ToolsPage({}: Props) {
  return (
    <section className="flex-1 bg-white">
      <title>InstantPersonas | Free SEO Tools</title>
      <meta
        name="description"
        content="Free SEO tools to help you reach your audience quickly. No signup required."
      />
      <div className="mx-auto max-w-screen-xl px-4 py-8 lg:px-6 lg:py-16">
        <div className="mx-auto mb-8 max-w-screen-sm text-center lg:mb-16">
          <h2 className="mb-4 text-4xl font-extrabold tracking-tight text-gray-900 lg:text-5xl">
            Reach Your Audience Quickly with Our Free SEO Tools
          </h2>
          <p className="font-light text-gray-500 sm:text-xl">
            We want to make SEO easier for you, so we created these free tools.
            No signup required.
            <br></br>
            <br></br>
            <span className="text-xs">
              P.S. our paid software is even better. 😉
            </span>
          </p>
        </div>
        <div className="grid gap-8 lg:grid-cols-2">
          {SEO_LINKS.filter((link) => link.isFreeTool === true).map(
            (tool, i) => (
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
            )
          )}
        </div>
      </div>
    </section>
  );
}
