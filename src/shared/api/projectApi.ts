import axios, { AxiosError } from 'axios';
import { getConfig } from '../env/envManager';
import { ProjectSimpleData } from '../store/projectListStore';

const config = getConfig();

const projectListApi = axios.create({
  // baseURL: API_BASE_URL,
  baseURL: config.apiBaseUrl,
  headers: {
    'Content-Type': 'application/json',
  },
});

export interface ProjectResponse {
  data: ProjectSimpleData[];
}

export interface ErrorResponse {
  message: string;
  timestamp: string;
}

export const getProjectList = async (aui: string): Promise<ProjectResponse> => {
  try {
    const response = await projectListApi.get<ProjectResponse>('/api/v1/project/list?aui=' + aui);
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

export default projectListApi;