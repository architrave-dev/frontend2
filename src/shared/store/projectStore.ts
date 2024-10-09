import { create } from 'zustand';
import { ProjectElementData } from './projectElementStore';
import { ProjectInfoData } from './projectInfoListStore';


export interface ProjectData {
  id: string;
  title: string;
  description: string;
  originUrl: string;
  thumbnailUrl: string;
  projectInfoList: ProjectInfoData[];
  projectElementList: ProjectElementData[];
}

interface ProjectState {
  project: ProjectData | null;
  setProject: (project: ProjectData) => void;
}

export const useProjectStore = create<ProjectState>((set) => ({
  project: null,
  setProject: (project) => set({ project }),
}));

interface ProjectStateForUpdate {
  updatedProject: ProjectData | null;
  setUpdatedProject: (updatedProject: ProjectData) => void;
}

export const useProjectStoreForUpdate = create<ProjectStateForUpdate>((set) => ({
  updatedProject: null,
  setUpdatedProject: (updatedProject) => set({ updatedProject }),
}));