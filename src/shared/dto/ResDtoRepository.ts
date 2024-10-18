import { CareerData, LandingBoxData, MemberInfoData, ProjectData, ProjectElementData, ProjectSimpleData, UserDataWithRefreshToken, WorkData } from './EntityRepository';


export interface AuthResponse {
  data: UserDataWithRefreshToken;
  authToken: string;
}

//-------------- LandingBox
export interface LandingBoxResponse {
  data: LandingBoxData;
}

export interface WorkListResponse {
  data: WorkData[];
}
export interface WorkResponse {
  data: WorkData;
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

