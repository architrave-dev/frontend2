import { create } from 'zustand';

export interface ProjectSimpleData {
  id: string;
  title: string;
  description: string;
  originUrl: string;
  thumbnailUrl: string;
}

interface ProjectListState {
  projects: ProjectSimpleData[];
  setProjects: (projects: ProjectSimpleData[]) => void;
}

export const useProjectListStore = create<ProjectListState>((set) => ({
  projects: [],
  setProjects: (projects) => set({ projects }),
}));