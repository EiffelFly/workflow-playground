import { create } from "zustand";
import {
  Connection,
  Edge,
  EdgeChange,
  Node,
  NodeChange,
  addEdge,
  OnNodesChange,
  OnEdgesChange,
  OnConnect,
  applyNodeChanges,
  applyEdgeChanges,
  Position,
} from "reactflow";

export type NodeData = {
  type: "source" | "destination" | "model";
  title: string;
  description: string;
};

export type WorkflowStore = {
  nodes: Node<NodeData>[];
  edges: Edge[];
  onNodesChange: OnNodesChange;
  onEdgesChange: OnEdgesChange;
  onConnect: OnConnect;
  addNode: (node: Node<NodeData>) => void;
};

// this is our useStore hook that we can use in our components to get parts of the store and call actions
export const useWorkflowStore = create<WorkflowStore>((set, get) => ({
  nodes: [
    {
      id: "1",
      type: "customNode",
      sourcePosition: Position.Left,
      targetPosition: Position.Right,
      data: {
        type: "source",
        title: "HTTP",
        description: "Simple HTTP request",
      },
      position: { x: 150, y: 50 },
    },
    {
      id: "2",
      type: "customNode",
      sourcePosition: Position.Left,
      targetPosition: Position.Right,
      data: {
        type: "model",
        title: "gpt-2",
        description:
          "Generative Pre-trained Transformer 2 is an open-source artificial intelligence created by OpenAI in February 2019.",
      },
      position: { x: 250, y: 25 },
    },
  ],
  edges: [
    {
      id: "w1",
      source: "1",
      target: "2",
      animated: true,
    },
  ],
  onNodesChange: (changes: NodeChange[]) => {
    set({
      nodes: applyNodeChanges(changes, get().nodes),
    });
  },
  onEdgesChange: (changes: EdgeChange[]) => {
    set({
      edges: applyEdgeChanges(changes, get().edges),
    });
  },
  onConnect: (connection: Connection) => {
    set({
      edges: addEdge({ ...connection, animated: true }, get().edges),
    });
  },
  addNode: (node: Node<NodeData>) =>
    set((state) => ({
      ...state,
      nodes: [...state.nodes, node],
    })),
}));
