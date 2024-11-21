import { CareerData, BillboardData, MemberInfoData, ProjectData, ProjectElementData, ProjectSimpleData, UserDataWithRefreshToken, WorkData, WorkDetailData, WorkWithDetailData, WorkPropertyVisibleData } from './EntityRepository';


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

//-------------- Work & Detail
export interface WorkWithDetailResponse {
  data: WorkWithDetailData;
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


export interface DeleteResponse {
  data: string;
}

export interface ErrorResponse {
  errorCode: string;
  timestamp: string;
}

