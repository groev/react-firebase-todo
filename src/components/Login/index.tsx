import {
  Button,
  Center,
  Container,
  Divider,
  Stack,
  Title,
} from "@mantine/core";
import { IconBrandGithub, IconBrandGoogle } from "@tabler/icons-react";

import { useAuthStore } from "@/store/authStore";

export default function Home() {
  const login = useAuthStore((state) => state.login);
  return (
    <Container>
      <Center h={"100vh"}>
        <Stack w={400} maw="100%">
          <Title ta="center">
            Firebase Todo
            <br />
            Boilerplate
          </Title>
          <Divider label="Choose your login" labelPosition="center" />
          <Stack>
            <Button
              color="gray"
              leftSection={<IconBrandGoogle />}
              fullWidth
              variant="outline"
              size="md"
              onClick={() => login("google")}
            >
              Google
            </Button>
            <Button
              color="gray"
              leftSection={<IconBrandGithub />}
              fullWidth
              variant="outline"
              size="md"
              onClick={() => login("github")}
            >
              Github
            </Button>
          </Stack>
        </Stack>
      </Center>
    </Container>
  );
}
