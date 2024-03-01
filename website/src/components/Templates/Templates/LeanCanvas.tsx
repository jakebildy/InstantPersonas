import {
  IconBulbFilled,
  IconAlertTriangleFilled,
  IconChartBar,
  IconGift,
  IconSnowflake,
  IconBuildingBroadcastTower,
  IconUsers,
  IconTag,
  IconCurrencyDollar,
} from "@tabler/icons-react";
import { useEffect, useState } from "react";
import { useBusiness } from "../../../contexts/BusinessContext";

export default function LeanCanvas({ setChanges }: { setChanges: any }) {
  const { selectedBusiness } = useBusiness();

  const [problem, setProblem] = useState(
    selectedBusiness?.leanCanvas?.problem || ""
  );
  const [solution, setSolution] = useState(
    selectedBusiness?.leanCanvas?.solution || ""
  );
  const [keyMetrics, setKeyMetrics] = useState(
    selectedBusiness?.leanCanvas?.keyMetrics || ""
  );
  const [uniqueValueProposition, setUniqueValueProposition] = useState(
    selectedBusiness?.leanCanvas?.uniqueValueProposition || ""
  );
  const [unfairAdvantage, setUnfairAdvantage] = useState(
    selectedBusiness?.leanCanvas?.unfairAdvantage || ""
  );
  const [customerSegments, setCustomerSegments] = useState(
    selectedBusiness?.leanCanvas?.customerSegments || ""
  );
  const [channels, setChannels] = useState(
    selectedBusiness?.leanCanvas?.channels || ""
  );
  const [costStructure, setCostStructure] = useState(
    selectedBusiness?.leanCanvas?.costStructure || ""
  );
  const [revenueStreams, setRevenueStreams] = useState(
    selectedBusiness?.leanCanvas?.revenueStreams || ""
  );

  // When something changes, update the business object.
  useEffect(() => {
    if (selectedBusiness) {
      selectedBusiness.leanCanvas = {
        problem,
        solution,
        keyMetrics,
        uniqueValueProposition,
        unfairAdvantage,
        customerSegments,
        channels,
        costStructure,
        revenueStreams,
      };
      setChanges(true);
      console.log("🔥🔥🔥🔥🔥Lean canvas updated");
    }
  }, [
    problem,
    solution,
    keyMetrics,
    uniqueValueProposition,
    unfairAdvantage,
    customerSegments,
    channels,
    costStructure,
    revenueStreams,
  ]);

  return (
    <div className="w-full max-w-full flex flex-wrap justify-center overflow-x-auto min-w-[1350px]">
      <div className="grid grid-cols-5  gap-0 mt-4 w-[1260px]">
        <div
          className=" w-60 p-4 text-white text-center"
          style={{
            backgroundColor: "#C70D3A",
            borderRadius: "30px",
          }}
        >
          <IconAlertTriangleFilled className="mx-auto" />
          <h3>
            <span className="text-2xl font-bold">Problem</span>
          </h3>
          <textarea
            style={{ height: "380px" }}
            value={problem}
            onChange={(e) => {
              setProblem(e.target.value);
            }}
            className="w-full p-2 mt-4 border-none rounded-lg focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent bg-transparent hover:border-none  resize-none scrollbar-hidden"
          ></textarea>
        </div>

        <div className="grid grid-cols-1 gap-3">
          <div
            className="h-70 w-60 p-4 text-white text-center "
            style={{
              backgroundColor: "#F45905",
              borderRadius: "30px",
            }}
          >
            <IconBulbFilled className="mx-auto" />
            <h3>
              <span className="text-2xl font-bold">Solution</span>
            </h3>
            <textarea
              style={{ height: "130px" }}
              value={solution}
              onChange={(e) => {
                setSolution(e.target.value);
              }}
              className="w-full p-2 mt-4 border-none rounded-lg focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent bg-transparent hover:border-none  resize-none scrollbar-hidden"
            ></textarea>
          </div>

          <div
            className="h-70 w-60 p-4 text-white text-center "
            style={{
              backgroundColor: "#512C62",
              borderRadius: "30px",
            }}
          >
            <IconChartBar className="mx-auto" />
            <h3>
              <span className="text-2xl font-bold">Key Metrics</span>
            </h3>
            <textarea
              style={{ height: "130px" }}
              value={keyMetrics}
              onChange={(e) => {
                setKeyMetrics(e.target.value);
              }}
              className="w-full p-2 mt-4 border-none rounded-lg focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent bg-transparent hover:border-none  resize-none scrollbar-hidden"
            ></textarea>
          </div>
        </div>

        <div
          className="w-60 p-4 text-white text-center "
          style={{
            backgroundColor: "#9800BF",
            borderRadius: "20px",
          }}
        >
          <IconGift className="mx-auto" />
          <h3>
            <span className="text-2xl font-bold">Unique Value Proposition</span>
          </h3>
          <textarea
            style={{ height: "380px" }}
            value={uniqueValueProposition}
            onChange={(e) => {
              setUniqueValueProposition(e.target.value);
            }}
            className="w-full p-2 mt-4 border-none rounded-lg focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent bg-transparent hover:border-none  resize-none scrollbar-hidden"
          ></textarea>
        </div>

        <div className="grid grid-cols-1  gap-3">
          <div
            className="h-70 w-60 p-4 text-white text-center "
            style={{
              backgroundColor: "#E34A6F",
              borderRadius: "20px",
            }}
          >
            <IconSnowflake className="mx-auto" />
            <h3>
              <span className="text-2xl font-bold">Unfair Advantage</span>
            </h3>
            <textarea
              style={{ height: "130px" }}
              value={unfairAdvantage}
              onChange={(e) => {
                setUnfairAdvantage(e.target.value);
              }}
              className="w-full p-2 mt-4 border-none rounded-lg focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent bg-transparent hover:border-none  resize-none scrollbar-hidden"
            ></textarea>
          </div>

          <div
            className="p-4 h-70 w-60 text-white text-center"
            style={{
              backgroundColor: "#9E4784",
              borderRadius: "20px",
            }}
          >
            <IconBuildingBroadcastTower className="mx-auto" />
            <h3>
              <span className="text-2xl font-bold">Channels</span>
            </h3>
            <textarea
              style={{ height: "130px" }}
              value={channels}
              onChange={(e) => {
                setChannels(e.target.value);
              }}
              className="w-full p-2 mt-4 border-none rounded-lg focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent bg-transparent hover:border-none  resize-none scrollbar-hidden"
            ></textarea>
          </div>
        </div>

        <div
          className=" p-4 text-white text-center "
          style={{
            backgroundColor: "#37306B",
            borderRadius: "20px",
          }}
        >
          <IconUsers className="mx-auto" />
          <h3>
            <span className="text-2xl font-bold">Customer Segments</span>
          </h3>
          <textarea
            style={{ height: "380px" }}
            value={customerSegments}
            onChange={(e) => {
              setCustomerSegments(e.target.value);
            }}
            className="w-full p-2 mt-4 border-none rounded-lg focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent bg-transparent hover:border-none  resize-none scrollbar-hidden"
          ></textarea>
        </div>
      </div>

      <div className="grid grid-cols-2  gap-3 mt-4 w-[1260px]">
        <div
          className="h-60 p-4 text-white text-center "
          style={{
            backgroundColor: "#28464B",
            borderRadius: "20px",
          }}
        >
          <IconTag className="mx-auto" />
          <h3>
            <span className="text-2xl font-bold">Cost Structure</span>
          </h3>
          <textarea
            style={{ height: "130px" }}
            value={costStructure}
            onChange={(e) => {
              setCostStructure(e.target.value);
            }}
            className="w-full p-2 mt-4 border-none rounded-lg focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent bg-transparent hover:border-none  resize-none scrollbar-hidden"
          ></textarea>
        </div>

        <div
          className="h-60 p-4 text-white text-center "
          style={{
            backgroundColor: "#326771",
            borderRadius: "20px",
          }}
        >
          <IconCurrencyDollar className="mx-auto" />
          <h3>
            <span className="text-2xl font-bold">Revenue Streams</span>
          </h3>
          <textarea
            style={{ height: "130px" }}
            value={revenueStreams}
            onChange={(e) => {
              setRevenueStreams(e.target.value);
            }}
            className="w-full p-2 mt-4 border-none rounded-lg focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent bg-transparent hover:border-none  resize-none scrollbar-hidden"
          ></textarea>
        </div>
      </div>
    </div>
  );
}
