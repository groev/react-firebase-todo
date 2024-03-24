import { useEffect } from "react";
import { DocumentSnapshot, onSnapshot, doc } from "firebase/firestore";

import { Flex, Container, Text } from "@mantine/core";

import { useListStore } from "@/components/List/store";

import { useListManagerStore } from "@/components/Listmanager/store";

import { db } from "@/firebase";

import Listcontainer from "./Listcontainer";

import Taskform from "./Taskform";
import Titleform from "./Titleform";

export default function List() {
  const selectedList = useListManagerStore((state) => state.selectedList);
  const setList = useListStore((state) => state.setList);
  const list = useListStore((state) => state.list);
  useEffect(() => {
    if (!selectedList) {
      setList(null);
      return;
    }
    const unsubscribe = onSnapshot(
      doc(db, "lists", selectedList),
      (doc: DocumentSnapshot) => {
        const listData = {
          id: doc.id,
          ...doc.data(),
        } as List;
        setList(listData);
      }
    );
    return () => unsubscribe();
  }, [selectedList, setList]);

  if (!list)
    return (
      <Container>
        <Text>Create your first List</Text>
      </Container>
    );
  return (
    <Flex
      direction="column"
      justify="space-between"
      align="stretch"
      px="2vw"
      py="1rem"
      flex="1"
    >
      {JSON.stringify(list)}
      {JSON.stringify(selectedList)}
      <Titleform />
      <Listcontainer />
      <Taskform />
    </Flex>
  );
}
