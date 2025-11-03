import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useUserStore = create(
  persist(
    (set) => ({
      user: null,
      createUser: (newUser) => set({ user: newUser }),
      removeUser: () => set({ user: null }),
    }),
    {
      name: "user-storage", // 🔹 nombre de la key en localStorage
    }
  )
);
