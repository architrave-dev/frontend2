import { create } from 'zustand';
import { ProjectInfoData } from '../dto/EntityRepository';

interface ProjectInfoListState {
  projectInfoList: ProjectInfoData[];
  setOnlyProjectInfoList: (projectInfos: ProjectInfoData[]) => void;
  setProjectInfoList: (projectInfos: ProjectInfoData[]) => void;
  updateProjectInfo: (id: string, updates: Partial<ProjectInfoData>) => void;
  afterDeleteProjectInfo: (id: string) => void;
}

export const useProjectInfoListStore = create<ProjectInfoListState>((set) => ({
  projectInfoList: [],
  setOnlyProjectInfoList: (projectInfoList) => set({ projectInfoList }),
  setProjectInfoList: (projectInfoList) =>
    set(() => ({
      projectInfoList: projectInfoList.map((pi) => ({ ...pi, hasChanged: false })),
    })),
  updateProjectInfo: (id, updates) =>
    set(({ projectInfoList }) => ({
      projectInfoList: projectInfoList.map((pi) =>
        pi.id === id ?
          { ...pi, ...updates, hasChanged: true }
          : pi
      ),
    })),
  afterDeleteProjectInfo: (id) =>
    set(({ projectInfoList }) => ({
      projectInfoList: projectInfoList.filter((pi) => pi.id !== id)
    }))
}));