import { create } from "zustand";

export type CmdkStore = {
  open: boolean;
  setOpen: (open: boolean) => void;
};

export const useCmdkStore = create<CmdkStore>((set, get) => ({
  open: false,
  setOpen: (open: boolean) => {
    set({
      open,
    });
  },
}));
