import { create } from 'zustand';

export interface LandingBoxData {
  id: number;
  originUrl: string;
  thumbnailUrl: string;
  title: string;
  description: string;
  isVisible: boolean;
}
interface LandingBoxState {
  landingBox: LandingBoxData | null;
  setLandingBox: (value: LandingBoxData) => void;
}

export const useLandingBoxStore = create<LandingBoxState>((set) => ({
  landingBox: null,
  setLandingBox: (value) => set({ landingBox: value }),
}));