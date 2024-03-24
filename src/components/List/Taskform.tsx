import { FormEvent, useState } from "react";
import { Button, Card, TextInput, Group, Box } from "@mantine/core";
import { useClickOutside, useMergedRef, useFocusTrap } from "@mantine/hooks";
import { IconCircle, IconPlus } from "@tabler/icons-react";

import { useListStore } from "@/components/List/store";

export default function Taskform() {
  const [isEditing, setIsEditing] = useState(false);
  const addTask = useListStore((state) => state.addTask);
  const [title, setTitle] = useState("");
  const useClickOutsideRef = useClickOutside<HTMLDivElement>(() =>
    setIsEditing(false)
  );
  const focusTrapRef = useFocusTrap(isEditing);

  const mergedRef = useMergedRef(useClickOutsideRef, focusTrapRef);

  const addNewTask = (e: FormEvent) => {
    e.preventDefault();
    if (title?.length > 0) addTask(title);
    setTitle("");
  };

  return (
    <Box
      style={{
        position: "sticky",
        bottom: "0",
        right: "0",
        left: "0",
        padding: "2rem",
        paddingTop: "0.5rem",
        margin: "-2rem",
        backdropFilter: "blur(10px)",
      }}
    >
      <Card
        withBorder
        p="sm"
        ref={mergedRef}
        onClick={() => setIsEditing(true)}
      >
        {isEditing ? (
          <Group gap={"xs"}>
            <IconCircle />
            <form onSubmit={addNewTask}>
              <TextInput
                value={title}
                onChange={(event) => setTitle(event.currentTarget.value)}
                styles={{
                  input: {
                    fontSize: "var(--mantine-font-size-sm)",
                    border: "none",
                  },
                }}
                flex={1}
              />
            </form>
          </Group>
        ) : (
          <Button
            size="md"
            fw="normal"
            variant="transparent"
            justify="flex-start"
            leftSection={<IconPlus />}
          >
            Add Task
          </Button>
        )}
      </Card>
    </Box>
  );
}
