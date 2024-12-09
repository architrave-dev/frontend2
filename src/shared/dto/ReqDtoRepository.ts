import { CareerType, DividerType, ProjectElementType, TextAlignment, DisplayAlignment, WorkDisplaySize, WorkType, CountryType } from '../enum/EnumRepository';
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

export interface UpdateUploadFileReq {
  uploadFileId: number;
  originUrl: string;
  thumbnailUrl: string;
}

//-------------- Billboard
export interface UpdateBillboardReq {
  id: number;
  updateUploadFileReq: UpdateUploadFileReq;
  title: string;
  description: string;
  isVisible: boolean;
}

//-------------- Work
export interface CreateWorkReq {
  workType: WorkType;
  originUrl: string;
  thumbnailUrl: string;
  title: string;
  description: string;
  size: SizeData;
  material: string,
  prodYear: string,
  price: string,
  collection: string
}

export interface UpdateWorkReq {
  id: string;
  workType: WorkType;
  originUrl: string;
  thumbnailUrl: string;
  title: string;
  description: string;
  size: SizeData;
  material: string;
  prodYear: string;
  price: string;
  collection: string
}

export interface DeleteWorkReq {
  workId: string;
}

//-------------- WorkPropertyVisible
export interface UpdateWorkPropertyVisibleReq {
  workPropertyVisibleId: string;
  workType: boolean;
  imageUrl: boolean;
  description: boolean;
  price: boolean;
  collection: boolean;
}

//-------------- WorkDetail
export interface CreateWorkDetailReq {
  workId: string;
  workType: WorkType;
  originUrl: string;
  thumbnailUrl: string;
  description: string;
}

export interface UpdateWorkDetailReq {
  workDetailId: string;
  workType: WorkType;
  originUrl: string;
  thumbnailUrl: string;
  description: string;
}

export interface DeleteWorkDetailReq {
  workId: string;
  workDetailId: string;
}


//-------------- TextBox
export interface CreateTextBoxReq {
  content: string;
}

export interface UpdateTextBoxReq {
  id: string;
  content: string;
}

//-------------- Document
export interface CreateDocumentReq {
  originUrl: string;
  thumbnailUrl: string;
  description: string;
}

export interface UpdateDocumentReq {
  id: string;
  originUrl: string;
  thumbnailUrl: string;
  description: string;
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
  title?: string;
  description?: string;
  originUrl?: string;
  thumbnailUrl?: string;
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
export interface CreateProjectElementWithWorkReq {
  projectId: string;
  workId: string;
  workAlignment: DisplayAlignment;
  workDisplaySize: WorkDisplaySize;
}

export interface CreateProjectElementReq {
  tempId: string;
  projectId: string;
  projectElementType: ProjectElementType;
  createWorkReq: CreateWorkReq | null;
  workAlignment: DisplayAlignment | null;
  workDisplaySize: WorkDisplaySize | null;
  createTextBoxReq: CreateTextBoxReq | null,
  textBoxAlignment: TextAlignment | null;
  createDocumentReq: CreateDocumentReq | null;
  documentAlignment: TextAlignment | null;
  dividerType: DividerType | null;
}

export interface UpdateProjectElementReq {
  projectElementId: string;
  updateWorkReq: UpdateWorkReq | null;
  workAlignment: DisplayAlignment | null;
  workDisplaySize: WorkDisplaySize | null;
  updateTextBoxReq: UpdateTextBoxReq | null,
  textBoxAlignment: TextAlignment | null;
  updateDocumentReq: UpdateDocumentReq | null;
  documentAlignment: TextAlignment | null;
  dividerType: DividerType | null;
}

export interface RemoveProjectElementReq {
  projectElementId: string;
}

export interface UpdateProjectElementListReq {
  projectId: string;
  peIndexList: IndexData[];
  createProjectElements: CreateProjectElementReq[];
  updatedProjectElements: UpdateProjectElementReq[];
  removedProjectElements: RemoveProjectElementReq[];
}

//-------------- MemberInfo
export interface UpdateMemberInfoReq {
  id: number;
  updateUploadFileReq: UpdateUploadFileReq;
  name: string;
  year: string;
  country: CountryType;
  email: string;
  contact: string;
  description: string;
}

//-------------- Career
export interface CreateCareerReq {
  tempId: string;
  careerType: CareerType
  yearFrom: number;
  content: string;
}

export interface UpdateCareerReq {
  careerId: string;
  yearFrom: number;
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
