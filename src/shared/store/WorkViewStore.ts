import { create } from 'zustand';
import { WorkData, WorkDetailData } from '../dto/EntityRepository';


interface WorkViewState {
  activeWork: WorkData | null;
  setActiveWork: (work: WorkData) => void;
  activeWorkDetailList: WorkDetailData[];
  setActiveWorkDetailList: (activeWorkDetailList: WorkDetailData[]) => void;
  clearActiveWork: () => void;
}

export const useWorkViewStore = create<WorkViewState>((set) => ({
  activeWork: null,
  setActiveWork: (activeWork) => set({ activeWork }),
  activeWorkDetailList: [],
  setActiveWorkDetailList: (activeWorkDetailList) => set({ activeWorkDetailList }),
  clearActiveWork: () => set({ activeWork: null, activeWorkDetailList: [] })
}));

interface WorkViewStateForUpdate {
  updatedActiveWork: WorkData | null;
  setUpdatedActiveWork: (updatedActiveWork: WorkData) => void;
  updateActiveWorkDetailList: WorkDetailData[];
  setUpdateActiveWorkDetailList: (activeWorkDetailList: WorkDetailData[]) => void;
  clearAll: () => void;
}

export const useWorkViewStoreForUpdate = create<WorkViewStateForUpdate>((set) => ({
  updatedActiveWork: null,
  setUpdatedActiveWork: (updatedActiveWork) => set({ updatedActiveWork }),
  updateActiveWorkDetailList: [],
  setUpdateActiveWorkDetailList: (updateActiveWorkDetailList) => set({ updateActiveWorkDetailList }),
  clearAll: () => set({ updatedActiveWork: null })
}));