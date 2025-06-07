
import { create } from "zustand";

type UserStore = {
  currency: string;
  setCurrency: (value: string) => void;
};

export const useUserStore = create<UserStore>((set) => ({
  currency: "£", // default fallback
  setCurrency: (value) => set({ currency: value }),
}));
