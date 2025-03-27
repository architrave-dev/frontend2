import { CareerType, DividerType, ProjectElementType, TextAlignment, DisplayAlignment, DisplaySize, WorkType, CountryType } from '../enum/EnumRepository';
import { MenuVisible, SizeData } from './EntityRepository';

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

export interface ActivateReq {
  key: string;
  verificationCode: string;
}

export interface UpdateUploadFileReq {
  uploadFileId: string;
  originUrl: string;
}

//-------------- Member
export interface UpdateMemberReq {
  id: string;
  username: string;
}

export interface UpdatePasswordReq {
  id: string;
  password: string;
  newPassword: string;
}

//-------------- Billboard
export interface UpdateBillboardReq {
  id: string;
  updateUploadFileReq: UpdateUploadFileReq;
  title: string;
  description: string;
  isVisible: boolean;
}

//-------------- Work
export interface CreateWorkReq {
  workType: WorkType;
  originUrl: string;
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
  updateUploadFileReq: UpdateUploadFileReq;
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
  originUrl: string;
  description: string;
}

export interface UpdateWorkDetailReq {
  id: string;
  workId: string;
  updateUploadFileReq: UpdateUploadFileReq;
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
  description: string;
}

export interface UpdateDocumentReq {
  id: string;
  updateUploadFileReq: UpdateUploadFileReq;
  description: string;
}

//-------------- Project
export interface CreateProjectReq extends IndexableReq {
  originUrl: string;
  title: string;
  description: string;
}

export interface UpdateProjectReq {
  id: string;
  title: string;
  description: string;
  updateUploadFileReq: UpdateUploadFileReq;
}

export interface RemoveProjectReq {
  projectId: string;
}


//-------------- ProjectInfo
export interface CreateProjectInfoReq extends IndexableReq {
  projectId: string;
  customName: string;
  customValue: string;
}

export interface UpdateProjectInfoReq {
  id: string;
  customName: string;
  customValue: string;
}

export interface RemoveProjectInfoReq {
  id: string;
}

export interface IndexableReq {
  index: number;
}

//-------------- ProjectElement
export interface CreateProjectElementWithWorkReq extends IndexableReq {
  projectId: string;
  workId: string;
  displayAlignment: DisplayAlignment;
  displaySize: DisplaySize;
}
export interface CreateProjectElementWithWorkDetailReq extends IndexableReq {
  projectId: string;
  workDetailId: string;
  displayAlignment: DisplayAlignment;
  displaySize: DisplaySize;
}

// This is key to making a union workable
export interface CreateProjectElementReqBase extends IndexableReq {
  projectId: string;
  projectElementType: ProjectElementType;
}

export interface CreateProjectElementReqWork extends CreateProjectElementReqBase {
  projectElementType: ProjectElementType.WORK;
  createWorkReq: CreateWorkReq;
  displayAlignment: DisplayAlignment;
  displaySize: DisplaySize,
}

export interface CreateProjectElementReqDetail extends CreateProjectElementReqBase {
  projectElementType: ProjectElementType.DETAIL;
  createWorkDetailReq: CreateWorkDetailReq;
  displayAlignment: DisplayAlignment;
  displaySize: DisplaySize,
}

export interface CreateProjectElementReqDocument extends CreateProjectElementReqBase {
  projectElementType: ProjectElementType.DOCUMENT;
  createDocumentReq: CreateDocumentReq;
  displayAlignment: DisplayAlignment;
}

export interface CreateProjectElementReqTextBox extends CreateProjectElementReqBase {
  projectElementType: ProjectElementType.TEXTBOX;
  createTextBoxReq: CreateTextBoxReq;
  textAlignment: TextAlignment;
}

export interface CreateProjectElementReqDivider extends CreateProjectElementReqBase {
  projectElementType: ProjectElementType.DIVIDER;
  dividerType: DividerType;
}

export type CreateProjectElementReq =
  | CreateProjectElementReqWork
  | CreateProjectElementReqDetail
  | CreateProjectElementReqDocument
  | CreateProjectElementReqTextBox
  | CreateProjectElementReqDivider;

export interface UpdateProjectElementReqBase {
  projectElementId: string;
  projectElementType: ProjectElementType;
}

export interface UpdateProjectElementReqWork extends UpdateProjectElementReqBase {
  projectElementType: ProjectElementType.WORK;
  updateWorkReq: UpdateWorkReq;
  displayAlignment: DisplayAlignment;
  displaySize: DisplaySize;
}

export interface UpdateProjectElementReqDetail extends UpdateProjectElementReqBase {
  projectElementType: ProjectElementType.DETAIL;
  updateWorkDetailReq: UpdateWorkDetailReq;
  displayAlignment: DisplayAlignment;
  displaySize: DisplaySize;
}

export interface UpdateProjectElementReqDocument extends UpdateProjectElementReqBase {
  projectElementType: ProjectElementType.DOCUMENT;
  updateDocumentReq: UpdateDocumentReq;
  displayAlignment: DisplayAlignment;
}

export interface UpdateProjectElementReqTextBox extends UpdateProjectElementReqBase {
  projectElementType: ProjectElementType.TEXTBOX;
  updateTextBoxReq: UpdateTextBoxReq;
  textAlignment: TextAlignment;
}

export interface UpdateProjectElementReqDivider extends UpdateProjectElementReqBase {
  projectElementType: ProjectElementType.DIVIDER;
  dividerType: DividerType;
}

export type UpdateProjectElementReq =
  | UpdateProjectElementReqWork
  | UpdateProjectElementReqDetail
  | UpdateProjectElementReqDocument
  | UpdateProjectElementReqTextBox
  | UpdateProjectElementReqDivider;


export interface DeleteProjectElementReq {
  projectElementId: string;
}

//-------------- MemberInfo
export interface UpdateMemberInfoReq {
  id: string;
  updateUploadFileReq: UpdateUploadFileReq;
  name: string;
  year: string;
  country: CountryType;
  email: string;
  contact: string;
  description: string;
}

//-------------- Career
export interface CreateCareerReq extends IndexableReq {
  careerType: CareerType
  yearFrom: number;
  content: string;
}

export interface UpdateCareerReq {
  careerId: string;
  yearFrom: string;
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

//-------------- Contact
export interface UpdateContactReq {
  id: string;
  address: string;
  email: string;
  contact: string;
  twitter: string;
  instagram: string;
  facebook: string;
  threads: string;
  behance: string;
  youtube: string;
  vimeo: string;
  url1: string;
}

//-------------- ContactPropertyVisible
export interface UpdateContactPropertyVisibleReq {
  contactPropertyVisibleId: string;
  address: boolean;
  email: boolean;
  contact: boolean;
  twitter: boolean;
  instagram: boolean;
  facebook: boolean;
  youtube: boolean;
  url1: boolean;
}

//-------------- Setting
export interface UpdateSettingReq {
  id: string;
  pageName: string;
  pageVisible: boolean;
  menuVisible: MenuVisible;
}

//-------------- Email
export interface EmailRequest {
  from: string;
  to: string;
  subject: string;
  body: string;
}

//-------------- Reorder
export interface ReorderReq {
  index: number;
  id: string;
}

export interface UpdateReorderListReq {
  id: string;
  reorderReqList: ReorderReq[];
}

//-------------- MetadataForQuery
export interface MetadataForQuery {
  page: number;
  size: number;
}