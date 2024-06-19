import { create } from "zustand";

const useStore = create((set) => ({
  formula: [],
  setFormula: (newFormula) => set({ formula: newFormula }), // Define the setFormula function
  addTag: (tag) => set((state) => ({ formula: [...state.formula, tag] })),
  removeTag: (index) =>
    set((state) => ({ formula: state.formula.filter((_, i) => i !== index) })),
}));

export default useStore;
