import React from "react";
import { Menu, ActionIcon, Modal, Button, Group, Text } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconDots, IconEdit, IconTrash } from "@tabler/icons-react";

import { useListStore } from "@/components/List/store";
import { useListManagerStore } from "@/components/Listmanager/store";

type Props = {
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function Settings({ setIsEditing }: Props) {
  const [opened, { open, close }] = useDisclosure(false);
  const list = useListStore((state) => state.list);
  const deleteList = useListManagerStore((state) => state.deleteList);

  const deleteListHandler = () => {
    if (list?.id) deleteList(list?.id);
    close();
  };

  return (
    <>
      <Menu position="bottom-end">
        <Menu.Target>
          <ActionIcon variant="light">
            <IconDots />
          </ActionIcon>
        </Menu.Target>
        <Menu.Dropdown miw={200}>
          <Menu.Item
            leftSection={<IconEdit />}
            onClick={() => setIsEditing(true)}
          >
            Edit title
          </Menu.Item>
          <Menu.Item onClick={open} c="red" leftSection={<IconTrash />}>
            Delete
          </Menu.Item>
        </Menu.Dropdown>
      </Menu>
      <Modal
        title={"Delete list"}
        fw="bold"
        opened={opened}
        onClose={close}
        centered
      >
        <Text mb="xl">{list?.title} is finally deleted.</Text>
        <Group justify="flex-end" w={"100%"}>
          <Button onClick={close} color="gray">
            Cancel
          </Button>
          <Button onClick={deleteListHandler} color="red">
            Delete
          </Button>
        </Group>
      </Modal>
    </>
  );
}
