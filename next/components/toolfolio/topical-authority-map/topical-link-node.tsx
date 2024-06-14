import { useCallback, useState } from "react";
import { Handle, Position } from "reactflow";

function TopicalLinkNode({ data, isConnectable }: any) {
  const [title, setTitle] = useState(data.title);

  const onChange = useCallback((evt: any) => {
    setTitle(evt.target.value);
    console.log(evt.target.value);
  }, []);

  return (
    <div className="h-[90px] rounded-md shadow-lg">
      <div className="flex h-[20px] flex-row space-x-1 rounded-t-sm bg-gray-200">
        {/* three circles in a row, red yellow and green like the window of a mac */}
        <div className="ml-2 mt-1 h-[10px] w-[10px] rounded-full bg-red-500"></div>
        <div className="mt-1 h-[10px] w-[10px] rounded-full bg-yellow-400"></div>
        <div className="mt-1 h-[10px] w-[10px] rounded-full bg-green-500"></div>
      </div>
      <div
        className="w-[200px] rounded-b-sm"
        style={{ backgroundColor: data.color }}
      >
        <Handle
          type="target"
          position={Position.Top}
          isConnectable={isConnectable}
        />
        <div className="p-1 text-center">
          <textarea
            value={title}
            onChange={onChange}
            className="w-full text-center font-bold"
            style={{
              backgroundColor: data.color,
              resize: "none",
              height: "60px",
              overflow: "auto",
            }}
          />
        </div>
        <Handle
          type="source"
          position={Position.Bottom}
          isConnectable={isConnectable}
        />
      </div>
    </div>
  );
}

export default TopicalLinkNode;
