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
  updatedProjectDto: ProjectData | null;
  setUpdatedProjectDto: (updatedProjectDto: ProjectData) => void;
}

export const useProjectStoreForUpdate = create<ProjectStateForUpdate>((set) => ({
  updatedProjectDto: null,
  setUpdatedProjectDto: (updatedProjectDto) => set({ updatedProjectDto }),
}));