import {
  GoogleAuthProvider,
  OAuthProvider,
  User,
  signInWithPopup,
} from "firebase/auth";

import { create } from "zustand";

import { auth } from "@/firebase";

interface AuthStore {
  user: User | null;
  setUser: (user: User) => void;
  login: (provider: string) => void;
  authLoading: boolean;
  setAuthLoading: (authLoading: boolean) => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
  authLoading: true,
  setAuthLoading: (authLoading) => set({ authLoading }),
  setUser: (user) => set({ user }),
  user: null,
  login: async (provider) => {
    let authProvider;
    switch (provider) {
      case "google":
        authProvider = new GoogleAuthProvider();
        break;
      case "github":
        authProvider = new OAuthProvider("github.com");
        break;
      default:
        throw new Error("Invalid provider");
    }
    return await signInWithPopup(auth, authProvider);
  },
}));
