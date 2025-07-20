import { create } from "zustand";

interface ClothConfigState {
  uid: string;
  updateUid: (uid: string) => void;
  hexColor: string;
  updateColor: (color: string) => void;
  logoImg: string;
  updateLogoImg: (img: string) => void;
  logoPath: string;
  updateLogoPath: (path: string) => void;
  logoSize: number;
  updateLogoImageSize: (size: number) => void;
  logoPositionY: number;
  updateLogoPositionY: (positionY: number) => void;
  clothText: string;
  updateClothText: (path: string) => void;
  designImg: string;
  updateDesignImg: (img: string) => void;
  designImgPath: string;
  updateDesignImgPath: (path: string) => void;
  designImageScale: number;
  updateDesignImageScale: (scale: number) => void;
}

const useClothConfigStore = create<ClothConfigState>((set) => ({
  uid: "",
  updateUid: (uid) => set(() => ({ uid })),

  hexColor: "#24D6A6",
  updateColor: (color) => set(() => ({ hexColor: color })),

  logoImg: "",
  updateLogoImg: (img) => set(() => ({ logoImg: img })),

  logoPath: "",
  updateLogoPath: (path) => set(() => ({ logoPath: path })),

  logoSize: 15,
  updateLogoImageSize: (size) => set(() => ({ logoSize: size })),

  logoPositionY: 0,
  updateLogoPositionY: (positionY) => set(() => ({ logoPositionY: positionY })),

  clothText: "",
  updateClothText: (newText) => set(() => ({ clothText: newText })),

  designImg: "",
  updateDesignImg: (img) => set(() => ({ designImg: img })),

  designImgPath: "",
  updateDesignImgPath: (path) => set(() => ({ designImgPath: path })),

  designImageScale: 0,
  updateDesignImageScale: (scale) => set(() => ({ designImageScale: scale })),
}));

export default useClothConfigStore;
