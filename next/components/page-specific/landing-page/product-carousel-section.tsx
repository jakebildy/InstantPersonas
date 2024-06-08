import { Container } from "@/components/page-specific/landing-page/container";
import { AnimatedTooltip } from "@/components/ui/aceternity/animated_tooltip";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { AuroraBackground } from "@/components/ui/aceternity/aurora_background";

export default function ProductCarouselSection() {
  const people = [
    {
      id: 1,
      name: "Marcus (Persona)",
      designation: "Software Engineer",
      image: "/unsplash-headshots/male-1.avif",
    },
    {
      id: 2,
      name: "Joe (Persona)",
      designation: "Product Manager",
      image: "/unsplash-headshots/male-2.avif",
    },
    {
      id: 3,
      name: "Jane (Persona)",
      designation: "TikTok Influencer",
      image: "/unsplash-headshots/female-1.avif",
    },
    {
      id: 4,
      name: "Emily (Persona)",
      designation: "UX Designer",
      image: "/unsplash-headshots/female-2.avif",
    },
    {
      id: 5,
      name: "Tyler (Persona)",
      designation: "Kombucha Brewer",
      image: "/unsplash-headshots/male-3.avif",
    },
    {
      id: 6,
      name: "Dora (Persona)",
      designation: "The Explorer",
      image: "/unsplash-headshots/female-3.avif",
    },
  ];

  return (
    <section id="get-started-today" className="relative">
      <AuroraBackground className="bg-black py-32">
        <Container className="relative mb-[100px] mt-[100px]">
          <div className="mx-auto max-w-5xl text-center">
            {/* carousel */}
            <h2 className="font-display mb-10 pt-20 text-5xl font-bold tracking-tight text-white">
              Extremely insightful personas without a billion customer surveys.
            </h2>
            <Carousel>
              <CarouselPrevious />

              <CarouselContent>
                <CarouselItem>
                  <img
                    src="https://i.imgur.com/e3lG3KA.png"
                    className="rounded-md"
                  />
                </CarouselItem>
                <CarouselItem>
                  <img
                    src="https://i.imgur.com/jqY3HkW.png"
                    className="rounded-md"
                  />
                </CarouselItem>
                <CarouselItem>
                  <img
                    src="https://i.imgur.com/7Tgdew7.png"
                    className="rounded-md"
                  />
                </CarouselItem>
                <CarouselItem>
                  <img
                    src="https://i.imgur.com/6FrBooa.png"
                    className="rounded-md"
                  />
                </CarouselItem>
                <CarouselItem>
                  <img
                    src="https://i.imgur.com/Lp0Z0Tu.png"
                    className="rounded-md"
                  />
                </CarouselItem>
              </CarouselContent>
              <CarouselNext />
            </Carousel>
            <h2 className="font-display pt-10 text-xl tracking-tight text-white">
              Easily download and share your personas.
            </h2>
          </div>
        </Container>
      </AuroraBackground>
    </section>
  );
}
