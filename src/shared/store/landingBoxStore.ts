import { create } from 'zustand';
import defaultImage from '../../asset/project/launches_header_desktop.jpg'

export interface LandingBoxData {
  id: number;
  originUrl: string;
  title: string;
  description: string;
  isDeleted: boolean;
}
interface LandingBoxState {
  landingBox: LandingBoxData | null;
  setLandingBox: (value: LandingBoxData) => void;
}

export const useLandingBoxStore = create<LandingBoxState>((set) => ({
  landingBox: null,
  setLandingBox: (value) => set({ landingBox: value }),
}));