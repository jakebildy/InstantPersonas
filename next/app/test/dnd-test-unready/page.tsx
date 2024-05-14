"use client";
import { Button } from "@/components/ui/button";
import {
  CheckIcon,
  CopyIcon,
  PersonStandingIcon,
  ShareIcon,
  X,
} from "lucide-react";
import React, { HTMLAttributes, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import PersonaAdoptionStageAndSatisfactionCorrelationAnalysisSurveyPopup from "@/components/popups/persona-adoption-stage-and-satisfaction-correlation-analysis-survey";
import { ButtonInnerHover, gradientLightVariants } from "@/components/variants";
import { isMobile } from "react-device-detect";
import { PreventMobile } from "@/components/page-specific/prevent-mobile";
import SubscriptionPopup from "@/components/popups/subscription-popup";
import {
  mapUrlBackgroundColorParamToVariant,
  PersonaArchetype,
  PersonaAvatarPopover,
} from "@/components/page-specific/generative-ui/persona-avatar-popover";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cx } from "class-variance-authority";
import { GuestPostFinderTool } from "@/components/toolfolio/guest-post-finder";
import { TEST_PERSONA_HISTORY_DO_NOT_ALLOW_ON_PROD } from "@/tests/data/persona-history";
import CopyLinkPopover from "@/components/copy-link-popover";
import { ScrollArea } from "@/components/ui/scroll-area";

type Props = {};

export default function PageTest({}: Props) {
  const [openSubscriptionPopup, setOpenSubscriptionPopup] =
    React.useState(true);

  return (
    <div className="flex flex-col items-center h-screen w-screen relative">
      <HeaderTest />
      <h1 className="text-3xl text-gray-700 text-center pt-10 font-bold">
        Guest Post Opportunity Finder
      </h1>
      <h2 className="text-center mt-4 text-xs text-slate-400 mb-16">
        Writing Guest Posts is a great way to build backlinks and authority.
        <br />
        Find the best opportunities for your niche here.
      </h2>

      <GuestPostFinderTool persona={"a marketing manager"} />

      {/* <GuestPostOpportunitiesTool/> */}

      {/* <Subscription2 />
      <SubscriptionPopup
        openSubscriptionPopup={openSubscriptionPopup}
        setOpenSubscriptionPopup={setOpenSubscriptionPopup}
      /> */}
      {/* <FeedbackPopup
        openFeedbackPopup={false}
        setOpenFeedbackPopup={function (
          value: React.SetStateAction<boolean>
        ): void {
          throw new Error("Function not implemented.");
        }}
      /> */}
      {/* <PersonaAdoptionStageAndSatisfactionCorrelationAnalysisSurveyPopup
        openFeedbackPopup={true}
        setOpenFeedbackPopup={function (
          value: React.SetStateAction<boolean>
        ): void {
          throw new Error("Function not implemented.");
        }}
      /> */}
      {/* <PreventMobile /> */}
    </div>
  );
}

const dropAnimation: DropAnimation = {
  sideEffects: defaultDropAnimationSideEffects({
    styles: {
      active: {
        opacity: "0.5",
      },
    },
  }),
};

import {
  defaultDropAnimationSideEffects,
  DndContext,
  DropAnimation,
  KeyboardSensor,
  MeasuringStrategy,
  MouseSensor,
  TouchSensor,
  UniqueIdentifier,
  useSensor,
  useSensors,
} from "@dnd-kit/core";

type ArchetypeContainerMap = { [container: string]: PersonaArchetype[] };

