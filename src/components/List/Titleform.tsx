import { useState, useEffect } from "react";
import { Text, TextInput, Group, Box } from "@mantine/core";
import { useClickOutside, useFocusTrap, useMergedRef } from "@mantine/hooks";

import { useListStore } from "@/components/List/store";

import Settings from "./Settings";

export default function Titleform() {
  const listData = useListStore((state) => state.list);
  const updateList = useListStore((state) => state.updateList);

  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(listData?.title || "");

  useEffect(() => {
    if (listData) setTitle(listData?.title);
  }, [listData]);

  const useClickOutsideRef = useClickOutside<HTMLDivElement>(() => {
    updateList(title);
    setIsEditing(false);
  }, null);
  const focusTrapRef = useFocusTrap(isEditing);

  const mergedRef = useMergedRef(useClickOutsideRef, focusTrapRef);

  return (
    <Box
      style={{
        position: "sticky",
        top: "calc(50px)",
        zIndex: "10",
        right: "0",
        left: "0",
        padding: "2rem",
        paddingBottom: "0.5rem",
        paddingTop: "1rem",
        margin: "0 -2rem",
        backdropFilter: "blur(10px)",
      }}
    >
      <Group justify="space-between">
        <Box
          p={0}
          display="flex"
          ref={mergedRef}
          onClick={() => setIsEditing(true)}
        >
          {isEditing ? (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                updateList(title);
              }}
            >
              <TextInput
                onBlur={() => updateList(title)}
                miw={300}
                maw={"100%"}
                styles={{
                  input: {
                    minWidth: "300px",
                    width: title.length + "ch",
                    padding: "0.5rem",
                    fontSize: "2rem",
                    lineHeight: "2.5rem",
                    boxSizing: "border-box",
                  },
                }}
                fw="500"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </form>
          ) : (
            <Text fz="2rem" fw="500">
              {listData?.title}
            </Text>
          )}
        </Box>
        <Settings setIsEditing={setIsEditing} />
      </Group>
    </Box>
  );
}
