import { create } from "zustand";

const useStore = create((set) => ({
  formula: [],
  addTag: (tag) => set((state) => ({ formula: [...state.formula, tag] })),
  removeTag: (index) =>
    set((state) => ({ formula: state.formula.filter((_, i) => i !== index) })),
}));

export default useStore;
