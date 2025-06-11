// lib/store/useRefreshStore.ts
import { create } from 'zustand'

type RefreshUserDetailsStore = {
  refresh: boolean
  setRefresh: (value: boolean) => void
}

export const useRefreshUserDetailsStore = create<RefreshUserDetailsStore>((set) => ({
  refresh: false,
  setRefresh: (value) => set({ refresh: value }),
}))

