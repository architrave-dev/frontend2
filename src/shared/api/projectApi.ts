import axios, { AxiosError } from 'axios';
import { getConfig } from '../env/envManager';
import { ProjectSimpleData } from '../store/projectListStore';
import { ProjectData } from '../store/projectStore';

const config = getConfig();

const projectApi = axios.create({
  // baseURL: API_BASE_URL,
  baseURL: config.apiBaseUrl,
  headers: {
    'Content-Type': 'application/json',
  },
});

export interface ProjectListResponse {
  data: ProjectSimpleData[];
}
export interface CreatedProjectResponse {
  data: ProjectSimpleData;
}
export interface ProjectResponse {
  data: ProjectData;
}

export interface ErrorResponse {
  errorCode: string;
  timestamp: string;
}

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


export interface UpdateProjectReq {
  id: string;
  originUrl?: string;
  thumbnailUrl?: string;
  title?: string;
  description?: string;
  startDate?: string;
  endDate?: string;
  supportedBy?: string;
  createdProjectInfoList?: CreateProjectInfoReq[];
  updatedProjectInfoList?: UpdatedProjectInfoReq[];
  removedProjectInfoList?: RemoveProjectInfoReq[];
  isDeleted: boolean;
}

export interface CreateProjectReq {
  originUrl: string;
  thumbnailUrl: string;
  title: string;
  description: string;
}

export const getProjectList = async (aui: string): Promise<ProjectListResponse> => {
  try {
    const response = await projectApi.get<ProjectListResponse>('/api/v1/project/list?aui=' + aui);
    return response.data;
  } catch (error) {
    throw handleApiError(error);
  }
};

export const getProjectDetail = async (aui: string, title: string): Promise<ProjectResponse> => {
  try {
    const response = await projectApi.get<ProjectResponse>(`/api/v1/project?aui=${aui}&title=${title}`);
    return response.data;
  } catch (error) {
    throw handleApiError(error);
  }
};

export const updateProject = async (aui: string, data: UpdateProjectReq): Promise<ProjectResponse> => {
  try {
    const authToken = localStorage.getItem('authToken');
    if (!authToken) {
      throw new Error('Authentication required');
    }
    const response = await projectApi.put<ProjectResponse>(`/api/v1/project?aui=${aui}`, data, {
      headers: { Authorization: `${authToken}` }
    });
    return response.data;
  } catch (error) {
    throw handleApiError(error);
  }
};

export const createProject = async (aui: string, data: CreateProjectReq): Promise<CreatedProjectResponse> => {
  try {
    const authToken = localStorage.getItem('authToken');
    if (!authToken) {
      throw new Error('Authentication required');
    }
    const response = await projectApi.post<ProjectResponse>(`/api/v1/project?aui=${aui}`, data, {
      headers: { Authorization: `${authToken}` }
    });
    return response.data;
  } catch (error) {
    throw handleApiError(error);
  }
};

const handleApiError = (error: unknown): Error => {
  if (axios.isAxiosError(error)) {
    const axiosError = error as AxiosError<ErrorResponse>;
    if (axiosError.response?.data) {
      return new Error(axiosError.response.data.errorCode);
    }
  }
  return new Error('An unexpected error occurred');
};

export default projectApi;



