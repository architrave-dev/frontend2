import { create } from 'zustand';
import { CreateProjectInfoReq, RemoveProjectInfoReq } from '../api/projectApi';

export interface ProjectInfoData {
  id: string;
  customName: string;
  customValue: string;
}

interface ProjectInfoListState {
  projectInfoList: ProjectInfoData[];
  setProjectInfoList: (projectInfos: ProjectInfoData[]) => void;
  createInfoList: CreateProjectInfoReq[];
  setCreateInfoList: (createInfoList: CreateProjectInfoReq[]) => void;
  removeInfoList: RemoveProjectInfoReq[];
  setRemoveInfoList: (removeInfoList: RemoveProjectInfoReq[]) => void;
}

export const useProjectInfoListStore = create<ProjectInfoListState>((set) => ({
  projectInfoList: [],
  setProjectInfoList: (projectInfoList) => set({ projectInfoList }),
  createInfoList: [],
  setCreateInfoList: (createInfoList) => set({ createInfoList }),
  removeInfoList: [],
  setRemoveInfoList: (removeInfoList) => set({ removeInfoList }),
}));