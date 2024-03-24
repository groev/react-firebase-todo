import { useEffect } from "react";
import { Loader, Center } from "@mantine/core";

import Layout from "@/components/Layout";
import Login from "@/components/Login";
import { auth } from "@/firebase";
import { useAuthStore } from "@/store/authStore";

function App() {
  const user = useAuthStore((state) => state.user);
  const setUser = useAuthStore((state) => state.setUser);
  const setAuthLoading = useAuthStore((state) => state.setAuthLoading);
  const authLoading = useAuthStore((state) => state.authLoading);

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
        setAuthLoading(false);
      } else {
        setAuthLoading(false);
      }
    });
  }, [setUser, setAuthLoading]);
  if (authLoading)
    return (
      <Center mih="100vh">
        <Loader />
      </Center>
    );
  return user ? <Layout /> : <Login />;
}

export default App;
