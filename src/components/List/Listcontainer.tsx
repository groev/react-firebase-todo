import { ScrollArea } from "@mantine/core";

import Sortable from "./Sortable";

export default function Listcontainer() {
  return (
    <ScrollArea h={"100%"} flex={1} mt="xl">
      <Sortable />
    </ScrollArea>
  );
}
