import { useCallback, useState } from "react";
import { Handle, Position } from "reactflow";

function TopicalSubcategoryNode({ data, isConnectable }: any) {
  const [title, setTitle] = useState(data.title);

  const onChange = useCallback((evt: any) => {
    setTitle(evt.target.value);
    console.log(evt.target.value);
  }, []);

  return (
    <div className="rounded-md shadow-lg">
      <div className="bg-gray-200 h-[20px] flex flex-row space-x-1 rounded-t-sm">
        {/* three circles in a row, red yellow and green like the window of a mac */}
        <div className="w-[10px] h-[10px] ml-2 mt-1 rounded-full bg-red-500"></div>
        <div className="w-[10px] h-[10px] mt-1 rounded-full bg-yellow-400"></div>
        <div className="w-[10px] h-[10px] mt-1 rounded-full bg-green-500"></div>
      </div>
      <div className="bg-white w-[200px] rounded-b-sm">
        <Handle
          type="target"
          position={Position.Left}
          isConnectable={isConnectable}
        />
        <div className="p-1 text-center">
          <textarea
            value={title}
            onChange={onChange}
            className="text-center w-full font-bold"
            style={{
              backgroundColor: data.color,
              resize: "none",
              height: "90px",
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

export default TopicalSubcategoryNode;
