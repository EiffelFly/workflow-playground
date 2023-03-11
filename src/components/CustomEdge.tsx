import cn from "clsx";
import { EdgeData, useWorkflowStore } from "@/stores/workflow";
import { useState } from "react";
import { EdgeProps, getBezierPath } from "reactflow";

export const CustomEdge = ({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  style = {},
  data,
  markerEnd,
}: EdgeProps<EdgeData>) => {
  const [edgePath] = getBezierPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
  });

  const [hovered, setHovered] = useState(false);
  const selectedEdges = useWorkflowStore((state) => state.selectedEdges);

  return (
    <>
      <path
        id={id}
        style={style}
        className={cn(
          "stroke-[1px] fill-none",
          selectedEdges.findIndex((e) => e.id === id) !== -1
            ? "stroke-black"
            : "stroke-gray-400"
        )}
        strokeDasharray={6}
        d={edgePath}
        markerEnd={markerEnd}
      />
      <path
        id={id}
        style={{ ...style, strokeDasharray: 0 }}
        className={cn(
          "stroke-gray-400 stroke-[8px] fill-none",
          hovered ? "opacity-20" : "opacity-0"
        )}
        d={edgePath}
        markerEnd={markerEnd}
      />
      <path
        id={id}
        style={{ ...style, strokeDasharray: 0 }}
        className="stroke-[12px] fill-none stroke-transparent"
        strokeDasharray={0}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        d={edgePath}
        markerEnd={markerEnd}
      />
    </>
  );
};
