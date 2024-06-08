import { Container } from "@/components/page-specific/landing-page/container";
import { AnimatedTooltip } from "@/components/ui/aceternity/animated_tooltip";

export default function CallToActionSection() {
  const people = [
    {
      id: 1,
      name: "Marcus (Persona)",
      designation: "Software Engineer",
      image: "/unsplash-headshots/male-1.avif",
      href: "/",
    },
    {
      id: 2,
      name: "Joe (Persona)",
      designation: "Product Manager",
      image: "/unsplash-headshots/male-2.avif",
      href: "/",
    },
    {
      id: 3,
      name: "Jane (Persona)",
      designation: "TikTok Influencer",
      image: "/unsplash-headshots/female-1.avif",
      href: "/",
    },
    {
      id: 4,
      name: "Emily (Persona)",
      designation: "UX Designer",
      image: "/unsplash-headshots/female-2.avif",
      href: "/",
    },
    {
      id: 5,
      name: "Tyler (Persona)",
      designation: "Kombucha Brewer",
      image: "/unsplash-headshots/male-3.avif",
      href: "/",
    },
    {
      id: 6,
      name: "Dora (Persona)",
      designation: "The Explorer",
      image: "/unsplash-headshots/female-3.avif",
      href: "/",
    },
  ];

  return (
    <section id="get-started-today" className="relative bg-white py-32">
      <Container className="relative mt-[100px]">
        <div className="mx-auto max-w-lg text-center">
          <div className="mb-10 flex w-full flex-row items-center justify-center">
            <AnimatedTooltip items={people} />
          </div>
          <h2 className="font-display text-3xl font-bold tracking-tight text-black sm:text-6xl">
            Get started today
          </h2>
          <p className="mt-4 text-lg tracking-tight text-black">
            <b>{`It's time to take back your time.`}</b>
          </p>
          <p className="mb-10 mt-4 text-lg tracking-tight text-black">
            Save hours by generating in-depth personas effortlessly with
            InstantPersonas.
          </p>
          <button className="rounded-full bg-gradient-to-b from-green-500 to-green-600 px-8 py-2 text-white transition duration-200 hover:shadow-xl focus:ring-2 focus:ring-green-400">
            Get 3 days FREE
          </button>
        </div>
      </Container>
    </section>
  );
}
