import { create } from "zustand";

interface UserState {
  isSignedIn: boolean;
  updateIsSignedIn: (isSignedIn: boolean) => void;
  uid: string;
  updateUid: (uid: string) => void;
}

const useUserStore = create<UserState>()((set) => ({
  isSignedIn: false,
  updateIsSignedIn: (isSignedIn) => set(() => ({ isSignedIn })),

  uid: "",
  updateUid: (uid) => set(() => ({ uid })),
}));

export default useUserStore;
