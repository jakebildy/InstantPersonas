import {
  IconAlertTriangleFilled,
  IconPodium,
  IconChartHistogram,
  IconUsers,
  IconRobot,
  IconTrees,
  IconGavel,
} from "@tabler/icons-react";
import { useEffect, useState } from "react";
import { useBusiness } from "../../../contexts/BusinessContext";

export default function PESTELAnalysis({
  setChanges,
}: {
  setChanges: Function;
}) {
  const { selectedBusiness } = useBusiness();

  const [political, setPolitical] = useState(
    selectedBusiness?.pestelAnalysis?.political || ""
  );

  const [economic, setEconomic] = useState(
    selectedBusiness?.pestelAnalysis?.economic || ""
  );

  const [social, setSocial] = useState(
    selectedBusiness?.pestelAnalysis?.sociocultural || ""
  );

  const [technological, setTechnological] = useState(
    selectedBusiness?.pestelAnalysis?.technological || ""
  );

  const [environmental, setEnvironmental] = useState(
    selectedBusiness?.pestelAnalysis?.environmental || ""
  );

  const [legal, setLegal] = useState(
    selectedBusiness?.pestelAnalysis?.legal || ""
  );

  // When something changes, update the business object.
  useEffect(() => {
    if (selectedBusiness) {
      selectedBusiness.pestelAnalysis = {
        political,
        economic,
        sociocultural: social,
        technological,
        environmental,
        legal,
      };
      setChanges(true);
      console.log("🔥🔥🔥🔥🔥 PESTEL Analysis updated");
    }
  }, [political, economic, social, technological, environmental, legal]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
      {[
        "Political",
        "Economic",
        "Social",
        "Technological",
        "Environmental",
        "Legal",
      ].map((section) => (
        <div
          style={{
            backgroundColor:
              section === "Political"
                ? "#233d63"
                : section === "Economic"
                ? "#336b8b"
                : section === "Social"
                ? "#ea700b"
                : section === "Technological"
                ? "#423f3f"
                : section === "Environmental"
                ? "#83984d"
                : "#f0b51f",
          }}
          className="rounded-lg p-4 text-white text-center flex-grow"
        >
          <h2>
            <span className="text-6xl font-bold">{section.charAt(0)}</span>
          </h2>

          <h3 className="mb-4">
            <span className="text-1xl font-bold">{section}</span>

            <div className="flex justify-center">
              {section === "Political" ? (
                <IconPodium />
              ) : section === "Economic" ? (
                <IconChartHistogram />
              ) : section === "Social" ? (
                <IconUsers />
              ) : section === "Technological" ? (
                <IconRobot />
              ) : section === "Environmental" ? (
                <IconTrees />
              ) : section === "Legal" ? (
                <IconGavel />
              ) : (
                <IconAlertTriangleFilled />
              )}
            </div>
          </h3>
          <textarea
            style={{ height: "100px" }}
            value={
              section === "Political"
                ? political
                : section === "Economic"
                ? economic
                : section === "Social"
                ? social
                : section === "Technological"
                ? technological
                : section === "Environmental"
                ? environmental
                : legal
            }
            onChange={(e) => {
              if (section === "Political") {
                setPolitical(e.target.value);
              } else if (section === "Economic") {
                setEconomic(e.target.value);
              } else if (section === "Social") {
                setSocial(e.target.value);
              } else if (section === "Technological") {
                setTechnological(e.target.value);
              } else if (section === "Environmental") {
                setEnvironmental(e.target.value);
              } else if (section === "Legal") {
                setLegal(e.target.value);
              }
            }}
            className="w-full p-2 border-none rounded-lg focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent bg-transparent hover:border-none  resize-none scrollbar-hidden"
          ></textarea>
        </div>
      ))}
    </div>
  );
}
