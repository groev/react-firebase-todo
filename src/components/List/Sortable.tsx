import { useState } from "react";

import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
  UniqueIdentifier,
  MeasuringStrategy,
} from "@dnd-kit/core";

import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

import { Box } from "@mantine/core";

import { useListStore } from "@/components/List/store";

import ListItem from "./Listitem";

import { SortableItem } from "./SortableItem";

export default function Sortable() {
  const list = useListStore((state) => state.list);
  const [activeId, setActiveId] = useState<UniqueIdentifier | null>(null);

  const updateListItems = useListStore((state) => state.updateListItems);
  const measuringConfig = {
    droppable: {
      strategy: MeasuringStrategy.Always,
    },
  };

  const sensors = useSensors(
    useSensor(PointerSensor, {
      // important to item list selection/checking
      activationConstraint: {
        delay: 100,
        tolerance: 5,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const activeItem = list?.items?.find((item) => item.id === activeId);

  return (
    <DndContext
      onDragEnd={handleDragEnd}
      id="list-item-sorter"
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={handleDragStart}
      measuring={measuringConfig}
    >
      <SortableContext
        items={list?.items?.map((item) => item.id) || []}
        strategy={verticalListSortingStrategy}
      >
        <Box
          style={{
            opacity: activeId ? 0.5 : 1,
          }}
        >
          {list?.items &&
            list?.items?.map((item) => (
              <SortableItem key={item.id} {...item} activeId={activeId} />
            ))}
        </Box>
      </SortableContext>
      <DragOverlay>
        {activeId && activeItem ? <ListItem {...activeItem} /> : null}
      </DragOverlay>
    </DndContext>
  );

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (active.id !== over?.id) {
      const listItems = list?.items || [];
      const oldIndex = listItems.findIndex((item) => item.id === active.id);
      const newIndex = listItems.findIndex((item) => item.id === over?.id);
      const orderedItems = arrayMove(listItems, oldIndex, newIndex);

      updateListItems(orderedItems);
    }
    setActiveId(null);
  }

  function handleDragStart(event: DragStartEvent) {
    const { active } = event;
    setActiveId(active?.id);
  }
}
