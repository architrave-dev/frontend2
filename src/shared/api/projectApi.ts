import axios, { AxiosError } from 'axios';
import { getConfig } from '../env/envManager';
import { DeleteResponse, ErrorResponse, ProjectListResponse, ProjectResponse } from '../dto/ResDtoRepository';
import { CreateProjectReq, RemoveProjectReq, UpdateProjectReq } from '../dto/ReqDtoRepository';

const config = getConfig();

const projectApi = axios.create({
  // baseURL: API_BASE_URL,
  baseURL: config.apiBaseUrl,
  headers: {
    'Content-Type': 'application/json',
  },
});


export const getProjectList = async (aui: string): Promise<ProjectListResponse> => {
  try {
    const response = await projectApi.get<ProjectListResponse>('/api/v1/project/list?aui=' + aui);
    return response.data;
  } catch (error) {
    throw handleApiError(error);
  }
};

export const getProjectDetail = async (aui: string, projectId: string): Promise<ProjectResponse> => {
  try {
    const response = await projectApi.get<ProjectResponse>(`/api/v1/project?aui=${aui}&projectId=${projectId}`);
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

export const createProject = async (aui: string, data: CreateProjectReq): Promise<ProjectResponse> => {
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
export const deleteProject = async (aui: string, data: RemoveProjectReq): Promise<DeleteResponse> => {
  try {
    const authToken = localStorage.getItem('authToken');
    if (!authToken) {
      throw new Error('Authentication required');
    }
    const response = await projectApi.delete<DeleteResponse>(`/api/v1/project?aui=${aui}&projectId=${data.projectId}`, {
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



