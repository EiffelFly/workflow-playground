import { CmdkStore, useCmdkStore } from "@/stores/cmdk";
import { Command } from "cmdk";
import { useRef } from "react";
import { shallow } from "zustand/shallow";

const cmdkSelector = (state: CmdkStore) => ({
  open: state.open,
  setOpen: state.setOpen,
});

export const CommandMenu = () => {
  const { open, setOpen } = useCmdkStore(cmdkSelector, shallow);
  const containerRef = useRef(null);

  return (
    <>
      <Command.Dialog
        open={open}
        onOpenChange={setOpen}
        label="Global Command Menu"
        className="z-30 py-2 rounded-[12px] fixed left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2 w-full max-w-[640px] bg-gray-800 border border-gray-400"
        container={containerRef.current || undefined}
      >
        <Command.Input
          className="w-full border-none py-2 px-4 outline-none font-sans text-base"
          placeholder="Search components"
        />
        <Command.List>
          <Command.Empty>No results found.</Command.Empty>

          <Command.Group heading="Letters">
            <Command.Item>a</Command.Item>
            <Command.Item>b</Command.Item>
            <Command.Separator />
            <Command.Item>c</Command.Item>
          </Command.Group>

          <Command.Item>Apple</Command.Item>
        </Command.List>
      </Command.Dialog>
      <div ref={containerRef}></div>
    </>
  );
};
