import { CareerData, BillboardData, MemberInfoData, ProjectData, ProjectElementData, ProjectSimpleData, UserDataWithRefreshToken, WorkData, WorkDetailData, WorkWithDetailData, WorkPropertyVisibleData, WorkSimpleData, WorkDetailSimpleData, ContactData, SettingData, ProjectInfoData, MemberSearchData, UserData, ContactPropertyVisibleData } from './EntityRepository';


export interface AuthResponse {
  data: UserDataWithRefreshToken;
  authToken: string;
}

export interface SimpleStringResponse {
  data: {
    message: string;
    value?: string;
  }
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
  data: ProjectElementData[];
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

export interface MemberSimpleResponse {
  data: UserData;
}
export interface SearchResponse {
  data: {
    memberSearchList: MemberSearchData[];
  }
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

//-------------- ContactPropertyVisible
export interface ContactPropertyVisibleResponse {
  data: ContactPropertyVisibleData;
}

//-------------- Setting
export interface SettingResponse {
  data: SettingData;
}

//-------------- Reorder
export interface ReorderResponse {
  data: string;
}