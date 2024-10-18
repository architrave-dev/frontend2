import { create } from 'zustand';
import { ProjectSimpleData } from '../dto/EntityRepository';



interface ProjectListState {
  projects: ProjectSimpleData[];
  setProjects: (projects: ProjectSimpleData[]) => void;
}

export const useProjectListStore = create<ProjectListState>((set) => ({
  projects: [],
  setProjects: (projects) => set({ projects }),
}));