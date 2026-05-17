import { create } from "zustand";

export const useNewPostStore = create((set) => ({
  title: "",
  description: "",
  language: "",
  codeBlockTitle: "",
  code: "",
  codeBlockDescription: "",

  updateField: (field, value) => {
    set({ [field]: value });
  },
}));
