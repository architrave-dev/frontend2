import { create } from 'zustand';
import { ProjectData } from '../dto/EntityRepository';


interface ProjectState {
  project: ProjectData | null;
  hasChanged: boolean;
  imageChanged: boolean;
  setProject: (project: ProjectData) => void;
  updateProject: (updates: Partial<ProjectData>) => void;
  updateImage: (thumbnailUrl: string, originUrl: string) => void;
}

export const useProjectStore = create<ProjectState>((set) => ({
  project: null,
  hasChanged: false,
  imageChanged: false,
  setProject: (project) => set({ project }),
  updateProject: (updates) =>
    set(({ project }) => ({
      project: project ?
        { ...project, ...updates }
        : null,
      hasChanged: true
    })),

  updateImage: (thumbnailUrl: string, originUrl: string) =>
    set(({ project }) => ({
      project: project ? {
        ...project,
        uploadFile: {
          ...project.uploadFile,
          originUrl,
          thumbnailUrl
        }
      } : null,
      hasChanged: true,
      imageChanged: true,
    })),
}));