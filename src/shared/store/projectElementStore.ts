import { create } from 'zustand';
import { TextBoxAlignment, WorkAlignment, WorkDisplaySize } from '../component/SelectBox';
import { DividerType, ProjectElementType } from '../enum/EnumRepository';


export const getAreaFromSize = (value: SizeData): number => {
  if (value.depth) {
    return Number.parseInt(value.width) * Number.parseInt(value.height) * Number.parseInt(value.depth);
  } else {
    return Number.parseInt(value.width) * Number.parseInt(value.height);
  }
}

export const convertSizeToString = (value: SizeData): string => {
  if (value.depth) {
    return `${value.width}x${value.height}x${value.depth}`;
  } else {
    return `${value.width}x${value.height}`;
  }
}

export const convertStringToSize = (value: string): SizeData => {
  const dimensions = value.split('x').map(dim => dim.trim());

  if (dimensions.length < 2 || dimensions.length > 3) {
    throw new Error('Invalid size string format. Expected "widthxheight" or "widthxheightxdepth"');
  }

  const result: SizeData = {
    width: dimensions[0],
    height: dimensions[1]
  };

  if (dimensions.length === 3) {
    result.depth = dimensions[2];
  }

  return result;
}

// export const convertProjectElementReqToUpdateProjectElementReq = (): UpdateProjectElementReq => {

// }

export interface SizeData {
  width: string;
  height: string;
  depth?: string;
}

export interface WorkData {
  id: string;
  originUrl: string;
  thumbnailUrl: string;
  title: string;
  description: string;
  size: SizeData;
  material: string,
  prodYear: string,
}

export interface TextBoxData {
  id: string;
  content: string;
}

export interface ProjectElementData {
  id: string;
  projectElementType: ProjectElementType;
  work: WorkData | null;
  workAlignment: WorkAlignment | null;
  workDisplaySize: WorkDisplaySize | null;
  textBox: TextBoxData | null;
  textBoxAlignment: TextBoxAlignment | null;
  dividerType: DividerType | null;
}

export interface CreateWorkReq {
  originUrl: string;
  thumbnailUrl: string;
  title: string;
  description: string;
  size: SizeData;
  material: string,
  prodYear: string
}

export interface CreateTextBoxReq {
  content: string;
}

export interface CreateProjectElementReq {
  tempId: string;
  projectId: string;
  projectElementType: ProjectElementType;
  createWorkReq: CreateWorkReq | null;
  workAlignment: WorkAlignment | null;
  workDisplaySize: WorkDisplaySize | null;
  createTextBoxReq: CreateTextBoxReq | null,
  textBoxAlignment: TextBoxAlignment | null;
  dividerType: DividerType | null;
}

export interface UpdateWorkReq {
  id: string;
  originUrl: string;
  thumbnailUrl: string;
  title: string;
  description: string;
  size: SizeData;
  material: string,
  prodYear: string
}

export interface UpdateTextBoxReq {
  id: string;
  content: string;
}

export interface UpdateProjectElementReq {
  id: string;
  updateWorkReq?: UpdateWorkReq | null;
  workAlignment?: WorkAlignment | null;
  workDisplaySize?: WorkDisplaySize | null;
  updateTextBoxReq?: UpdateTextBoxReq | null,
  textBoxAlignment?: TextBoxAlignment | null;
  dividerType?: DividerType | null;
}

export interface RemoveProjectElementReq {
  id: string;
}

interface ProjectElementListState {
  projectElementList: ProjectElementData[];
  setProjectElementList: (projectElementList: ProjectElementData[]) => void;
}


export const useProjectElementListStore = create<ProjectElementListState>((set) => ({
  projectElementList: [],
  setProjectElementList: (projectElementList) => set({ projectElementList }),
}));

interface ProjectElementListStateForUpdate {
  createdProjectElements: CreateProjectElementReq[];
  setCreatedProjectElements: (createProjectElements: CreateProjectElementReq[]) => void;
  updatedProjectElements: UpdateProjectElementReq[];
  setUpdatedProjectElements: (updatedProjectElements: UpdateProjectElementReq[]) => void;
  removedProjectElements: RemoveProjectElementReq[];
  setRemovedProjectElements: (removeProjectElements: RemoveProjectElementReq[]) => void;
  clearAll: () => void;
}

export const useProjectElementListStoreForUpdate = create<ProjectElementListStateForUpdate>((set) => ({
  createdProjectElements: [],
  setCreatedProjectElements: (createdProjectElements) => set({ createdProjectElements }),
  updatedProjectElements: [],
  setUpdatedProjectElements: (updatedProjectElements) => set({ updatedProjectElements }),
  removedProjectElements: [],
  setRemovedProjectElements: (removedProjectElements) => set({ removedProjectElements }),
  clearAll: () => set({ createdProjectElements: [], updatedProjectElements: [], removedProjectElements: [] })
}));