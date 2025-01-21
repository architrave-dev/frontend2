import axios, { AxiosError } from 'axios';
import { getConfig } from '../env/envManager';
import { DeleteResponse, ErrorResponse, ProjectInfoListResponse, ProjectInfoResponse } from '../dto/ResDtoRepository';
import { CreateProjectInfoReq, UpdateProjectInfoReq, RemoveProjectInfoReq } from '../dto/ReqDtoRepository';


const config = getConfig();

const projectInfoApi = axios.create({
  baseURL: config.apiBaseUrl,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const getProjectInfoList = async (aui: string, projectId: string): Promise<ProjectInfoListResponse> => {
  try {
    const response = await projectInfoApi.get<ProjectInfoListResponse>(`/api/v1/project-info?aui=${aui}&projectId=${projectId}`);
    return response.data;
  } catch (error) {
    throw handleApiError(error);
  }
};

export const createProjectInfo = async (aui: string, data: CreateProjectInfoReq): Promise<ProjectInfoResponse> => {
  try {
    const authToken = localStorage.getItem('authToken');
    if (!authToken) {
      throw new Error('Authentication required');
    }
    const response = await projectInfoApi.post<ProjectInfoResponse>(`/api/v1/project-info?aui=${aui}`, data, {
      headers: { Authorization: `${authToken}` }
    });
    return response.data;
  } catch (error) {
    throw handleApiError(error);
  }
};

export const updateProjectInfo = async (aui: string, data: UpdateProjectInfoReq): Promise<ProjectInfoResponse> => {
  try {
    const authToken = localStorage.getItem('authToken');
    if (!authToken) {
      throw new Error('Authentication required');
    }
    const response = await projectInfoApi.put<ProjectInfoResponse>(`/api/v1/project-info?aui=${aui}`, data, {
      headers: { Authorization: `${authToken}` }
    });
    return response.data;
  } catch (error) {
    throw handleApiError(error);
  }
};

export const deleteProjectInfo = async (aui: string, data: RemoveProjectInfoReq): Promise<DeleteResponse> => {
  try {
    const authToken = localStorage.getItem('authToken');
    if (!authToken) {
      throw new Error('Authentication required');
    }
    const response = await projectInfoApi.delete<DeleteResponse>(`/api/v1/project-info?aui=${aui}&projectInfoId=${data.id}`, {
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

export default projectInfoApi;