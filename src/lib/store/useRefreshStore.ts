// lib/store/useRefreshStore.ts
import { create } from 'zustand'

type RefreshStore = {
  refresh: boolean
  setRefresh: (value: boolean) => void
}

export const useRefreshStore = create<RefreshStore>((set) => ({
  refresh: false,
  setRefresh: (value) => set({ refresh: value }),
}))

