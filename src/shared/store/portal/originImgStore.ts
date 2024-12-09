import { create } from 'zustand';


interface OriginImgState {
  originUrl: string;
  setOriginUrl: (originUrl: string) => void;
  clearOriginUrl: () => void;
}

export const useOriginImgStore = create<OriginImgState>()((set) => ({
  originUrl: "",
  setOriginUrl: (originUrl: string) => set({ originUrl }),
  clearOriginUrl: () => set({ originUrl: "" })
}));