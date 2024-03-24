import { forwardRef, useState } from "react";

import {
  Card,
  Text,
  Group,
  Checkbox,
  Drawer,
  TextInput,
  Button,
} from "@mantine/core";
import { useDisclosure, useFocusWithin } from "@mantine/hooks";

import { IconTrash } from "@tabler/icons-react";

import { useListStore } from "@/components/List/store";

interface ListItemComponentProps extends ListItem {
  style?: React.CSSProperties;
}

const Item = forwardRef(
  (
    { id, completed, title, ...props }: ListItemComponentProps,
    ref: React.Ref<HTMLDivElement>
  ) => {
    const [newTitle, setNewTitle] = useState(title);
    const [opened, { close, open }] = useDisclosure();
    const toggleTaskCompletion = useListStore(
      (state) => state.toggleTaskCompletion
    );

    const deleteTask = useListStore((state) => state.deleteTask);

    const updateTask = useListStore((state) => state.updateTask);
    const { ref: InputFocusWithinRef, focused } = useFocusWithin();

    const deleteTaskHandler = () => {
      close();
      deleteTask(id);
    };

    return (
      <>
        <Drawer
          opened={opened}
          onClose={() => {
            updateTask(id, newTitle);
            close();
          }}
          title="Edit task"
          position="right"
        >
          <Card withBorder>
            <Group gap={4} align="center">
              <Checkbox
                variant="filled"
                size="md"
                radius="50%"
                checked={completed}
                onChange={() => toggleTaskCompletion(id)}
              />
              <TextInput
                ref={InputFocusWithinRef}
                styles={{
                  input: {
                    fontWeight: 500,
                    fontSize: "var(--mantine-font-size-xl)",
                    border: "none",
                    textDecoration:
                      completed && !focused ? "line-through" : "none",
                  },
                }}
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
              />
            </Group>
          </Card>
          <Group mt="md" justify="flex-end">
            <Button
              onClick={deleteTaskHandler}
              variant="light"
              color="red"
              leftSection={<IconTrash />}
            >
              Delete Task
            </Button>
          </Group>
        </Drawer>
        <Card
          onClick={() => open()}
          ref={ref}
          mb="xs"
          withBorder
          px="xs"
          color="text"
          {...props}
        >
          <Group w={"100%"} style={{ flexWrap: "nowrap" }}>
            <Checkbox
              variant="filled"
              size="md"
              radius="50%"
              checked={completed}
              onChange={() => toggleTaskCompletion(id)}
            />
            <Text
              style={{
                textDecoration: completed ? "line-through" : "none",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
                overflow: "hidden",
              }}
            >
              {title}
            </Text>
          </Group>
        </Card>
      </>
    );
  }
);

export default Item;
