import Sidebar from "../../components/Sidebar";
import api, { PersonaHistory } from "../../services/api.service";
import createFirstBusiness from "../../images/history.gif";
import { useEffect, useState } from "react";
import { AnimatedTooltip } from "@/components/ui/animated_tooltip";
import { TrashIcon } from "@heroicons/react/20/solid";
import { Skeleton } from "@/components/ui/skeleton";
import { AnimatePresence, motion } from "framer-motion";

export default function HistoryPage() {
  const [personas, setPersonas] = useState<PersonaHistory[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const data = await api.userPersona.getPersonaHistory();
      if (!data) {
        setLoading(false);
        return;
      }
      setPersonas(data);
      setLoading(false);
      console.log(data);
    };
    fetchData();
  }, []);

  return (
    <>
      <Sidebar currentSelectedPage="History">
        <div>
          <h1 className="text-3xl text-gray-700 text-center pt-10 font-bold">
            {personas.length > 0 || loading ? "Recent Personas" : "History"}
          </h1>
          {loading ? (
            <div className="flex flex-row items-center justify-center mt-20 w-full">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((index) => (
                <Skeleton
                  className="bg-gray-300 rounded-full -mr-4 h-14 w-14 border-2 group-hover:scale-105 group-hover:z-30 border-white"
                  key={index}
                />
              ))}
            </div>
          ) : personas.length > 0 ? (
            <div className="flex flex-row items-center justify-center mt-20 w-full">
              <RecentPersonas personas={personas} />
            </div>
          ) : null}
        </div>

        <div className="mt-10">
          {loading ? (
            <div className="flex flex-col gap-2 px-2">
              {[...Array(9).keys()].map((index) => (
                <div
                  className="ml-5 flex items-center gap-2 group cursor-pointer hover:animate-pulse hover:py-4 transition-all duration-500"
                  key={index}
                >
                  <Skeleton className="bg-gray-300 rounded-full h-8 w-8" />
                  <Skeleton className="bg-gray-300 p-2 px-4 rounded-lg h-14 w-full" />
                  <div className="h-5 w-8 ml-5 mr-5" />
                </div>
              ))}
            </div>
          ) : personas.length > 0 ? (
            <AnimatePresence>
              <div className="flex flex-col gap-2 px-2">
                {personas
                  .filter((persona) => persona.persona !== undefined)
                  .reverse()
                  .map((persona) => (
                    <motion.div
                      key={persona._id}
                      initial={{
                        opacity: 0,
                        y: -50,
                      }}
                      animate={{
                        opacity: 1,
                        y: 0,
                      }}
                      exit={{
                        opacity: 0,
                        y: -50,
                      }}
                      transition={{
                        duration: 0.5,
                        ease: "easeOut",
                      }}
                    >
                      <PersonaCard {...persona} />
                    </motion.div>
                  ))}
              </div>
            </AnimatePresence>
          ) : (
            <div className="text-center">
              <img
                src={createFirstBusiness}
                alt="Create your first persona"
                style={{ height: "300px" }}
                className="mx-auto"
              />
              <p className="text-gray-500 font-bold text-sm w-350 mb-5">
                No history yet. Create your first persona to get started.
              </p>
              <a
                className="text-white py-2 px-3 bg-green-500 rounded font-bold text-sm w-350"
                href="/persona"
              >
                Create my first persona
              </a>
            </div>
          )}
        </div>
      </Sidebar>
    </>
  );
}

function PersonaCard({ persona, messageHistory, _id }: PersonaHistory) {
  // Grab Occupation or Location, or the first descriptor, or fallback to empty string
  const relevantPersonaInfo =
    persona && persona.shortDescriptors && persona.shortDescriptors.length > 0
      ? persona.shortDescriptors
          .filter((s) => ["Occupation", "Location"].includes(s.label))
          .at(-1)?.description ?? persona.shortDescriptors.at(0)?.description
      : "";

  if (!persona) return null;

  return (
    <div
      className={
        "ml-5 flex items-center gap-2 group cursor-pointer hover:animate-pulse hover:py-4 transition-all duration-500"
      }
      onClick={(event) => {
        window.location.href = "/persona/" + _id;
        event.stopPropagation(); // Stop event propagation
      }}
    >
      <div className="flex items-center justify-center h-8 w-8">
        <img
          src={persona.pictureURL ?? "/instant_personas_logo.png"}
          alt={"Instant Personas Logo"}
          className={
            "object-contain rounded-full group-hover:shadow-lg  group-hover:opacity-90   transition-all"
          }
        />
      </div>
      <p className="flex items-center bg-gray-200 p-2 px-4 rounded-lg text-sm font-semibold whitespace-pre-wrap  w-full group-hover:bg-gray-400 group-hover:shadow-lg transition-all ">
        <div>
          {persona.name} | {relevantPersonaInfo ?? ""}
          <br></br>
          <span className="text-slate-700  font-normal">
            {persona.productDescription
              ? persona.productDescription!
              : messageHistory.length > 1
              ? messageHistory[1].text
              : messageHistory[0].text}
          </span>
        </div>
      </p>

      <TrashIcon
        onClick={(event) => {
          event.stopPropagation();
          api.userPersona.deletePersona(_id);
          window.location.reload();
        }}
        className="h-5 text-transparent ml-5 mr-5 group-hover:text-slate-600"
      />
    </div>
  );
}

function RecentPersonas({ personas }: { personas: PersonaHistory[] }) {
  return (
    <AnimatedTooltip
      onClick={(index) => {
        window.location.href =
          "/persona/" +
          personas
            .slice(0)
            .reverse()
            .slice(0, 10)
            .filter((persona) => persona.persona !== undefined)[index]._id;
      }}
      items={
        personas
          .slice(0)
          .reverse()
          .slice(0, 10)
          .filter((persona) => persona.persona !== undefined)
          .map((history, i) => ({
            id: i,
            name:
              history.persona!.name!.split(" ")[0] +
              " | " +
              (history!.persona &&
              history!.persona!.shortDescriptors &&
              history!.persona!.shortDescriptors.length > 0
                ? history!
                    .persona!.shortDescriptors.filter((s) =>
                      ["Occupation", "Location"].includes(s.label)
                    )
                    .at(-1)?.description ??
                  history!.persona!.shortDescriptors.at(0)?.description
                : ""),
            image: history.persona!.pictureURL!,
            designation:
              history && history.persona && history.persona!.productDescription
                ? history.persona!.productDescription!
                : "",
          })) as {
          id: number;
          name: string;
          designation: string;
          image: string;
        }[]
      }
    />
  );
}
