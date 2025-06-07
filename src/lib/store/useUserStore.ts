
// import { create } from "zustand";

// type UserStore = {
//   currency: string;
//   dailyGoal: string;
//   weeklyGoal: string;
//   setCurrency: (value: string) => void;
//   setDailyGoal: (value: string) => void;
//   setWeeklyGoal: (value: string) => void;
// };

// export const useUserStore = create<UserStore>((set) => ({
//   // default fallback
//   currency: "£",
//   dailyGoal: "",
//   weeklyGoal: "",


//   //Set state
//   setCurrency: (currency) => set({ currency }),
//   setDailyGoal: (dailyGoal) => set({ dailyGoal }),
//   setWeeklyGoal: (weeklyGoal) => set({ weeklyGoal }),
// }));

// /lib/store/useUserStore.ts
import { create } from "zustand";

interface UserStore {
  currency: string;
  dailyGoal: string;
  weeklyGoal: string;
  username: string;
  setCurrency: (currency: string) => void;
  setDailyGoal: (goal: string) => void;
  setWeeklyGoal: (goal: string) => void;
  setUsername: (username: string) => void;
}

export const useUserStore = create<UserStore>((set) => ({
  currency: "£", // default
  dailyGoal: "",
  weeklyGoal: "",
  username: "",
  setCurrency: (currency) => {
    // Add space for CHF
    const formatted = currency === "CHF" ? "CHF " : currency;
    set({ currency: formatted });
  },
  setDailyGoal: (goal) => set({ dailyGoal: goal }),
  setWeeklyGoal: (goal) => set({ weeklyGoal: goal }),
  setUsername: (username) => set({ username: username }),
}));

