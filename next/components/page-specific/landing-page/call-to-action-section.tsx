import { Container } from "@/components/page-specific/landing-page/container";
import { AnimatedTooltip } from "@/components/ui/aceternity/animated_tooltip";

export default function CallToActionSection() {
  const people = [
    {
      id: 1,
      name: "Marcus (Persona)",
      designation: "Software Engineer",
      image: "https://api.dicebear.com/8.x/notionists/svg?glassesProbability=100&glasses=variant08&body=variant21&hair=variant13&backgroundColor=d9cbfc",
      href: "/",
    },
    {
      id: 2,
      name: "Joe (Persona)",
      designation: "Product Manager",
      image: "https://api.dicebear.com/8.x/notionists/svg?glassesProbability=100&glasses=variant11&body=variant23&hair=variant60&backgroundColor=eaa9c1",
      href: "/",
    },
    {
      id: 3,
      name: "Jane (Persona)",
      designation: "TikTok Influencer",
      image: "https://api.dicebear.com/8.x/notionists/svg?body=variant07&hair=variant39&backgroundColor=fbe8b1",
      href: "/",
    },
    {
      id: 4,
      name: "Emily (Persona)",
      designation: "UX Designer",
      image: "https://api.dicebear.com/8.x/notionists/svg?glassesProbability=100&glasses=variant11&body=variant14&hair=variant46&backgroundColor=e6d3d0",
      href: "/",
    },
    {
      id: 6,
      name: "Dora (Persona)",
      designation: "The Explorer",
      image: "https://api.dicebear.com/8.x/notionists/svg?body=variant23&hair=variant28&backgroundColor=fbe8b1",
      href: "/",
    },
    {
      id: 5,
      name: "Tyler (Persona)",
      designation: "Kombucha Brewer",
      image: "https://api.dicebear.com/8.x/notionists/svg?body=variant21&hair=variant13&backgroundColor=e6d3d0",
      href: "/",
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
         
          <p className="mt-4 text-lg tracking-tight text-black mb-10">

            How many hours does it cost you to create content that doesn't convert because you don't understand your audience? <br></br>
       
            <br></br><br></br>
            <p className="mt-4 text-lg tracking-tight text-black">
            <b>{`It's time to take back your time.`}</b>
          </p>
          </p>
          <button
            onClick={() => {
              window.location.href = "/register";
            }}
            className="px-8 p-2 rounded-full font-semibold bg-green-500 text-white font-jost focus:ring-2 focus:ring-green-400 hover:shadow-xl transition duration-200"
          >
            Get 3 days FREE →
          </button>
        </div>
      </Container>
    </section>
  );
}
