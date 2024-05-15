import { useCallback } from "react";
import { Handle, Position } from "reactflow";

const handleStyle = { left: 10 };

function TopicalLinkNode({ data, isConnectable }: any) {
  const onChange = useCallback((evt: any) => {
    console.log(evt.target.value);
  }, []);

  return (
    <div className="rounded-md shadow-lg">
      <div className="bg-gray-200 h-[20px] flex flex-row  space-x-1 rounded-t-sm">
        {/* three circles in a row, red yellow and green like the window of a mac */}
        <div className="w-[10px] h-[10px] ml-2 mt-1 rounded-full bg-red-500"></div>
        <div className="w-[10px] h-[10px] mt-1 rounded-full bg-yellow-400"></div>
        <div className="w-[10px] h-[10px] mt-1 rounded-full bg-green-500"></div>
      </div>
      <div className=" bg-white w-[200px] rounded-b-sm">
        <Handle
          type="target"
          position={Position.Top}
          isConnectable={isConnectable}
        />
        <div className="p-1 text-center">
          <b>Everything you Need to Know About Backlinks (2024)</b>
          <div className="p-4 bg-green-200 text-black mt-5 text-sm rounded-sm">
            Quickly learn how to build and measure topical authority with our
            comprehensive guide.
          </div>
        </div>
        <Handle
          type="source"
          position={Position.Bottom}
          id="a"
          style={handleStyle}
          isConnectable={isConnectable}
        />
        <Handle
          type="source"
          position={Position.Bottom}
          id="b"
          isConnectable={isConnectable}
        />
      </div>
    </div>
  );
}

export default TopicalLinkNode;
