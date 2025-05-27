import { create } from 'zustand'

type JobStore = {
  selectedJobIds: number[];
  setSelectedJobIds: (ids: number[]) => void;
  clearSelectedJobIds: () => void;
};

export const useJobStore = create<JobStore>((set) => ({
  selectedJobIds: [],
  setSelectedJobIds: (ids) => set({ selectedJobIds: ids }),
  clearSelectedJobIds: () => set({ selectedJobIds: [] }),
}));