import { doc, setDoc } from "firebase/firestore";
import { create } from "zustand";

import { db } from "@/firebase";

interface ListStore {
  list: List | null;
  setList: (lists: List | null) => void;
  addTask: (title: string) => void;
  toggleTaskCompletion: (taskId: string) => void;
  updateListItems: (items: ListItem[]) => void;
  updateTask: (taskId: string, title: string) => void;
  deleteTask: (taskId: string) => void;
  updateList: (title: string) => void;
}

export const useListStore = create<ListStore>((set, get) => ({
  list: null,
  setList: (list) => set({ list }),

  toggleTaskCompletion: (taskId) => {
    console.log("test");
    const list = get().list;
    if (list) {
      const updatedList = {
        ...list,
        items: list.items.map((item) =>
          item.id === taskId ? { ...item, completed: !item.completed } : item
        ),
      };
      set({ list: updatedList });
      // update firestore task
      setDoc(doc(db, "lists", updatedList.id), updatedList);
    }
  },
  updateListItems: (items: ListItem[]) => {
    const list = get().list;
    if (list) {
      const updatedList = {
        ...list,
        items: items,
      };
      set({ list: updatedList });

      setDoc(doc(db, "lists", updatedList.id), updatedList);
    }
  },
  addTask: async (title) => {
    const list = get().list;
    if (list) {
      const updatedList = {
        ...list,
        items: [
          ...list.items,
          {
            id: Math.random().toString(36).substring(7),
            title: title,
            completed: false,
          },
        ],
      };
      await setDoc(doc(db, "lists", updatedList.id), updatedList);
      return set({ list: updatedList });
    }
  },
  updateTask: (taskId, title) => {
    const list = get().list;
    if (list) {
      const updatedList = {
        ...list,
        items: list.items.map((item) =>
          item.id === taskId ? { ...item, title: title } : item
        ),
      };
      set({ list: updatedList });
      setDoc(doc(db, "lists", updatedList.id), updatedList);
    }
  },
  updateList: async (title) => {
    const list = get().list;
    if (list) {
      await setDoc(doc(db, "lists", list.id), { title }, { merge: true });
      return set({ list: { ...list, title } });
    }
  },

  deleteTask: async (taskId) => {
    const list = get().list;
    if (list) {
      const updatedList = {
        ...list,
        items: list.items.filter((item) => item.id !== taskId),
      };
      setDoc(doc(db, "lists", updatedList.id), updatedList);
      return set({ list: updatedList });
    }
  },
}));
