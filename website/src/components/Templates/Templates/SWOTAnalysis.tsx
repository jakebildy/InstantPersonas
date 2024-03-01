import {
  IconBarbell,
  IconTrendingDown,
  IconBulbFilled,
  IconAlertTriangleFilled,
} from "@tabler/icons-react";
import { useEffect, useState } from "react";
import { useBusiness } from "../../../contexts/BusinessContext";

export default function SWOTAnalysis({ setChanges }: { setChanges: Function }) {
  const { selectedBusiness } = useBusiness();

  const [strengths, setStrengths] = useState(
    selectedBusiness?.swotAnalysis?.strengths || ""
  );
  const [weaknesses, setWeaknesses] = useState(
    selectedBusiness?.swotAnalysis?.weaknesses || ""
  );
  const [opportunities, setOpportunities] = useState(
    selectedBusiness?.swotAnalysis?.opportunities || ""
  );
  const [threats, setThreats] = useState(
    selectedBusiness?.swotAnalysis?.threats || ""
  );

  // When something changes, update the business object.
  useEffect(() => {
    if (selectedBusiness) {
      selectedBusiness.swotAnalysis = {
        strengths,
        weaknesses,
        opportunities,
        threats,
      };
      setChanges(true);
      console.log("🔥🔥🔥🔥🔥SWOT Analysis updated");
    }
  }, [strengths, weaknesses, opportunities, threats]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
      {["Strengths", "Weaknesses", "Opportunities", "Threats"].map(
        (section) => (
          <div
            style={{
              backgroundColor:
                section === "Strengths"
                  ? "#4C3A51"
                  : section === "Weaknesses"
                  ? "#774360"
                  : section === "Opportunities"
                  ? "#B25068"
                  : "#d9a83e",
            }}
            className="rounded-lg p-4 text-white text-center flex-grow"
          >
            <h2>
              <span className="text-6xl font-bold">{section.charAt(0)}</span>
            </h2>

            <h3 className="mb-4">
              <span className="text-1xl font-bold">{section}</span>

              <div className="flex justify-center">
                {section === "Strengths" ? (
                  <IconBarbell />
                ) : section === "Weaknesses" ? (
                  <IconTrendingDown />
                ) : section === "Opportunities" ? (
                  <IconBulbFilled />
                ) : (
                  <IconAlertTriangleFilled />
                )}
              </div>
            </h3>

            <textarea
              style={{ height: "380px" }}
              value={
                section === "Strengths"
                  ? strengths
                  : section === "Weaknesses"
                  ? weaknesses
                  : section === "Opportunities"
                  ? opportunities
                  : threats
              }
              onChange={(e) => {
                if (section === "Strengths") {
                  setStrengths(e.target.value);
                } else if (section === "Weaknesses") {
                  setWeaknesses(e.target.value);
                } else if (section === "Opportunities") {
                  setOpportunities(e.target.value);
                } else {
                  setThreats(e.target.value);
                }
              }}
              className="w-full p-2 border-none rounded-lg focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent bg-transparent hover:border-none  resize-none scrollbar-hidden"
            ></textarea>
          </div>
        )
      )}
    </div>
  );
}
