import { create } from 'zustand';
import { WorkData } from '../dto/EntityRepository';


interface WorkViewState {
  activeWork: WorkData | null;
  setActiveWork: (work: WorkData) => void;
  clearActiveWork: () => void;
}

export const useWorkViewStore = create<WorkViewState>((set) => ({
  activeWork: null,
  setActiveWork: (activeWork) => set({ activeWork }),
  clearActiveWork: () => set({ activeWork: null })
}));

interface WorkViewStateForUpdate {
  updatedActiveWork: WorkData | null;
  setUpdatedActiveWork: (updatedActiveWork: WorkData) => void;
  clearAll: () => void;
}

export const useWorkViewStoreForUpdate = create<WorkViewStateForUpdate>((set) => ({
  updatedActiveWork: null,
  setUpdatedActiveWork: (updatedActiveWork) => set({ updatedActiveWork }),
  clearAll: () => set({ updatedActiveWork: null })
}));