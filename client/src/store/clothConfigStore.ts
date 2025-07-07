import { create } from "zustand";

interface ClothConfigState {
  hexColor: string;
  updateColor: (color: string) => void;
  logoPath: string;
  updateLogoPath: (path: string) => void;
  text: string;
  updateText: (path: string) => void;
}

const useClothConfigStore = create<ClothConfigState>((set) => ({
  hexColor: "#24D6A6",
  updateColor: (color) => set(() => ({ hexColor: color })),

  logoPath: "",
  updateLogoPath: (path) => set(() => ({ logoPath: path })),

  text: "",
  updateText: (newText) => set(() => ({ text: newText })),
}));

export default useClothConfigStore;
