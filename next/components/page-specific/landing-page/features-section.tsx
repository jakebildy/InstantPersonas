import { Container } from "@/components/page-specific/landing-page/container";
import { AnimatedTooltip } from "@/components/ui/aceternity/animated_tooltip";
import { HoverEffect } from "@/components/ui/aceternity/card_hover_effect";

export default function FeaturesSection() {
  const projects = [
    {
      title: "Guest Post Opportunity Finder",
      description:
        "Find guest post opportunities that your persona would read and boost your SEO. Download as a CSV and check the Domain Authority of each site.",
      link: "/tools/guest-post-finder/",
    },
    {
      title: "Topical Authority Map Generator",
      description:
        "Increase your site's reach with content ideas specifically designed to boost your topical authority. Create a topical authority map and a downloadable table.",
      link: "/tools/topical-authority",
    },
    {
      title: "TikTok Content Analysis",
      description:
        "See what content your persona is engaging with on TikTok. Use it to inform your content strategy.",
      link: "/register/",
    },
    {
      title: "Google Keyword Finder",
      description:
        "Find the best niche keywords for your personas. See their search volume, competitiveness and CPC.",
      link: "/register/",
    },
  ];

  return (
    <section
      id="product-features"
      className="relative bg-white py-32  text-center"
    >
      <h2 className="text-base font-semibold leading-7 text-green-600 pt-20">
        Features
      </h2>
      <h2 className="font-display text-5xl font-bold tracking-tight text-black  mb-10">
        Reach your audience quickly.
      </h2>
      <p className="mx-auto mt-6 max-w-2xl text-center text-lg leading-8 text-gray-600">
        Once you create your personas, they integrate with our suite of tools.
      </p>
      <div className="max-w-5xl mx-auto px-8">
        <HoverEffect items={projects} />
      </div>
    </section>
  );
}
