import { create } from "zustand";

const initialState = {
  title: "",
  description: "",
  language: "Javascript",
  codeBlockTitle: "add.js",
  code: `function add(a, b) {
  return a + b;
}

console.log(add(3, 5));`,
  codeBlockDescription: `The add function takes two numbers a and b and returns their sum 
using the + operator.`,
  loading: false,
  error: null,
};

export const useNewPostStore = create((set, get) => ({
  ...initialState,

  updateField: (field, value) => set({ [field]: value }),

  setLoading: (loading) => set({ loading }),

  setError: (error) => set({ error }),

  validate: () => {
    const { title, code, codeBlockTitle, language } = get();

    if (!title.trim() || title.length < 6)
      return (set({ error: "Title must be at least 6 characters." }), false);
    if (title.length > 256)
      return (set({ error: "Title must be at most 256 characters." }), false);

    if (!codeBlockTitle.trim() || codeBlockTitle.length < 6)
      return (
        set({ error: "File name must be at least 6 characters." }),
        false
      );
    if (codeBlockTitle.length > 256)
      return (
        set({ error: "File name must be at most 256 characters." }),
        false
      );

    if (!language.trim() || language.length < 1)
      return (set({ error: "Language is required." }), false);
    if (language.length > 50)
      return (set({ error: "Language must be at most 50 characters." }), false);

    if (!code.trim())
      return (set({ error: "Code block cannot be empty." }), false);

    return true;
  },

  resetField: () => set({ ...initialState }),
}));
