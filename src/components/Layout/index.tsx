import { AppShell, Burger, Text, Group } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconBrandFirebase } from "@tabler/icons-react";

import List from "@/components/List";
import Listmanager from "@/components/Listmanager";

export default function Layout() {
  const [opened, { toggle }] = useDisclosure();

  return (
    <AppShell
      header={{
        height: 50,
      }}
      navbar={{
        width: 300,
        breakpoint: "sm",
        collapsed: { mobile: !opened },
      }}
      padding="md"
    >
      <AppShell.Header>
        <Group h={50} pl="md" align="center">
          <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
          <Group gap={"xs"}>
            <IconBrandFirebase size="1.5rem" />
            <Text fz="xl" fw="bold" lh="1">
              firebase Todo Boilerplate
            </Text>
          </Group>
        </Group>
      </AppShell.Header>
      <AppShell.Navbar p="md">
        <Listmanager />
      </AppShell.Navbar>

      <AppShell.Main display="flex" style={{ flexDirection: "column" }}>
        <List />
      </AppShell.Main>
    </AppShell>
  );
}
