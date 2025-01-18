import { create } from 'zustand';
import { WorkData, WorkDetailData } from '../dto/EntityRepository';


interface WorkViewState {
  activeWork: WorkData | null;
  hasChanged: boolean;
  imageChanged: boolean;
  setActiveWork: (work: WorkData) => void;
  updateActiveWork: (updates: Partial<WorkData>) => void;
  updateImage: (thumbnailUrl: string, originUrl: string) => void;

  activeWorkDetailList: WorkDetailData[];
  setActiveWorkDetailList: (activeWorkDetailList: WorkDetailData[]) => void;
  clearActiveWork: () => void;
}

export const useWorkViewStore = create<WorkViewState>((set) => ({
  activeWork: null,
  hasChanged: false,
  imageChanged: false,
  setActiveWork: (activeWork) => set({ activeWork, hasChanged: false, imageChanged: false }),
  updateActiveWork: (updates) =>
    set(({ activeWork }) => ({
      activeWork: activeWork ?
        { ...activeWork, ...updates }
        : null,
      hasChanged: true
    })),

  updateImage: (thumbnailUrl: string, originUrl: string) =>
    set(({ activeWork }) => ({
      activeWork: activeWork ? {
        ...activeWork,
        uploadFile: {
          ...activeWork.uploadFile,
          originUrl,
          thumbnailUrl
        }
      } : null,
      hasChanged: true,
      imageChanged: true,
    })),

  activeWorkDetailList: [],
  setActiveWorkDetailList: (activeWorkDetailList) => set({ activeWorkDetailList }),
  clearActiveWork: () => set({ activeWork: null, activeWorkDetailList: [] })
}));