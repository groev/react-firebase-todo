import { useEffect } from "react";
import {
  onSnapshot,
  query,
  collection,
  where,
  DocumentSnapshot,
  QuerySnapshot,
  addDoc,
} from "firebase/firestore";
import { Button, Stack, Text } from "@mantine/core";

import { IconPlus } from "@tabler/icons-react";

import { useMutation } from "@tanstack/react-query";

import { useListManagerStore } from "@/components/Listmanager/store";

import { db, auth } from "@/firebase";

import List from "./List";

import Sortable from "./Sortable";

export default function Listmanager() {
  const setLists = useListManagerStore((state) => state.setLists);
  const setSelectedList = useListManagerStore((state) => state.setSelectedList);
  const selectedList = useListManagerStore((state) => state.selectedList);
  const lists = useListManagerStore((state) => state.lists);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      query(
        collection(db, "lists"),
        where("user", "==", auth.currentUser?.uid)
      ),
      (snapshot: QuerySnapshot) => {
        const data = snapshot.docs.map((doc: DocumentSnapshot) => {
          delete doc?.data()?.id;
          return {
            id: doc.id,
            ...doc.data(),
          } as List;
        });
        const sorted = data.sort((a, b) => a.order - b.order);
        setLists(sorted);
        if (!selectedList) setSelectedList(sorted[0]?.id);
      }
    );
    return () => unsubscribe();
  }, [setLists, selectedList, setSelectedList]);

  const addList = useMutation({
    mutationFn: async () => {
      const list = {
        title: "New List" + lists.length,
        items: [],
        order: lists.length,
        user: auth.currentUser?.uid,
      };
      const doc = await addDoc(collection(db, "lists"), list);
      return setSelectedList(doc.id);
    },
  });

  return (
    <Stack h={"100%"} justify="space-between">
      <Stack gap={0}>
        <Sortable>
          {lists &&
            lists.map((list: List) => {
              return <List {...list} key={list.id} />;
            })}
        </Sortable>
      </Stack>
      <Button
        onClick={() => addList.mutate()}
        loading={addList.isPending}
        px="xs"
        color="text"
        size="lg"
        fullWidth
        justify="flex-start"
        variant="transparent"
        leftSection={<IconPlus />}
      >
        <Text>Add List</Text>
      </Button>
    </Stack>
  );
}
