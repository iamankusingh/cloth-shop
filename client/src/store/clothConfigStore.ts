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
  logoPositionX: number;
  updateLogoPositionX: (positionX: number) => void;
  logoPositionY: number;
  updateLogoPositionY: (positionY: number) => void;
  logoUrl: string;
  updateLogoUrl: (url: string) => void;

  clothText: string;
  updateClothText: (newText: string) => void;
  clothFont: string;
  updateClothFont: (newFont: string) => void;
  clothTextSize: number;
  updateClothTextSize: (size: number) => void;
  clothTextPositionX: number;
  updateClothTextPositionX: (positionX: number) => void;
  clothTextPositionY: number;
  updateClothTextPositionY: (positionY: number) => void;
  clothTextColor: string;
  updateClothTextColor: (color: string) => void;

  design: string;
  updateDesign: (img: string) => void;
  designPath: string;
  updateDesignPath: (path: string) => void;
  designScale: number;
  updateDesignScale: (scale: number) => void;
  clothSize: string;
  updateClothSize: (size: string) => void;
  clothFabric: string;
  updateClothFabric: (fabric: string) => void;
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
  logoPositionX: 0,
  updateLogoPositionX: (positionX) => set(() => ({ logoPositionX: positionX })),
  logoPositionY: 0,
  updateLogoPositionY: (positionY) => set(() => ({ logoPositionY: positionY })),
  logoUrl: "",
  updateLogoUrl: (url) => set(() => ({ logoUrl: url })),

  clothText: "",
  updateClothText: (newText) => set(() => ({ clothText: newText })),
  clothFont: "/src/assets/fonts/Poppins-Regular.ttf",
  updateClothFont: (newFont) => set(() => ({ clothFont: newFont })),
  clothTextSize: 100,
  updateClothTextSize: (size) => set(() => ({ clothTextSize: size })),
  clothTextPositionX: 0,
  updateClothTextPositionX: (positionX) =>
    set(() => ({ clothTextPositionX: positionX })),
  clothTextPositionY: 100,
  updateClothTextPositionY: (positionY) =>
    set(() => ({ clothTextPositionY: positionY })),
  clothTextColor: "#ffffff",
  updateClothTextColor: (color) => set(() => ({ clothTextColor: color })),

  design: "",
  updateDesign: (img) => set(() => ({ design: img })),
  designPath: "",
  updateDesignPath: (path) => set(() => ({ designPath: path })),
  designScale: 100,
  updateDesignScale: (scale) => set(() => ({ designScale: scale })),
  clothSize: "",
  updateClothSize: (size) => set(() => ({ clothSize: size })),
  clothFabric: "",
  updateClothFabric: (fabric) => set(() => ({ clothFabric: fabric })),
}));

export default useClothConfigStore;
