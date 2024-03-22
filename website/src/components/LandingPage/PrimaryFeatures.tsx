import { Container } from "../Container";
// import userPersona from "../../images/screenshots/user-persona.png";
import { AuroraBackground } from "../ui/aurora_background";
import { MacbookScroll } from "../ui/macbook_scroll";

export function PrimaryFeatures() {
  // const ref = useRef(null);
  // const isInView = useInView(ref, { once: true });

  return (
    <section
      id="features"
      aria-label="Features for running your books"
      className="relative overflow-hidden bg-black dark h-[200vh] rounded-2xl mx-2"
    >
      {/* if sm, hide */}
      <div className="hidden sm:block">
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
                // src={userPersona}
              ></MacbookScroll>
            </div>
          </Container>
        </AuroraBackground>
      </div>

      {/* if md, hide */}
      <div className="sm:hidden">
        <Container className="b-28 pt-20 sm:py-32">
          <div className="max-w-2xl md:mx-auto md:text-center xl:max-w-none">
            <h2 className="font-display text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-7xl pt-20">
              Reclaim your free time.
            </h2>
            <p className="mt-6 text-lg tracking-tight text-blue-100">
              Deep understanding of your target market with AI-Powered Personas.
            </p>
            <p className="mt-6 text-lg tracking-tight text-blue-100  mb-5">
              Our current products
            </p>
            <iframe
              className="  z-10 h-96 w-[100%] rounded-lg inset-0"
              src="https://www.youtube.com/embed/dQw4w9WgXcQ"
              title="Rick Astley - Never Gonna Give You Up (Official Music Video)"
              // frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              // allowfullscreen
            ></iframe>
          </div>
        </Container>
      </div>
    </section>
  );
}
