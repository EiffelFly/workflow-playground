import { NodeData } from "@/stores/workflow";
import { memo } from "react";
import { Handle, NodeProps, Position } from "reactflow";
import { ResourceIcon } from "./ResourceIcon";

export const CustomNode = memo(({ data }: NodeProps<NodeData>) => {
  return (
    <div className="px-4 py-2 rounded-[1px] bg-white border border-black">
      <div className="flex flex-col gap-y-1">
        <div className="flex flex-row gap-x-2">
          <ResourceIcon
            type={data.type}
            width="w-4"
            height="h-4"
            position="m-auto"
            color="fill-black"
          />
          <p className="flex my-auto font-sans text-[10px] font-medium text-black">
            {data.type}
          </p>
        </div>
        <h3 className="text-black text-sm font-sans font-semibold">
          {data.title}
        </h3>
      </div>
      <Handle
        type="target"
        position={Position.Left}
        className="!w-[1px] !h-2 !min-w-0 !min-h-0 !border-0 !rounded-none"
      />
      <Handle
        type="source"
        position={Position.Right}
        className="!w-[1px] !h-2 !min-w-0 !min-h-0 !border-0 !rounded-none"
      />
    </div>
  );
});

CustomNode.displayName = "CustomNode";
