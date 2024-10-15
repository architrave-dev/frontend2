import { create } from 'zustand';
import { ProjectData } from '../dto/EntityRepository';


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