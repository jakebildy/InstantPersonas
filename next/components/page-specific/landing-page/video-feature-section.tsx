import { useRef } from "react";
import { Container } from "./container";
import { AuroraBackground } from "@/components/ui/aceternity/aurora_background";
import { MacbookScroll } from "@/components/ui/aceternity/macbook_scroll";
import { motion, useScroll, useTransform } from "framer-motion";

export default function VideoFeatureSection() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const textOpacity = useTransform(
    scrollYProgress,
    [0, 0.2, 0.8, 1],
    [16, 0, 0, 16],
  );

  return (
    <motion.section
      id="features"
      aria-label="Features for running your books"
      className="dark relative h-[200vh] overflow-hidden bg-black"
      // style={{
      //   marginLeft: textOpacity,
      //   marginRight: textOpacity,
      // }}
    >
      {/* Hide on sm screens */}
      <div className="hidden sm:block">
        {/* <AuroraBackground className="h-[200vh]"> */}
        <div className="height-[400vh]">
          <MacbookScroll
            title={
              <div className="max-w-2xl md:mx-auto md:text-center xl:max-w-none">
                <h2 className="font-display pt-20 text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-7xl">
                  Reclaim your free time.
                </h2>
                <p className="mt-6 text-lg tracking-tight text-blue-100">
                  Deep understanding of your target market with AI-Powered
                  Personas.
                </p>
              </div>
            }
          />
        </div>
        {/* </AuroraBackground> */}
      </div>

      {/* Hide on md screens */}
      <div className="sm:hidden">
        <Container className="b-28 pt-20 sm:py-32">
          <div className="max-w-2xl md:mx-auto md:text-center xl:max-w-none">
            <h2 className="font-display pt-20 text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-7xl">
              Reclaim your free time.
            </h2>
            <p className="mt-6 text-lg tracking-tight text-blue-100">
              Deep understanding of your target market with AI-Powered Personas.
            </p>
            <p className="mb-5 mt-6 text-lg tracking-tight text-blue-100">
              Our current products
            </p>
            <iframe
              className="inset-0 z-10 h-96 w-[100%] rounded-lg"
              src="https://www.youtube.com/embed/_3dSBfrRtSY?si=Peb3qppeidUN64EM"
              title="Instant Personas - AI Powered Personas"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            />
          </div>
        </Container>
      </div>
    </motion.section>
  );
}
