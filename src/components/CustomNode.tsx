import { NodeData } from "@/stores/workflow";
import React, { memo } from "react";
import { Handle, NodeProps, Position } from "reactflow";

function CustomNode({ data }: NodeProps<NodeData>) {
  return (
    <div className="px-4 py-2 shadow-md rounded-md bg-white border-2 border-stone-400">
      <div className="flex font-mono text-lg">{data.type}</div>
      <Handle
        type="target"
        position={Position.Top}
        className="w-16 !bg-teal-500"
      />
      <Handle
        type="source"
        position={Position.Bottom}
        className="w-16 !bg-teal-500"
      />
    </div>
  );
}

export default memo(CustomNode);
