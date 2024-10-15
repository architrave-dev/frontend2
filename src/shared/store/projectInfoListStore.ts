import { create } from 'zustand';
import { ProjectInfoData } from '../dto/EntityRepository';
import { CreateProjectInfoReq, RemoveProjectInfoReq } from '../dto/ReqDtoRepository';

interface ProjectInfoListState {
  projectInfoList: ProjectInfoData[];
  setProjectInfoList: (projectInfos: ProjectInfoData[]) => void;
}

export const useProjectInfoListStore = create<ProjectInfoListState>((set) => ({
  projectInfoList: [],
  setProjectInfoList: (projectInfoList) => set({ projectInfoList }),
}));

interface ProjectInfoListStateForUpdate {
  createInfoList: CreateProjectInfoReq[];
  setCreateInfoList: (createInfoList: CreateProjectInfoReq[]) => void;
  updateInfoList: ProjectInfoData[];
  setUpdateInfoList: (updateInfoList: ProjectInfoData[]) => void;
  removeInfoList: RemoveProjectInfoReq[];
  setRemoveInfoList: (removeInfoList: RemoveProjectInfoReq[]) => void;
  clearAll: () => void;
}

export const useProjectInfoListStoreForUpdate = create<ProjectInfoListStateForUpdate>((set) => ({
  createInfoList: [],
  setCreateInfoList: (createInfoList) => set({ createInfoList }),
  updateInfoList: [],
  setUpdateInfoList: (updateInfoList) => set({ updateInfoList }),
  removeInfoList: [],
  setRemoveInfoList: (removeInfoList) => set({ removeInfoList }),
  clearAll: () => set({ createInfoList: [], updateInfoList: [], removeInfoList: [] })
}));