import { create } from 'zustand';
import { ProjectInfoData } from '../dto/EntityRepository';

interface ProjectInfoListState {
  projectInfoList: ProjectInfoData[];
  setProjectInfoList: (projectInfos: ProjectInfoData[]) => void;
}

export const useProjectInfoListStore = create<ProjectInfoListState>((set) => ({
  projectInfoList: [],
  setProjectInfoList: (projectInfoList) => set({ projectInfoList }),
}));