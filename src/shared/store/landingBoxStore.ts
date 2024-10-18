import { create } from 'zustand';
import { LandingBoxData } from '../dto/EntityRepository';

interface LandingBoxState {
  landingBox: LandingBoxData | null;
  setLandingBox: (value: LandingBoxData) => void;
}

export const useLandingBoxStore = create<LandingBoxState>((set) => ({
  landingBox: null,
  setLandingBox: (value) => set({ landingBox: value }),
}));