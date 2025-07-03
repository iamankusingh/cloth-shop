import { create } from "zustand";

interface ClothConfigState {
  hexColor: string;
  updateColor: (color: string) => void;
}

const useClothConfigStore = create<ClothConfigState>((set) => ({
  hexColor: "#24D6A6",
  updateColor: (color) => set(() => ({ hexColor: color })),
}));

export default useClothConfigStore;
