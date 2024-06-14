import { Container } from "@/components/page-specific/landing-page/container";
import { AnimatedTooltip } from "@/components/ui/aceternity/animated_tooltip";
import Link from "next/link";

export default function CallToActionSection() {
  const people = [
    {
      id: 1,
      name: "Marcus (Persona)",
      designation: "Software Engineer",
      image:
        "https://api.dicebear.com/8.x/notionists/svg?glassesProbability=100&glasses=variant08&body=variant21&hair=variant13&backgroundColor=d9cbfc",
      href: "/",
    },
    {
      id: 2,
      name: "Joe (Persona)",
      designation: "Product Manager",
      image:
        "https://api.dicebear.com/8.x/notionists/svg?glassesProbability=100&glasses=variant11&body=variant23&hair=variant60&backgroundColor=eaa9c1",
      href: "/",
    },
    {
      id: 3,
      name: "Jane (Persona)",
      designation: "TikTok Influencer",
      image:
        "https://api.dicebear.com/8.x/notionists/svg?body=variant07&hair=variant39&backgroundColor=fbe8b1",
      href: "/",
    },
    {
      id: 4,
      name: "Emily (Persona)",
      designation: "UX Designer",
      image:
        "https://api.dicebear.com/8.x/notionists/svg?glassesProbability=100&glasses=variant11&body=variant14&hair=variant46&backgroundColor=e6d3d0",
      href: "/",
    },
    {
      id: 6,
      name: "Dora (Persona)",
      designation: "The Explorer",
      image:
        "https://api.dicebear.com/8.x/notionists/svg?body=variant23&hair=variant28&backgroundColor=fbe8b1",
      href: "/",
    },
    {
      id: 5,
      name: "Tyler (Persona)",
      designation: "Kombucha Brewer",
      image:
        "https://api.dicebear.com/8.x/notionists/svg?body=variant21&hair=variant13&backgroundColor=e6d3d0",
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

          <p className="mb-10 mt-4 text-lg tracking-tight text-black">
            How many hours does it cost you to create content that doesn&apos;t
            convert because you don&apos;t understand your audience? <br></br>
            <br></br>
            <br></br>
            <p className="mt-4 text-lg tracking-tight text-black">
              <b>{`It's time to take back your time.`}</b>
            </p>
          </p>

          <Link
            href="/register"
            className="rounded-full bg-green-500 p-4 px-8 font-jost text-lg font-semibold text-white transition duration-200 hover:shadow-xl focus:ring-2 focus:ring-green-400"
          >
            Get 3 days FREE →
          </Link>
        </div>
      </Container>
    </section>
  );
}
