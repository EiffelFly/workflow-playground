import "reactflow/dist/style.css";
import ReactFlow, { MiniMap, Controls } from "reactflow";
import { useWorkflowStore, WorkflowStore } from "@/stores/workflow";
import { shallow } from "zustand/shallow";
import { CustomNode } from "@/components/CustomNode";
import { CmdkStore, useCmdkStore } from "@/stores/cmdk";
import { useEffect } from "react";
import { CommandMenu } from "@/components/CommandMenu";

const workflowSelector = (state: WorkflowStore) => ({
  nodes: state.nodes,
  edges: state.edges,
  onNodesChange: state.onNodesChange,
  onEdgesChange: state.onEdgesChange,
  onConnect: state.onConnect,
});

const cmdkSelector = (state: CmdkStore) => ({
  open: state.open,
  setOpen: state.setOpen,
});

const nodeTypes = { customNode: CustomNode };

export default function Home() {
  const { nodes, edges, onNodesChange, onEdgesChange, onConnect } =
    useWorkflowStore(workflowSelector, shallow);

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
        <div className="flex h-screen w-full p-5 bg-white">
          <div className="font-sans text-gray-500 absolute top-[120px] left-1/2 -translate-x-1/2">
            Press cmd + K to add components
          </div>
          <div className="w-full h-full border border-black">
            <ReactFlow
              nodes={nodes}
              edges={edges}
              onNodesChange={onNodesChange}
              onEdgesChange={onEdgesChange}
              onConnect={onConnect}
              nodeTypes={nodeTypes}
              proOptions={{ hideAttribution: true }}
              fitView
            >
              <MiniMap className="!border !border-black" />
              <Controls className="!border !border-black" />
            </ReactFlow>
          </div>
        </div>
      </main>
      <CommandMenu />
    </>
  );
}
