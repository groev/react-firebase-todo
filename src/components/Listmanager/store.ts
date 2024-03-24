import { doc, deleteDoc, addDoc, collection } from "firebase/firestore";
import { create } from "zustand";

import { db, auth } from "@/firebase";

interface ListManagerStore {
  lists: List[];
  setLists: (lists: List[]) => void;
  selectedList: string | null;
  setSelectedList: (id: string) => void;
  deleteList: (listId: string) => void;
  addList: () => void;
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
  addList: async () => {
    const listCount = get().lists.length;
    const list = {
      title: `New List ${listCount ? `(${listCount})` : ""}`,
      items: [],
      order: get().lists.length,
      user: auth.currentUser?.uid,
    };
    const add = await addDoc(collection(db, "lists"), list);
    if (add)
      set({
        selectedList: add.id,
      });
    return;
  },
}));
