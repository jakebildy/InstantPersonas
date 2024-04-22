import { PersonaWithID } from "@/app/(server)/models/persona_with_id.model";
import api, { PersonaHistory } from "@/service/api.service";
import { TrashIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export function PersonaHistoryCard({ persona, id }: PersonaWithID) {
  // Grab Occupation or Location, or the first descriptor, or fallback to empty string
  if (!persona) return null;

  return (
    <Link
      className={
        "ml-5 flex items-center gap-2 group cursor-pointer hover:animate-pulse hover:py-4 transition-all duration-500"
      }
      href={"/persona/" + id}
    >
      <div className="flex items-center justify-center h-16 w-16">
        <Image
          src={persona.pictureURL ?? "/instant_personas_logo.png"}
          alt={"Instant Personas Logo"}
          height={64}
          width={64}
          className={
            "object-contain rounded-full group-hover:shadow-lg  group-hover:opacity-90   transition-all"
          }
        />
      </div>
      <div className="flex items-center bg-gray-200 p-2 px-4 rounded-lg text-sm font-semibold whitespace-pre-wrap  w-full group-hover:bg-gray-400 group-hover:shadow-lg transition-all ">
        <div>
          {persona.archetype_name}
          <br></br>
          <span className="text-slate-700 font-normal text-ellipsis">
            Goal: {persona.persona_components.End_Goal}
          </span>
        </div>
      </div>

      <div className="w-[30px]" />
      {/* <TrashIcon
        onClick={(event: { stopPropagation: () => void }) => {
          event.stopPropagation();
          api.userPersona.deletePersona(id); //TODO: should this delete all the personas for this product?
          window.location.reload();
        }}
        className="h-5 text-transparent ml-5 mr-5 group-hover:text-slate-600"
      /> */}
    </Link>
  );
}
