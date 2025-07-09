import { create } from "zustand";

interface ClothConfigState {
  hexColor: string;
  updateColor: (color: string) => void;
  logoImg: string;
  updateLogoImg: (img: string) => void;
  logoPath: string;
  updateLogoPath: (path: string) => void;
  clothText: string;
  updateClothText: (path: string) => void;
  imageSize: number;
  updateImageSize: (size: number) => void;
  positionY: number;
  updatePositionY: (positionY: number) => void;
}

const useClothConfigStore = create<ClothConfigState>((set) => ({
  hexColor: "#24D6A6",
  updateColor: (color) => set(() => ({ hexColor: color })),

  logoImg: "",
  updateLogoImg: (img) => set(() => ({ logoImg: img })),

  logoPath: "",
  updateLogoPath: (path) => set(() => ({ logoPath: path })),

  clothText: "",
  updateClothText: (newText) => set(() => ({ clothText: newText })),

  imageSize: 15,
  updateImageSize: (size) => set(() => ({ imageSize: size })),

  positionY: 0,
  updatePositionY: (positionY) => set(() => ({ positionY })),
}));

export default useClothConfigStore;
