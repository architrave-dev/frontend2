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
  setOnlyActiveWorkDetailList: (activeWorkDetailList: WorkDetailData[]) => void;
  setActiveWorkDetailList: (activeWorkDetailList: WorkDetailData[]) => void;
  updateActiveWorkDetailList: (id: string, updates: Partial<WorkDetailData>) => void;
  updateImageActiveWorkDetailList: (id: string, thumbnailUrl: string, originUrl: string) => void;
  afterDeleteActiveWorkDetailList: (id: string) => void;
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
  updateImageActiveWorkDetailList: (id, thumbnailUrl, originUrl) =>
    set(({ activeWorkDetailList }) => ({
      activeWorkDetailList: activeWorkDetailList.map((awd) =>
        awd.id === id ? {
          ...awd,
          uploadFile: {
            ...awd.uploadFile,
            originUrl,
            thumbnailUrl
          },
          hasChanged: true, imageChanged: true
        } : awd
      ),
    })),
  afterDeleteActiveWorkDetailList: (id) =>
    set(({ activeWorkDetailList }) => ({
      activeWorkDetailList: activeWorkDetailList.filter((awd) => awd.id !== id)
    })),
}));