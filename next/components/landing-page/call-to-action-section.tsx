import { Container } from "@/components/container";
import { AnimatedTooltip } from "../aceternity-ui/animated_tooltip";

export default function CallToActionSection() {
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
    <section id="get-started-today" className="relative bg-white py-32">
      <Container className="relative mt-[100px]">
        <div className="mx-auto max-w-lg text-center">
          <div className="flex flex-row items-center justify-center mb-10 w-full">
            <AnimatedTooltip items={people} />
          </div>
          <h2 className="font-display text-3xl tracking-tight text-black sm:text-6xl font-bold">
            Get started today
          </h2>
          <p className="mt-4 text-lg tracking-tight text-black">
            <b>{`It's time to take back your time.`}</b>
          </p>
          <p className="mt-4 text-lg tracking-tight text-black mb-10">
            Save hours by generating in-depth personas effortlessly with
            InstantPersonas.
          </p>
          <button className="px-8 py-2 rounded-full bg-gradient-to-b from-green-500 to-green-600 text-white focus:ring-2 focus:ring-green-400 hover:shadow-xl transition duration-200">
            Get 3 days FREE
          </button>
        </div>
      </Container>
    </section>
  );
}
