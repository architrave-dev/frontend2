import { create } from 'zustand';
import { ProjectElementData } from '../dto/EntityRepository';
import { CreateProjectElementReq, RemoveProjectElementReq, UpdateProjectElementReq } from '../dto/ReqDtoRepository';
interface ProjectElementListState {
  projectElementList: ProjectElementData[];
  setProjectElementList: (projectElementList: ProjectElementData[]) => void;
}


export const useProjectElementListStore = create<ProjectElementListState>((set) => ({
  projectElementList: [],
  setProjectElementList: (projectElementList) => set({ projectElementList }),
}));

interface ProjectElementListStateForUpdate {
  // createdProjectElements: CreateProjectElementReq[];
  // setCreatedProjectElements: (createProjectElements: CreateProjectElementReq[]) => void;
  updatedProjectElements: UpdateProjectElementReq[];
  setUpdatedProjectElements: (updatedProjectElements: UpdateProjectElementReq[]) => void;
  removedProjectElements: RemoveProjectElementReq[];
  setRemovedProjectElements: (removeProjectElements: RemoveProjectElementReq[]) => void;
  clearAll: () => void;
}

export const useProjectElementListStoreForUpdate = create<ProjectElementListStateForUpdate>((set) => ({
  // createdProjectElements: [],
  // setCreatedProjectElements: (createdProjectElements) => set({ createdProjectElements }),
  updatedProjectElements: [],
  setUpdatedProjectElements: (updatedProjectElements) => set({ updatedProjectElements }),
  removedProjectElements: [],
  setRemovedProjectElements: (removedProjectElements) => set({ removedProjectElements }),
  clearAll: () => set({ updatedProjectElements: [], removedProjectElements: [] })
  // clearAll: () => set({ createdProjectElements: [], updatedProjectElements: [], removedProjectElements: [] })
}));