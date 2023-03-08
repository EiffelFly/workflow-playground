import { NodeData } from "@/stores/workflow";
import { memo } from "react";
import { Handle, NodeProps, Position } from "reactflow";

export const CustomNode = memo(({ data }: NodeProps<NodeData>) => {
  return (
    <div className="px-4 py-2 rounded-[1px] bg-white border border-black">
      <div className="flex font-sans text-[10px] font-medium text-black">
        {data.type}
      </div>
      <Handle
        type="target"
        position={Position.Right}
        className="!w-[1px] !h-2 !min-w-0 !min-h-0 !border-0 !rounded-none"
      />
      <Handle
        type="source"
        position={Position.Left}
        className="!w-[1px] !h-2 !min-w-0 !min-h-0 !border-0 !rounded-none"
      />
    </div>
  );
});

CustomNode.displayName = "CustomNode";
