import { UniqueIdentifier } from "@dnd-kit/core";
import { useSortable, defaultAnimateLayoutChanges } from "@dnd-kit/sortable";

import { CSS } from "@dnd-kit/utilities";

import ListItem from "./Listitem";

type Props = {
  id: string;
  activeId: UniqueIdentifier | null;
  title: string;
  completed: boolean;
};

// haven't found type here
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function animateLayoutChanges(args: any) {
  const { isSorting, wasSorting } = args;

  if (isSorting || wasSorting) {
    return defaultAnimateLayoutChanges(args);
  }

  return true;
}

export function SortableItem(props: Props) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: props.id, animateLayoutChanges });

  const style = {
    opacity: props.activeId && props.activeId === props.id ? 0 : 1,
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <ListItem
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      {...props}
    />
  );
}
