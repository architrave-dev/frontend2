import { CareerData, BillboardData, MemberInfoData, ProjectData, ProjectElementData, ProjectSimpleData, UserDataWithRefreshToken, WorkData, WorkDetailData, WorkWithDetailData, WorkPropertyVisibleData, WorkSimpleData, WorkDetailSimpleData, ContactData, SettingData, ProjectInfoData } from './EntityRepository';


export interface AuthResponse {
  data: UserDataWithRefreshToken;
  authToken: string;
}

//-------------- LandingBox
export interface BillboardResponse {
  data: BillboardData;
}

//-------------- Work
export interface WorkListResponse {
  data: WorkData[];
}
export interface WorkResponse {
  data: WorkData;
}
export interface WorkSimpleListResponse {
  data: WorkSimpleData[];
}

//-------------- WorkPropertyVisible
export interface WorkPropertyVisibleResponse {
  data: WorkPropertyVisibleData;
}

//-------------- WorkDetail
export interface WorkDetailResponse {
  data: WorkDetailData;
}

export interface WorkDetailListResponse {
  data: WorkDetailData[];
}

export interface WorkDetailSimpleListResponse {
  data: WorkDetailSimpleData[];
}

//-------------- Work & Detail
export interface WorkWithDetailResponse {
  data: WorkWithDetailData;
}

export interface ProjectElementResponse {
  data: ProjectElementData;
}

export interface ProjectElementListResponse {
  data: {
    peIndex: string;
    projectElementList: ProjectElementData[];
  }
}
export interface ProjectListResponse {
  data: ProjectSimpleData[];
}
export interface CreatedProjectResponse {
  data: ProjectSimpleData;
}
export interface ProjectResponse {
  data: ProjectData;
}

export interface ProjectInfoResponse {
  data: ProjectInfoData;
}
export interface ProjectInfoListResponse {
  data: ProjectInfoData[];
}

//-------------- Member
export interface MemberResponse {
  data: string;
}

//-------------- MemberInfo
export interface MemberInfoResponse {
  data: MemberInfoData;
}

//-------------- Career
export interface CareerListResponse {
  data: CareerData[];
}
export interface CareerResponse {
  data: CareerData;
}

export interface DeleteResponse {
  data: string;
}

export interface ErrorResponse {
  errorCode: string;
  message: string;
  timestamp: string;
}
//-------------- Contact
export interface ContactResponse {
  data: ContactData;
}

//-------------- Setting
export interface SettingResponse {
  data: SettingData;
}