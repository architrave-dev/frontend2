import { create } from 'zustand';
import defaultImage from '../asset/project/launches_header_desktop.jpg'

interface LandingBoxState {
  title: string;
  description: string;
  backgroundImageUrl: string;
  setTitle: (title: string) => void;
  setDescription: (description: string) => void;
  setBackgroundImageUrl: (url: string) => void;
}

export const useLandingBoxStore = create<LandingBoxState>((set) => ({
  title: 'Initial Title',
  description: 'Initial Description',
  backgroundImageUrl: defaultImage,
  setTitle: (title) => set({ title }),
  setDescription: (description) => set({ description }),
  setBackgroundImageUrl: (backgroundImageUrl) => set({ backgroundImageUrl }),
}));