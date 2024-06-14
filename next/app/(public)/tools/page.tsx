import React from "react";
import { FreeToolSection } from "@/components/toolfolio/free-tools-section";

type Props = {};

export default function ToolsPage({}: Props) {
  return (
    <section className="flex-1 bg-white">
      <title>InstantPersonas | Free SEO Tools</title>
      <meta
        name="description"
        content="Free SEO tools to help you reach your audience quickly. No signup required."
      />

      <div className="py-8 lg:py-16">
        <FreeToolSection />
      </div>
    </section>
  );
}
