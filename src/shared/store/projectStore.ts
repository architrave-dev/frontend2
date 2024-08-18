import { create } from 'zustand';
import { UserData } from './authStore';
import { DividerType } from '../Divider';

export enum TextBoxAlignment {
  LEFT = 'LEFT',
  CENTER = 'CENTER',
  RIGHT = 'RIGHT',
}

export enum WorkAlignment {
  LEFT = 'LEFT',
  CENTER = 'CENTER',
  RIGHT = 'RIGHT',
}

export enum ProjectElementType {
  WORK = 'WORK',
  TEXTBOX = 'TEXTBOX',
  DIVIDER = 'DIVIDER',
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

export interface ProjectInfoData {
  id: string;
  customName: string;
  customValue: string;
}
export interface SizeData {
  width: string;
  height: string;
  depth?: string;
}

export interface WorkData {
  id: string;
  member: UserData;
  originImgUrl: string;
  thumbnailUrl: string;
  title: string;
  description: string;
  size: SizeData;
  material: string,
  prodYear: string,
  isDeleted: boolean
}

export interface TextBoxData {
  id: string;
  content: string;
  isDeleted: boolean;
}

export interface ProjectElementData {
  id: string;
  projectElementType: ProjectElementType;
  order: string;
  work: WorkData | null;
  workAlignment: WorkAlignment | null;
  textBox: TextBoxData | null;
  textBoxAlignment: TextBoxAlignment | null;
  dividerType: DividerType | null;
}


export interface ProjectData {
  id: string;
  title: string;
  description: string;
  originUrl: string;
  thumbnailUrl: string;
  startDate: string;
  endDate: string;
  supportedBy: string;
  projectInfoList: ProjectInfoData[];
  projectElementList: ProjectElementData[];
  isDeleted: boolean;
}

interface ProjectState {
  project: ProjectData | null;
  setProject: (project: ProjectData) => void;
}

export const useProjectStore = create<ProjectState>((set) => ({
  project: null,
  setProject: (project) => set({ project }),
}));