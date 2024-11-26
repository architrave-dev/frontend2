import { create } from 'zustand';


interface OriginImgState {
  originUrl: string | null;
  setOriginUrl: (originUrl: string) => void;
  clearOriginUrl: () => void;
}

export const useOriginImgStore = create<OriginImgState>()((set) => ({
  originUrl: null,
  setOriginUrl: (originUrl: string) => set({ originUrl }),
  clearOriginUrl: () => set({ originUrl: null })
}));