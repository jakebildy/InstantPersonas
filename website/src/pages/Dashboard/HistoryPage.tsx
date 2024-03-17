import Sidebar from "../../components/Sidebar";
import api, { PersonaHistory } from "../../services/api.service";
import createFirstBusiness from "../../images/ProjectAnalysis.gif";
import { useEffect, useState } from "react";

export default function HistoryPage() {
  const [personas, setPersonas] = useState<PersonaHistory[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await api.userPersona.getPersonaHistory();
      if (!data) return;
      setPersonas(data);
      console.log(data);
    };
    fetchData();
  }, []);

  return (
    <>
      <Sidebar currentSelectedPage="History">
        <h1 className=" text-3xl  text-gray-700 text-center mt-10  font-bold">
          History
        </h1>
        <div className="mt-10">
          {personas.length > 0 ? (
            <div className="flex flex-col gap-2 px-2">
              {personas
                .slice(0)
                .reverse()
                .map((persona) => (
                  <PersonaCard {...persona} key={persona._id} />
                ))}
            </div>
          ) : (
            <div className="text-center">
              <img
                src={createFirstBusiness}
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

function PersonaCard({ persona, _id }: PersonaHistory) {
  // Grab Occupation or Location, or the first descriptor, or fallback to empty string
  const relevantPersonaInfo = persona.shortDescriptors
    .filter((s) => ["Occupation", "Location"].includes(s.label))
    .at(-1) ??
    persona.shortDescriptors.at(0) ?? { description: "" };

  return (
    <div
      className={
        "flex items-center gap-2 group cursor-pointer hover:animate-pulse hover:py-4 transition-all duration-500"
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
        {persona.name} - {relevantPersonaInfo.description}
      </p>
    </div>
  );
}
