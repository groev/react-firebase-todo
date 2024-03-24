import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

import { Button, Text, Group, Badge } from "@mantine/core";
import { IconMenu2 } from "@tabler/icons-react";

import { useListManagerStore } from "@/components/Listmanager/store";

export default function List({ id, items, title }: List) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: id });
  const setSelectedList = useListManagerStore((state) => state.setSelectedList);
  const selectedList = useListManagerStore((state) => state.selectedList);
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };
  return (
    <Button
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      onClick={() => setSelectedList(id)}
      px="xs"
      size="lg"
      justify="space-between"
      variant={selectedList === id ? "light" : "transparent"}
      color="text"
      rightSection={
        items.some((item) => !item.completed) && (
          <Badge variant="light" color="gray">
            {items.filter((item) => !item.completed).length}
          </Badge>
        )
      }
    >
      <Group w={"100%"} style={{ flexWrap: "nowrap" }}>
        <Group flex={1}>
          <IconMenu2 />
        </Group>
        <Text
          style={{
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
            overflow: "hidden",
          }}
        >
          {title}
        </Text>
      </Group>
    </Button>
  );
}
