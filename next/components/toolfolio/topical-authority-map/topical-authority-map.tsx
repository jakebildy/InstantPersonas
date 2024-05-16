"use client";
import ReactFlow, {
  Background,
  BackgroundVariant,
  MarkerType,
} from "reactflow";

import "reactflow/dist/style.css";
import TopicalLinkNode from "./topical-link-node";

const initialNodes = [
  {
    id: "node-1",
    type: "topicalLink",
    position: { x: 0, y: 400 },
    data: { title: "Topical Authority" },
  },
  {
    id: "node-2",
    type: "topicalLink",
    position: { x: 0, y: 0 },
    data: { title: "SEO" },
  },
  {
    id: "node-3",
    type: "topicalLink",
    position: { x: 300, y: 400 },
    data: { title: "Customer Journey" },
  },
];
const initialEdges = [
  {
    id: "e1-2",
    source: "node-2",
    target: "node-1",
    type: "smoothstep",
    style: {
      strokeWidth: 3,
      stroke: "#FF0072",
    },
  },
  {
    id: "e2-3",
    source: "node-2",
    target: "node-3",
    type: "smoothstep",
    style: {
      strokeWidth: 3,
      stroke: "#FF0072",
    },
  },
];

const nodeTypes = { topicalLink: TopicalLinkNode };

export function TopicalAuthorityMap() {
  return (
    <div className="mb-10">
      <div
        style={{ width: "80vw", height: "80vh" }}
        className=" borderborder-gray-300"
      >
        <ReactFlow
          nodes={initialNodes}
          edges={initialEdges}
          nodeTypes={nodeTypes}
        >
          <Background
            variant={BackgroundVariant.Cross}
            className="bg-white"
            gap={12}
            size={1}
          />
        </ReactFlow>
      </div>
      <div className="mt-24 m-10 overflow-hidden">
        <table className="font-inter w-full table-auto border-separate border-spacing-y-1 overflow-scroll text-left md:overflow-auto">
          <thead className="w-full rounded-lg bg-[#222E3A]/[6%] text-base font-semibold text-white">
            <tr className="">
              <th className="whitespace-nowrap rounded-l-lg py-3 pl-3 text-sm font-normal text-[#212B36]">
                Unique Topic
              </th>
              <th className="whitespace-nowrap py-3 pl-1 text-sm font-normal text-[#212B36]">
                Sub-Topic
              </th>
              <th className="whitespace-nowrap py-3 text-sm font-normal text-[#212B36]">
                Blog Title
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className="cursor-pointer bg-[#f6f8fa] drop-shadow-[0_0_10px_rgba(34,46,58,0.02)] hover:shadow-2xl">
              <td
                className="px-1 py-4 text-sm font-normal text-[#7e7ef8]"
                // style="color:#DD6107"
              >
                Customer Journey Mapping
              </td>
              <td className="px-1 py-4 text-sm font-normal text-[#637381]">
                Key Stages in the Customer Journey
              </td>
              <td className="px-1 py-4 text-sm font-normal text-[#637381]">
                Critical Stages: Your Guide to the Customer Journey!
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
