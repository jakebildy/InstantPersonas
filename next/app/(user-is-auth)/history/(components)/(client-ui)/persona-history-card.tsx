import { PersonaWithID } from "@/app/(server)/models/persona_with_id.model";
import Image from "next/image";
import Link from "next/link";

export function PersonaHistoryCard({ persona, id }: PersonaWithID) {
  // Grab Occupation or Location, or the first descriptor, or fallback to empty string
  if (!persona) return null;

  return (
    <Link
      className={
        "group ml-5 flex cursor-pointer items-center gap-2 transition-all duration-500 hover:animate-pulse hover:py-4"
      }
      href={"/persona/" + id}
    >
      <div className="flex h-16 w-16 items-center justify-center">
        <Image
          src={persona.pictureURL ?? "/instant_personas_logo.png"}
          alt={"Instant Personas Logo"}
          height={64}
          width={64}
          className={
            "rounded-full object-contain transition-all group-hover:opacity-90 group-hover:shadow-lg"
          }
        />
      </div>
      <div className="flex w-full items-center whitespace-pre-wrap rounded-lg bg-gray-200 p-2 px-4 text-sm font-semibold transition-all group-hover:bg-gray-400 group-hover:shadow-lg">
        <div>
          {persona.archetype_name}
          <br></br>
          <span className="text-ellipsis font-normal text-slate-700">
            Goal: {persona.persona_components.End_Goal}
          </span>
        </div>
      </div>

      <div className="w-[30px]" />
    </Link>
  );
}
