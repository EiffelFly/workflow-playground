import { CmdkStore, useCmdkStore } from "@/stores/cmdk";
import { NodeData, useWorkflowStore, WorkflowStore } from "@/stores/workflow";
import { CommandMenuItem } from "@/types";
import { Command } from "cmdk";
import { useCallback, useMemo, useRef, useState } from "react";
import { Position } from "reactflow";
import { shallow } from "zustand/shallow";
import { ResourceIcon } from "./ResourceIcon";
import { v4 as uuidv4 } from "uuid";

const cmdkSelector = (state: CmdkStore) => ({
  open: state.open,
  setOpen: state.setOpen,
});

const workflowSelector = (state: WorkflowStore) => ({
  addNode: state.addNode,
});

const items: CommandMenuItem[] = [
  {
    type: "model",
    title: "yolov7",
    description:
      "Implementation of paper - YOLOv7: Trainable bag-of-freebies sets new state-of-the-art for real-time object detectors",
  },
  {
    type: "source",
    title: "http",
    description: "Simple HTTP request",
  },
  {
    type: "destination",
    title: "aws-s3",
    description:
      "Amazon S3 or Amazon Simple Storage Service is a service offered by Amazon Web Services that provides object storage through a web service interface. Amazon S3 uses the same scalable storage infrastructure that Amazon.com uses to run its e-commerce network.",
  },
  {
    type: "model",
    title: "gpt-2",
    description:
      "Generative Pre-trained Transformer 2 is an open-source artificial intelligence created by OpenAI in February 2019.",
  },
];

export const CommandMenu = () => {
  const { open, setOpen } = useCmdkStore(cmdkSelector, shallow);
  const { addNode } = useWorkflowStore(workflowSelector, shallow);
  const containerRef = useRef(null);
  const [value, setValue] = useState("yolov7");

  const selectedItem = useMemo(() => {
    return items.find((e) => e.title === value) || null;
  }, [value]);

  const onSelect = useCallback((data: NodeData) => {
    addNode({
      id: uuidv4(),
      type: "customNode",
      sourcePosition: Position.Left,
      targetPosition: Position.Right,
      data,
      position: { x: 0, y: 0 },
    });
  }, []);

  return (
    <>
      <Command.Dialog
        value={value}
        onValueChange={(v) => setValue(v)}
        open={open}
        onOpenChange={setOpen}
        label="Global Command Menu"
        className="z-30 flex flex-col pt-4 rounded-[12px] fixed left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2 w-full min-h-[360px] max-w-[640px] bg-white border-2 border-black"
        container={containerRef.current || undefined}
      >
        <Command.Input
          className="w-full border-none py-2 px-4 outline-none font-sans text-base bg-white text-black mb-4"
          placeholder="Search components"
        />
        <Command.List className="border-t-[0.5px] border-grey-400 py-2 h-full">
          <div className="flex flex-row px-2">
            <div className="w-1/3 border-r-[0.5px] border-gray-400">
              <Command.Group
                heading="Models"
                className="text-gray-500 font-sans text-sm mb-5"
              >
                {items
                  .filter((e) => e.type === "model")
                  .map((e) => (
                    <Command.Item
                      key={e.title}
                      className="aria-selected:bg-gray-100 p-1"
                      value={e.title}
                      onSelect={() =>
                        onSelect({
                          type: "model",
                          title: e.title,
                          description: e.description,
                        })
                      }
                    >
                      <div className="flex flex-row gap-x-2">
                        <div className="flex p-1 bg-gray-200">
                          <ResourceIcon
                            type={e.type}
                            width="w-6"
                            height="h-6"
                            position="m-auto"
                            color="fill-black"
                          />
                        </div>
                        <div className="font-sans text-base font-medium text-black my-auto">
                          {e.title}
                        </div>
                      </div>
                    </Command.Item>
                  ))}
              </Command.Group>
              <Command.Group
                heading="Sources"
                className="text-gray-500 font-sans text-sm mb-5"
              >
                {items
                  .filter((e) => e.type === "source")
                  .map((e) => (
                    <Command.Item
                      key={e.title}
                      className="aria-selected:bg-gray-100 p-1"
                      value={e.title}
                      onSelect={() =>
                        onSelect({
                          type: "source",
                          title: e.title,
                          description: e.description,
                        })
                      }
                    >
                      <div className="flex flex-row gap-x-2">
                        <div className="flex p-1 bg-gray-200">
                          <ResourceIcon
                            type={e.type}
                            width="w-6"
                            height="h-6"
                            position="m-auto"
                            color="fill-black"
                          />
                        </div>
                        <div className="font-sans text-base font-medium text-black my-auto">
                          {e.title}
                        </div>
                      </div>
                    </Command.Item>
                  ))}
              </Command.Group>
              <Command.Group
                heading="Destinations"
                className="text-gray-500 font-sans text-sm mb-5"
              >
                {items
                  .filter((e) => e.type === "destination")
                  .map((e) => (
                    <Command.Item
                      key={e.title}
                      className="aria-selected:bg-gray-100 p-1"
                      value={e.title}
                      onSelect={() =>
                        onSelect({
                          type: "destination",
                          title: e.title,
                          description: e.description,
                        })
                      }
                    >
                      <div className="flex flex-row gap-x-2">
                        <div className="flex p-1 bg-gray-200">
                          <ResourceIcon
                            type={e.type}
                            width="w-6"
                            height="h-6"
                            position="m-auto"
                            color="fill-black"
                          />
                        </div>
                        <div className="font-sans text-base font-medium text-black my-auto">
                          {e.title}
                        </div>
                      </div>
                    </Command.Item>
                  ))}
              </Command.Group>
            </div>
            <div className="flex flex-col w-2/3 px-6 py-2 min-h-[360px]">
              {selectedItem ? (
                <>
                  <h2 className="text-lg font-semibold text-black font-sans uppercase">
                    {selectedItem.title}
                  </h2>
                  <p className="text-base font-sans text-gray-500 font-normal">
                    {selectedItem.description}
                  </p>
                </>
              ) : null}
            </div>
          </div>
        </Command.List>
      </Command.Dialog>
      <div ref={containerRef}></div>
    </>
  );
};
