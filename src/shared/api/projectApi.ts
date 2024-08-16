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
export interface ProjectResponse {
  data: ProjectData;
}

export interface ErrorResponse {
  message: string;
  timestamp: string;
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

const handleApiError = (error: unknown): Error => {
  if (axios.isAxiosError(error)) {
    const axiosError = error as AxiosError<ErrorResponse>;
    if (axiosError.response?.data) {
      return new Error(axiosError.response.data.message);
    }
  }
  return new Error('An unexpected error occurred');
};

export default projectApi;



