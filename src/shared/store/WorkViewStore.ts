import { create } from 'zustand';
import { WorkData, WorkDetailData } from '../dto/EntityRepository';


interface WorkViewState {
  activeWork: WorkData | null;
  hasChanged: boolean;
  imageChanged: boolean;
  setActiveWork: (activeWork: WorkData) => void;
  updateActiveWork: (updates: Partial<WorkData>) => void;
  updateImage: (originUrl: string) => void;
  afterDeleteActiveWork: () => void;

  activeWorkDetailList: WorkDetailData[];
  setOnlyActiveWorkDetailList: (activeWorkDetailList: WorkDetailData[]) => void;
  setActiveWorkDetailList: (activeWorkDetailList: WorkDetailData[]) => void;
  updateActiveWorkDetailList: (id: string, updates: Partial<WorkDetailData>) => void;
  updateImageActiveWorkDetailList: (id: string, originUrl: string) => void;
  afterDeleteActiveWorkDetail: (id: string) => void;
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

  updateImage: (originUrl: string) =>
    set(({ activeWork }) => ({
      activeWork: activeWork ? {
        ...activeWork,
        uploadFile: {
          ...activeWork.uploadFile,
          originUrl,
        }
      } : null,
      hasChanged: true,
      imageChanged: true,
    })),
  afterDeleteActiveWork: () => set({ activeWork: null, hasChanged: false, imageChanged: false, activeWorkDetailList: [] }),

  activeWorkDetailList: [],
  setOnlyActiveWorkDetailList: (activeWorkDetailList) => set({ activeWorkDetailList }),
  setActiveWorkDetailList: (activeWorkDetailList) =>
    set(() => ({
      activeWorkDetailList: activeWorkDetailList.map((awd) => ({ ...awd, hasChanged: false, imageChanged: false })),
    })),
  updateActiveWorkDetailList: (id, updates) =>
    set(({ activeWorkDetailList }) => ({
      activeWorkDetailList: activeWorkDetailList.map((awd) =>
        awd.id === id ?
          { ...awd, ...updates, hasChanged: true }
          : awd
      ),
    })),
  updateImageActiveWorkDetailList: (id, originUrl) =>
    set(({ activeWorkDetailList }) => ({
      activeWorkDetailList: activeWorkDetailList.map((awd) =>
        awd.id === id ? {
          ...awd,
          uploadFile: {
            ...awd.uploadFile,
            originUrl,
          },
          hasChanged: true, imageChanged: true
        } : awd
      ),
    })),
  afterDeleteActiveWorkDetail: (id) =>
    set(({ activeWorkDetailList }) => ({
      activeWorkDetailList: activeWorkDetailList.filter((awd) => awd.id !== id)
    })),
}));