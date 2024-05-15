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
    data: { value: 123 },
  },
  {
    id: "node-2",
    type: "topicalLink",
    position: { x: 0, y: 0 },
    data: { value: 123 },
  },
  {
    id: "node-3",
    type: "topicalLink",
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
          variant={BackgroundVariant.Dots}
          className="bg-blue-200"
          gap={12}
          size={1}
        />
      </ReactFlow>
      {/* </AuroraBackground> */}
    </div>
  );
}
