import { setDoc, doc } from "firebase/firestore";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core";

import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

import { useListManagerStore } from "@/components/Listmanager/store";

import { db } from "@/firebase";

type Props = {
  children: React.ReactNode;
};

export default function Sortable({ children }: Props) {
  const lists = useListManagerStore((state) => state.lists);
  const setLists = useListManagerStore((state) => state.setLists);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      // important to allow list selection on click
      activationConstraint: {
        delay: 100,
        tolerance: 5,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );
  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (active.id !== over?.id) {
      const oldIndex = lists.findIndex((item) => item.id === active.id);
      const newIndex = lists.findIndex((item) => item.id === over?.id);
      const ordererLists = arrayMove(lists, oldIndex, newIndex);
      setLists(ordererLists);
      const updatedLists = ordererLists.map((list, index) => ({
        ...list,
        order: index,
      }));
      // state needs to be updated before firebase update, otherwise animation gets weird since snapshot will render another render
      for (const list of updatedLists) {
        const docRef = doc(db, "lists", list.id);
        setDoc(docRef, list);
      }
    }
  }

  return (
    <DndContext
      id="list-sorter"
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <SortableContext items={lists} strategy={verticalListSortingStrategy}>
        {children}
      </SortableContext>
    </DndContext>
  );
}
