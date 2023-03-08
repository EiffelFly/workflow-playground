export type CommandMenuItem = {
  type: ComponentType;
  title: string;
  description: string;
};

export type ComponentType = "model" | "destination" | "source";