function HeaderTest() {
  const [isDragging, setIsDragging] = useState(false);
  const [parent, setParent] = useState<UniqueIdentifier | null>(null);
  const history = TEST_PERSONA_HISTORY_DO_NOT_ALLOW_ON_PROD;
  const personas = history.flatMap((chat) => chat.aiState.personas);
  const CONTAINERS = ["persona-header", "persona-sidebar"] as const;
  const containerRef = React.useRef<HTMLDivElement>(null);

  const [items, setItems] = useState<ArchetypeContainerMap>({
    [CONTAINERS[0]]: [],
    [CONTAINERS[1]]: personas,
  });
  const [clonedItems, setClonedItems] = useState<ArchetypeContainerMap | null>(
    null
  );
  const [activeId, setActiveId] = useState<UniqueIdentifier | null>(null);
  const activationConstraint = {
    delay: 100,
    tolerance: 5,
  };
  const recentlyMovedToNewContainer = useRef(false);

  const sensors = useSensors(
    useSensor(MouseSensor, { activationConstraint }),
    useSensor(TouchSensor, { activationConstraint }),
    useSensor(KeyboardSensor, {
      coordinateGetter,
    })
  );

  useEffect(() => {
    console.log("items useEffect", items);
    requestAnimationFrame(() => {
      recentlyMovedToNewContainer.current = false;
    });
  }, [items]);

  if (!personas || personas.length === 0) {
    return (
      <div className="flex items-center justify-center m-2 w-full mx-auto border-b pb-2 relative">
        <PersonStandingIcon className="text-muted-foreground absolute left-0 m-8" />
        <div className="text-muted-foreground text-sm font-semibold">
          No personas have been generated yet
        </div>
      </div>
    );
  }

  const renderAvatar = (id: UniqueIdentifier | null) => {
    const archetype = findPersona(id);

    if (!archetype) return null;
    const variant = mapUrlBackgroundColorParamToVariant({
      url: archetype.pictureURL,
    });
    return (
      <PersonaAvatarPopover
        allowManage={false}
        {...{ archetype: archetype, variant: variant }}
      />
    );
  };

  const findPersona = (id: UniqueIdentifier | null) => {
    if (!id) return null;
    const name = id.toString().split("draggable")[0];
    return personas.find((persona) => persona.archetype_name === name);
  };

  const onDragCancel = () => {
    if (clonedItems) {
      // Reset items to their original state in case items have been
      // Dragged across containers
      setItems(clonedItems);
    }

    setActiveId(null);
    setClonedItems(null);
  };

  const filterItemsByArchetype = (
    items: ArchetypeContainerMap,
    activeArchetype: PersonaArchetype
  ): ArchetypeContainerMap => {
    return Object.entries(items).reduce(
      (filteredItems: ArchetypeContainerMap, [container, items]) => {
        // Filter out items that do not match the active archetype name.
        const filtered = items.filter(
          (item: { archetype_name: any }) =>
            item.archetype_name !== activeArchetype.archetype_name
        );

        // Accumulate the result into an object instead of an array.
        filteredItems[container] = filtered;
        return filteredItems;
      },
      {}
    );
  };

  return (
    <main
      id="drag-root"
      className="w-screen max-w-screen overflow-hidden"
      ref={containerRef}
    >
      <DndContext
        sensors={sensors}
        measuring={{
          droppable: {
            strategy: MeasuringStrategy.Always,
          },
        }}
        onDragStart={({ active }) => {
          setActiveId(active.id);
          setClonedItems(items);
        }}
        onDragOver={({ active, over }) => {
          console.log("active", active, over);
          const overId = over?.id;
          const activeArchetype = findPersona(active.id);

          if (overId == null) {
            return;
          }

          const overContainer = CONTAINERS.find(
            (container) => overId === container
          );

          if (!overContainer || !activeArchetype) {
            return;
          }

          setItems((items) => {
            const itemsWithoutActive = filterItemsByArchetype(
              items,
              activeArchetype
            );

            recentlyMovedToNewContainer.current = true;

            console.log("newIndex", [...items[overContainer]]);

            const overItems = items[overContainer];
            const overIndex = overItems.indexOf(activeArchetype);

            const isBelowOverItem =
              over &&
              active.rect.current.translated &&
              active.rect.current.translated.top >
                over.rect.top + over.rect.height;

            const modifier = isBelowOverItem ? 1 : 0;

            const newIndex =
              overIndex >= 0 ? overIndex + modifier : overItems.length + 1;

            console.log(
              "newIndex",
              ...items[overContainer].slice(0, newIndex),
              activeArchetype,
              ...items[overContainer].slice(
                newIndex,
                items[overContainer].length
              )
            );

            const itemsInNewContainer = [
              ...itemsWithoutActive[overContainer].slice(0, newIndex),
              activeArchetype,
              ...itemsWithoutActive[overContainer].slice(
                newIndex,
                itemsWithoutActive[overContainer].length
              ),
            ];

            return {
              ...itemsWithoutActive,
              [overContainer]: itemsInNewContainer,
            };
          });
        }}
        onDragCancel={onDragCancel}
      >
        <div className="flex items-center justify-center m-2 w-full mx-auto border-b pb-2 relative">
          <PersonStandingIcon className="text-muted-foreground absolute left-0 m-8" />
          <Droppable
            className={
              "flex min-w-xl min-w-2xl w-full max-w-3xl gap-2 items-center justify-center min-h-10"
            }
            id={"persona-header"}
            dragging={isDragging}
          >
            <SortableContext
              items={items["persona-header"].map(
                (archetype) => archetype.archetype_name
              )}
              strategy={rectSwappingStrategy}
            >
              {items["persona-header"].map((archetype, i) => {
                const variant = mapUrlBackgroundColorParamToVariant({
                  url: archetype.pictureURL,
                });
                return (
                  <Draggable key={i} id={archetype.archetype_name}>
                    <PersonaAvatarPopover
                      allowManage={false}
                      {...{ archetype: archetype, variant: variant }}
                    />
                  </Draggable>
                );
              })}
            </SortableContext>
          </Droppable>
          <CopyLinkPopover link={"test"} />
        </div>
        <aside className="flex flex-col gap-2 absolute top-0 right-0 px-4 bg-white border border-border h-full">
          {/* <ScrollArea> */}
          <Droppable
            className="flex flex-col gap-2 "
            id={"persona-sidebar"}
            dragging={isDragging}
          >
            <SortableContext
              items={items["persona-sidebar"].map(
                (archetype) => archetype.archetype_name
              )}
              strategy={rectSwappingStrategy}
            >
              {items["persona-sidebar"].map((archetype, i) => {
                const variant = mapUrlBackgroundColorParamToVariant({
                  url: archetype.pictureURL,
                });
                return (
                  <Draggable key={i} id={archetype.archetype_name}>
                    <PersonaAvatarPopover
                      allowManage={false}
                      {...{ archetype: archetype, variant: variant }}
                    />
                  </Draggable>
                );
              })}
            </SortableContext>
          </Droppable>
          {/* </ScrollArea> */}
        </aside>
        <DraggableOverlay
          root={containerRef}
          Item={renderAvatar(activeId) ?? <div>no item found</div>}
        />
      </DndContext>
    </main>
  );
}

import { useDraggable } from "@dnd-kit/core";
import { DraggableOverlay, Droppable } from "./_components";
import { coordinateGetter } from "./multiple-container-keyboard-coords";
import {
  arrayMove,
  rectSortingStrategy,
  rectSwappingStrategy,
  SortableContext,
} from "@dnd-kit/sortable";

function Draggable({
  children,
  id,
}: {
  children: React.ReactNode;
  id: string;
}) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: id + "draggable",
  });
  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
      }
    : undefined;

  return (
    <button ref={setNodeRef} style={style} {...listeners} {...attributes}>
      {children}
    </button>
  );
}
