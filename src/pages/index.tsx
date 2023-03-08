import { Root } from "@/layouts/Root";
import "reactflow/dist/style.css";
import ReactFlow, { MiniMap, Controls } from "reactflow";
import { useWorkflowStore, WorkflowStore } from "@/stores/workflow";
import { shallow } from "zustand/shallow";
import CustomNode from "@/components/CustomNode";

const selector = (state: WorkflowStore) => ({
  nodes: state.nodes,
  edges: state.edges,
  onNodesChange: state.onNodesChange,
  onEdgesChange: state.onEdgesChange,
  onConnect: state.onConnect,
});

const nodeTypes = { customNode: CustomNode };

export default function Home() {
  const { nodes, edges, onNodesChange, onEdgesChange, onConnect } =
    useWorkflowStore(selector, shallow);

  return (
    <Root>
      <main>
        <div className="flex h-screen w-full">
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            nodeTypes={nodeTypes}
            fitView
          >
            <MiniMap />
            <Controls />
          </ReactFlow>
        </div>
      </main>
    </Root>
  );
}
