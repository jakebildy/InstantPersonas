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

  useEffect(() => {
    const lgMediaQuery = window.matchMedia("(min-width: 1024px)");

    function onMediaQueryChange({ matches }: any) {
      setTabOrientation(matches ? "vertical" : "horizontal");
    }

    onMediaQueryChange(lgMediaQuery);
    lgMediaQuery.addEventListener("change", onMediaQueryChange);

    return () => {
      lgMediaQuery.removeEventListener("change", onMediaQueryChange);
    };
  }, []);

  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <section
      id="features"
      aria-label="Features for running your books"
      className="relative overflow-hidden bg-black pb-28 pt-20 sm:py-32"
    >
      <img
        className="absolute left-0 top-1/2 max-w-none translate-y-[-42%] w-full h-full"
        src={backgroundImage}
        alt=""
        width={2245}
        height={1636}
      />
      <Container className="relative">
        <div className="max-w-2xl md:mx-auto md:text-center xl:max-w-none">
          <h2 className="font-display text-3xl tracking-tight text-white sm:text-4xl md:text-5xl">
            Reclaim your free time.
          </h2>
          <p className="mt-6 text-lg tracking-tight text-blue-100">
            Revolutionize consulting productivity with AI-Powered Tools to
            unlock more time for high-value work.
          </p>
          <p className="mt-6 text-lg tracking-tight text-blue-100">
            Our current products
          </p>
        </div>
        <div
          ref={ref}
          style={{
            transform: isInView ? "none" : "translateY(200px)",
            opacity: isInView ? 1 : 0,
            transition: "all 0.9s cubic-bezier(0.17, 0.55, 0.55, 1) 0.3s",
          }}
        >
          <Tab.Group
            as="div"
            className=" mt-16 grid grid-cols-1 items-center gap-y-2 pt-10 sm:gap-y-6 md:mt-20 lg:grid-cols-12 lg:pt-0"
            vertical={tabOrientation === "vertical"}
          >
            {({ selectedIndex }: any) => (
              <>
                <div className="-mx-4 flex overflow-x-auto pb-4 sm:mx-0 sm:overflow-visible sm:pb-0 lg:col-span-5">
                  <Tab.List className="relative z-10 flex gap-x-4 whitespace-nowrap px-4 sm:mx-auto sm:px-0 lg:mx-0 lg:block lg:gap-x-0 lg:gap-y-1 lg:whitespace-normal">
                    {features.map((feature, featureIndex) => (
                      <div
                        key={feature.title}
                        className={clsx(
                          "group relative rounded-full px-4 py-1 lg:rounded-l-xl lg:rounded-r-none lg:p-6",
                          selectedIndex === featureIndex
                            ? "bg-white lg:bg-white/10 lg:ring-1 lg:ring-inset lg:ring-white/10"
                            : "hover:bg-white/10 lg:hover:bg-white/5"
                        )}
                      >
                        <h3>
                          <Tab
                            className={clsx(
                              "font-display text-lg outline-none",
                              selectedIndex === featureIndex
                                ? "text-blue-600 lg:text-white"
                                : "text-blue-100 hover:text-white lg:text-white"
                            )}
                          >
                            <span className="absolute inset-0 rounded-full lg:rounded-l-xl lg:rounded-r-none" />
                            {feature.title}
                          </Tab>
                        </h3>
                        <p
                          className={clsx(
                            "mt-2 hidden text-sm lg:block",
                            selectedIndex === featureIndex
                              ? "text-white"
                              : "text-blue-100 group-hover:text-white"
                          )}
                        >
                          {feature.description}
                        </p>
                      </div>
                    ))}
                  </Tab.List>
                </div>
                <Tab.Panels className="lg:col-span-7">
                  {features.map((feature) => (
                    <Tab.Panel key={feature.title} unmount={false}>
                      <div className="relative sm:px-6 lg:hidden">
                        <div className="absolute -inset-x-4 bottom-[-4.25rem] top-[-6.5rem] bg-white/10 ring-1 ring-inset ring-white/10 sm:inset-x-0 sm:rounded-t-xl" />
                        <p className="relative mx-auto max-w-2xl text-base text-white sm:text-center">
                          {feature.description}
                        </p>
                      </div>
                      <div className="mt-10 w-[45rem] overflow-hidden rounded-xl bg-slate-50 shadow-xl shadow-blue-900/20 sm:w-auto lg:mt-0 lg:w-[67.8125rem]">
                        <img
                          className="w-full"
                          src={feature.image}
                          alt=""
                          sizes="(min-width: 1024px) 67.8125rem, (min-width: 640px) 100vw, 45rem"
                        />
                      </div>
                    </Tab.Panel>
                  ))}
                </Tab.Panels>
              </>
            )}
          </Tab.Group>
        </div>
      </Container>
    </section>
  );
}
