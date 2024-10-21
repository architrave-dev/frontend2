import { CareerType, DividerType, ProjectElementType, TextBoxAlignment, WorkAlignment, WorkDisplaySize } from '../enum/EnumRepository';
import { IndexData, SizeData } from './EntityRepository';

//-------------- Auth
export interface SignUpReq {
  email: string;
  password: string;
  username: string;
}

export interface LoginReq {
  email: string;
  password: string;
}

export interface RefreshReq {
  refreshToken: string;
}

//-------------- Work
export interface CreateWorkReq {
  originUrl: string;
  thumbnailUrl: string;
  title: string;
  description: string;
  size: SizeData;
  material: string,
  prodYear: string
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

export interface DeleteWorkReq {
  workId: string;
}

//-------------- TextBox
export interface CreateTextBoxReq {
  content: string;
}

export interface UpdateTextBoxReq {
  id: string;
  content: string;
}


//-------------- Project
export interface CreateProjectReq {
  originUrl: string;
  thumbnailUrl: string;
  title: string;
  description: string;
}

export interface UpdateProjectReq {
  id: string;
  originUrl?: string;
  thumbnailUrl?: string;
  title?: string;
  description?: string;
  piIndexList: IndexData[];
  createdProjectInfoList?: CreateProjectInfoReq[];
  updatedProjectInfoList?: UpdatedProjectInfoReq[];
  removedProjectInfoList?: RemoveProjectInfoReq[];
}

export interface RemoveProjectReq {
  projectId: string;
}


//-------------- ProjectInfo
export interface CreateProjectInfoReq {
  tempId: string;
  customName: string;
  customValue: string;
}

export interface UpdatedProjectInfoReq {
  id: string;
  customName: string;
  customValue: string;
}

export interface RemoveProjectInfoReq {
  id: string;
}


//-------------- ProjectElement
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

export interface UpdateProjectElementReq {
  projectElementId: string;
  updateWorkReq?: UpdateWorkReq | null;
  workAlignment?: WorkAlignment | null;
  workDisplaySize?: WorkDisplaySize | null;
  updateTextBoxReq?: UpdateTextBoxReq | null,
  textBoxAlignment?: TextBoxAlignment | null;
  dividerType?: DividerType | null;
}

export interface RemoveProjectElementReq {
  projectElementId: string;
}

export interface UpdateProjectElementListReq {
  projectId: string;
  peIndexList: IndexData[];
  createProjectElements?: CreateProjectElementReq[];
  updatedProjectElements?: UpdateProjectElementReq[];
  removedProjectElements?: RemoveProjectElementReq[];
}

//-------------- Career
export interface CreateCareerReq {
  tempId: string;
  careerType: CareerType
  yearFrom: number;
  yearTo: number;
  content: string;
}

export interface UpdateCareerReq {
  careerId: string;
  yearFrom: number;
  yearTo: number;
  content: string;
}

export interface RemoveCareerReq {
  careerId: string;
}

export interface UpdatedCareerListReq {
  createCareerReqList?: CreateCareerReq[];
  updateCareerReqList?: UpdateCareerReq[];
  removeCareerReqList?: RemoveCareerReq[];
}
