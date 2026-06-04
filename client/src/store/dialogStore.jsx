import { create } from "zustand";

export const useDialogStore = create((set) => ({
  isDialogOpen: false,
  toggleDialog: () => set((state) => ({ isDialogOpen: !state.isDialogOpen })),
}));
