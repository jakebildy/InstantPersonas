// hello world

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
