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
  createPiList: CreateProjectInfoReq[];
  setCreatePiList: (createPiList: CreateProjectInfoReq[]) => void;
  updatePiList: ProjectInfoData[];
  setUpdatePiList: (updatePiList: ProjectInfoData[]) => void;
  removePiList: RemoveProjectInfoReq[];
  setRemovePiList: (removePiList: RemoveProjectInfoReq[]) => void;
  clearAll: () => void;
}

export const useProjectInfoListStoreForUpdate = create<ProjectInfoListStateForUpdate>((set) => ({
  createPiList: [],
  setCreatePiList: (createPiList) => set({ createPiList }),
  updatePiList: [],
  setUpdatePiList: (updatePiList) => set({ updatePiList }),
  removePiList: [],
  setRemovePiList: (removePiList) => set({ removePiList }),
  clearAll: () => set({ createPiList: [], updatePiList: [], removePiList: [] })
}));