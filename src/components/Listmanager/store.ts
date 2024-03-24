import { doc, deleteDoc } from "firebase/firestore";
import { create } from "zustand";

import { db } from "@/firebase";

interface ListManagerStore {
  lists: List[];
  setLists: (lists: List[]) => void;
  selectedList: string | null;
  setSelectedList: (id: string) => void;
  deleteList: (listId: string) => void;
}

export const useListManagerStore = create<ListManagerStore>((set, get) => ({
  lists: [],
  setLists: (lists) => set({ lists }),
  selectedList: null,
  setSelectedList: (id) => set({ selectedList: id }),
  deleteList: async (listId) => {
    await deleteDoc(doc(db, "lists", listId));
    set({ lists: get().lists.filter((list) => list.id !== listId) });
    if (get().selectedList === listId && get().lists.length) {
      set({ selectedList: get().lists[0]?.id });
    } else {
      set({ selectedList: null });
    }
  },
}));
