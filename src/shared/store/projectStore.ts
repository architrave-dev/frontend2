import { create } from 'zustand';
import { ProjectData } from '../dto/EntityRepository';


interface ProjectState {
  project: ProjectData | null;
  hasChanged: boolean;
  imageChanged: boolean;
  setProject: (project: ProjectData) => void;
  updateProject: (updates: Partial<ProjectData>) => void;
  updateImage: (originUrl: string) => void;
}

export const useProjectStore = create<ProjectState>((set) => ({
  project: null,
  hasChanged: false,
  imageChanged: false,
  setProject: (project) => set({ project, hasChanged: false, imageChanged: false }),
  updateProject: (updates) =>
    set(({ project }) => ({
      project: project ?
        { ...project, ...updates }
        : null,
      hasChanged: true
    })),

  updateImage: (originUrl: string) =>
    set(({ project }) => ({
      project: project ? {
        ...project,
        uploadFile: {
          ...project.uploadFile,
          originUrl,
        }
      } : null,
      hasChanged: true,
      imageChanged: true,
    })),
}));

interface ProjectChangeTrackingState {
  // project내의 모든 변경사항(project, projectInfo, projectElement)을 
  // follow up 하는 값
  allChanged: boolean;
  setAllChanged: (hasChanged: boolean) => void;
}

export const useProjectChangeTrackingStore = create<ProjectChangeTrackingState>((set) => ({
  allChanged: false,
  setAllChanged: (hasChanged: boolean) => set({ allChanged: hasChanged }),
}));