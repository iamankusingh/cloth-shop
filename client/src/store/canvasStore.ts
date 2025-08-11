import { create } from "zustand";

interface UserState {
  show: boolean;
  updateShow: (isSignedIn: boolean) => void;
}

const useCanvasStore = create<UserState>()((set) => ({
  show: true,
  updateShow: (s) => set(() => ({ show: s })),
}));

export default useCanvasStore;
