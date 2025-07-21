import { create } from "zustand";

export interface ClothConfigState {
  hexColor: string;
  updateHexColor: (color: string) => void;
  logo: string;
  updateLogo: (img: string) => void;
  logoPath: string;
  updateLogoPath: (path: string) => void;
  logoSize: number;
  updateLogoSize: (size: number) => void;
  logoPositionY: number;
  updateLogoPositionY: (positionY: number) => void;
  clothText: string;
  updateClothText: (newText: string) => void;
  design: string;
  updateDesign: (img: string) => void;
  designPath: string;
  updateDesignPath: (path: string) => void;
  designScale: number;
  updateDesignScale: (scale: number) => void;
}

const useClothConfigStore = create<ClothConfigState>((set) => ({
  hexColor: "#24D6A6",
  updateHexColor: (color) => set(() => ({ hexColor: color })),

  logo: "",
  updateLogo: (img) => set(() => ({ logo: img })),

  logoPath: "",
  updateLogoPath: (path) => set(() => ({ logoPath: path })),

  logoSize: 15,
  updateLogoSize: (size) => set(() => ({ logoSize: size })),

  logoPositionY: 0,
  updateLogoPositionY: (positionY) => set(() => ({ logoPositionY: positionY })),

  clothText: "",
  updateClothText: (newText) => set(() => ({ clothText: newText })),

  design: "",
  updateDesign: (img) => set(() => ({ design: img })),

  designPath: "",
  updateDesignPath: (path) => set(() => ({ designPath: path })),

  designScale: 50,
  updateDesignScale: (scale) => set(() => ({ designScale: scale })),
}));

export default useClothConfigStore;
