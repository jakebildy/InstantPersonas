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
    data: { title: "SEO" },
  },
  {
    id: "node-2",
    type: "topicalLink",
    position: { x: 0, y: 0 },
    data: { title: "Topical Authority" },
  },
  {
    id: "node-3",
    type: "topicalLink",
    position: { x: 300, y: 400 },
    data: { title: "Backlinks" },
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
          variant={BackgroundVariant.Cross}
          className="bg-white"
          gap={12}
          size={1}
        />
      </ReactFlow>
      {/* </AuroraBackground> */}
    </div>
  );
}
