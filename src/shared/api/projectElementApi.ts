import axios, { AxiosError } from 'axios';
import { getConfig } from '../env/envManager';
import { ErrorResponse, ProjectElementListResponse } from '../dto/ResDtoRepository';
import { UpdateProjectElementListReq } from '../dto/ReqDtoRepository';

const config = getConfig();

const projectElementApi = axios.create({
  // baseURL: API_BASE_URL,
  baseURL: config.apiBaseUrl,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const getProjectElementList = async (aui: string, projectId: string): Promise<ProjectElementListResponse> => {
  try {
    const response = await projectElementApi.get<ProjectElementListResponse>(`/api/v1/project-element?aui=${aui}&projectId=${projectId}`);
    return response.data;
  } catch (error) {
    throw handleApiError(error);
  }
};

export const updateProjectElementList = async (aui: string, data: UpdateProjectElementListReq): Promise<ProjectElementListResponse> => {
  try {
    const authToken = localStorage.getItem('authToken');
    if (!authToken) {
      throw new Error('Authentication required');
    }
    const response = await projectElementApi.put<ProjectElementListResponse>(`/api/v1/project-element?aui=${aui}`, data, {
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

export default projectElementApi;