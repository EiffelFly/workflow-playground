# Workflow playground

This is a workflow builder prototype built upon React-flow, CMDK and Tailwind. The idea is to get familiar with these tools and understand the data structure behind the scene.

## How to

<details>
  <summary>How to expand the interaction width of the edge</summary>

  Edges are thin and hard to click by default, but you can add a transparent edge that will cover the interaction space, then add the hover effect that indicates the user had already hovered upon the right target. 

  ```ts
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
  ```
</details>

<details>
  <summary>How to highlight the selected edges and nodes</summary>

  You can use the ReactFlow `onSelectionChange` prop to update the selected store.

  ```ts
    <ReactFlow
      onSelectionChange={(params) => {
        setSelectedNodes(params.nodes);
        setSelectedEdges(params.edges);
      }}
    />;

    export const useWorkflowStore = create<WorkflowStore>((set, get) => ({
      selectedNodes: [],
      setSelectedNodes: (nodes: Node<NodeData>[]) =>
        set((state) => {
          return { ...state, selectedNodes: nodes };
        }),
      selectedEdges: [],
      setSelectedEdges: (edges: Edge<EdgeData>[]) =>
        set((state) => {
          return { ...state, selectedEdges: edges };
        }),
    }));
  ```
</details>

<details>
  <summary>How to let cmdk portal in your desired container</summary>

  You can specify the container as below.

  ```ts
    const containerElement = React.useRef(null)

    return (
      <>
        <Command.Dialog container={containerElement.current} />
        <div ref={containerElement} />
      </>
    )
  ```
</details>