import { useEffect, useRef, useState } from "react";
import { Tab } from "@headlessui/react";
import clsx from "clsx";

import { Container } from "../Container";
import swot from "../../images/screenshots/swot.png";
import pestel from "../../images/screenshots/pestel.png";
import leanCanvas from "../../images/screenshots/lean-canvas.png";
import userPersona from "../../images/screenshots/user-persona.png";
import backgroundImage from "../../images/background-analyses-lg.jpg";
import { useInView } from "framer-motion";
import { AuroraBackground } from "../ui/aurora_background";
import { MacbookScroll } from "../ui/macbook_scroll";

const features = [
  {
    title: "SWOT Analyses",
    description:
      "AI-powered tool to create a SWOT Analysis for your company based on its description. A SWOT analysis is a strategic planning tool that helps to identify a business's internal strengths and weaknesses, as well as external opportunities and threats.",
    image: swot,
  },
  {
    title: "User Personas",
    description:
      "Powerful and customizable tool that uses AI to generate detailed user personas for businesses and organizations. A user persona is a fictional character that represents a company's ideal customer, based on market research and customer data.",
    image: userPersona,
  },
  {
    title: "Lean Canvases",
    description:
      "Create comprehensive Lean Canvases effortlessly based on the description of a business. A Lean Canvas is a one page business plan.",
    image: leanCanvas,
  },
  {
    title: "PESTEL Analyses",
    description:
      "Our AI-powered tool lets you quickly create a PESTEL Analysis for your company based on its description. A PESTEL analysis is a strategic tool used to identify and analyze the external factors that can impact an organization's business operations and decision-making.",
    image: pestel,
  },
];

export function PrimaryFeatures() {
  const [tabOrientation, setTabOrientation] = useState("horizontal");

  // const ref = useRef(null);
  // const isInView = useInView(ref, { once: true });

  return (
    <section
      id="features"
      aria-label="Features for running your books"
      className="relative overflow-hidden bg-black dark h-[200vh]"
    >
      <AuroraBackground className="h-[200vh]">
        <Container className=" b-28 pt-20 sm:py-32 ">
          <div className="height-[400vh]">
            <MacbookScroll
              title={
                <div className="max-w-2xl md:mx-auto md:text-center xl:max-w-none">
                  <h2 className="font-display text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-7xl pt-20">
                    Reclaim your free time.
                  </h2>
                  <p className="mt-6 text-lg tracking-tight text-blue-100">
                    Deep understanding of your target market with AI-Powered
                    Personas.
                  </p>
                  <p className="mt-6 text-lg tracking-tight text-blue-100">
                    Our current products
                  </p>
                </div>
              }
              src={userPersona}
            ></MacbookScroll>
          </div>
        </Container>
      </AuroraBackground>
    </section>
  );
}
