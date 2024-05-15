"use client";
import ReactFlow, {
  Background,
  BackgroundVariant,
  MarkerType,
} from "reactflow";

import "reactflow/dist/style.css";
import InternalLinkNode from "../internal-link-node";
import { AuroraBackground } from "@/components/aceternity-ui/aurora_background";

const initialNodes = [
  {
    id: "node-1",
    type: "internalLink",
    position: { x: 0, y: 400 },
    data: { value: 123 },
  },
  {
    id: "node-2",
    type: "internalLink",
    position: { x: 0, y: 0 },
    data: { value: 123 },
  },
  {
    id: "node-3",
    type: "internalLink",
    position: { x: 300, y: 400 },
    data: { value: 123 },
  },
];
const initialEdges = [
  {
    id: "e1-2",
    source: "node-2",
    target: "node-1",
    markerEnd: {
      type: MarkerType.ArrowClosed,
      width: 20,
      height: 20,
      color: "#FF0072",
    },
    style: {
      strokeWidth: 2,
      stroke: "#FF0072",
    },
  },
  {
    id: "e2-3",
    source: "node-2",
    target: "node-3",
    markerEnd: {
      type: MarkerType.ArrowClosed,
      width: 20,
      height: 20,
      color: "#FF0072",
    },
    style: {
      strokeWidth: 2,
      stroke: "#FF0072",
    },
  },
];

const nodeTypes = { internalLink: InternalLinkNode };

export default function SitemapVisualizer() {
  return (
    <section className="bg-white flex flex-col items-center ">
      <title>FREE Sitemap Visualizer - No Signup Required</title>
      <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
        <h2 className=" text-3xl font-bold mb-3 font-jost mt-10">
          Visualize your site
        </h2>
        <h3>
          Enter your website URL to generate a sitemap and visualize your site
          structure. See how your pages are internally linked and how you can
          improve your topical authority.
        </h3>
        <input
          type="text"
          placeholder="Enter your website URL"
          className="w-[400px] p-2 border border-gray-300 rounded-lg"
        />
        <button className="bg-green-500 text-white rounded-lg p-2 ml-2">
          Create Sitemap
        </button>
      </div>
      <div
        style={{ width: "80vw", height: "80vh" }}
        className=" border border-gray-300"
      >
        <ReactFlow
          nodes={initialNodes}
          edges={initialEdges}
          nodeTypes={nodeTypes}
        >
          <Background
            variant={BackgroundVariant.Dots}
            className="bg-blue-200"
            gap={12}
            size={1}
          />
        </ReactFlow>
        {/* </AuroraBackground> */}
      </div>
    </section>
  );
}
