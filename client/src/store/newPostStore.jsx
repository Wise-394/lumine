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
  codeBlockDescription:
    "The add function takes two numbers a and b and returns their sum using the + operator. The console.log call prints the result 8 to the console.",
  loading: false,
  error: null,
};

export const useNewPostStore = create((set) => ({
  ...initialState,

  updateField: (field, value) => {
    set({ [field]: value });
  },

  setLoading: (loading) => set({ loading }),

  setError: (error) => set({ error }),

  resetField: () => set({ ...initialState }),
}));
