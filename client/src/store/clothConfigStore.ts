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
  designImg: string;
  updateDesignImg: (img: string) => void;
  designImgPath: string;
  updateDesignImgPath: (path: string) => void;
  designScale: number;
  updateDesignScale: (scale: number) => void;
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

  designImg: "",
  updateDesignImg: (img) => set(() => ({ designImg: img })),

  designImgPath: "",
  updateDesignImgPath: (path) => set(() => ({ designImgPath: path })),

  designScale: 0,
  updateDesignScale: (scale) => set(() => ({ designScale: scale })),
}));

export default useClothConfigStore;
