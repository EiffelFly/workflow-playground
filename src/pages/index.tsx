import "reactflow/dist/style.css";
import ReactFlow, {
  MiniMap,
  Controls,
  Background,
  BackgroundVariant,
  Node,
} from "reactflow";
import { NodeData, useWorkflowStore, WorkflowStore } from "@/stores/workflow";
import { shallow } from "zustand/shallow";
import { CustomNode } from "@/components/CustomNode";
import { CmdkStore, useCmdkStore } from "@/stores/cmdk";
import { useEffect, useState } from "react";
import { CommandMenu } from "@/components/CommandMenu";
import { CustomEdge } from "@/components/CustomEdge";

const workflowSelector = (state: WorkflowStore) => ({
  nodes: state.nodes,
  edges: state.edges,
  onNodesChange: state.onNodesChange,
  onEdgesChange: state.onEdgesChange,
  onConnect: state.onConnect,
  selectedNodes: state.selectedNodes,
  setSelectedNodes: state.setSelectedNodes,
  selectedEdges: state.selectedEdges,
  setSelectedEdges: state.setSelectedEdges,
});

const cmdkSelector = (state: CmdkStore) => ({
  open: state.open,
  setOpen: state.setOpen,
});

const nodeTypes = { customNode: CustomNode };

const edgeTypes = {
  customEdge: CustomEdge,
};

export default function Home() {
  const {
    nodes,
    edges,
    onNodesChange,
    onEdgesChange,
    onConnect,
    selectedNodes,
    setSelectedNodes,
    selectedEdges,
    setSelectedEdges,
  } = useWorkflowStore(workflowSelector, shallow);

  const { open, setOpen } = useCmdkStore(cmdkSelector, shallow);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && e.metaKey) {
        setOpen(!open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, [open, setOpen]);

  return (
    <>
      <main>
        <div className="flex flex-row h-screen w-full p-5 bg-white gap-x-5">
          <div className="flex-1 h-full border border-black relative">
            <div className="font-sans text-gray-500 absolute top-[120px] left-1/2 -translate-x-1/2">
              Press cmd + K to add components
            </div>
            <ReactFlow
              nodes={nodes}
              edges={edges}
              onNodesChange={onNodesChange}
              onEdgesChange={onEdgesChange}
              onConnect={onConnect}
              nodeTypes={nodeTypes}
              edgeTypes={edgeTypes}
              proOptions={{ hideAttribution: true }}
              onSelectionChange={(params) => {
                setSelectedNodes(params.nodes);
                setSelectedEdges(params.edges);
              }}
              selectNodesOnDrag={false}
              fitView
            >
              <MiniMap className="!border !border-black" />
              <Controls className="!border !border-black" />
              <Background
                variant={BackgroundVariant.Dots}
                gap={16}
                color="#d1d5db"
              />
            </ReactFlow>
          </div>
          <div className="flex flex-col gap-y-5">
            <div className="w-[360px] h-full flex flex-col">
              <p className="mb-4 text-black font-light text-base font-sans py-2 px-4 border border-black mr-auto">
                Selected Node
              </p>
              <pre className="text-black text-sm font-light p-4 border border-black overflow-scroll">
                {JSON.stringify(selectedNodes, undefined, 2)}
              </pre>
            </div>
            <div className="w-[360px] h-full flex flex-col">
              <p className="mb-4 text-black font-light text-base font-sans py-2 px-4 border border-black mr-auto">
                Selected Edges
              </p>
              <pre className="text-black text-sm font-light p-4 border border-black overflow-scroll">
                {JSON.stringify(selectedEdges, undefined, 2)}
              </pre>
            </div>
          </div>
        </div>
      </main>
      <CommandMenu />
    </>
  );
}
