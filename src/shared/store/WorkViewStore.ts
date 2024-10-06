import { create } from 'zustand';
import { WorkData } from './WorkListStore';


interface WorkViewState {
  activeWork: WorkData | null;
  setActiveWork: (work: WorkData) => void;
}

export const useWorkViewStore = create<WorkViewState>((set) => ({
  activeWork: null,
  setActiveWork: (activeWork) => set({ activeWork })
}));

interface WorkViewStateForUpdate {
  updatedActiveWork: WorkData | null;
  setUpdatedActiveWork: (updatedActiveWork: WorkData) => void;
}

export const useWorkViewStoreForUpdate = create<WorkViewStateForUpdate>((set) => ({
  updatedActiveWork: null,
  setUpdatedActiveWork: (updatedActiveWork) => set({ updatedActiveWork }),
}));