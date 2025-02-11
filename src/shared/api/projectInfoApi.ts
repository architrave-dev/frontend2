import { DeleteResponse, ProjectInfoListResponse, ProjectInfoResponse } from '../dto/ResDtoRepository';
import { CreateProjectInfoReq, UpdateProjectInfoReq, RemoveProjectInfoReq } from '../dto/ReqDtoRepository';
import { baseApi, handleApiError } from './apiConfig';


export const getProjectInfoList = async (aui: string, projectId: string): Promise<ProjectInfoListResponse> => {
  try {
    const response = await baseApi.get<ProjectInfoListResponse>(`/api/v1/project-info?aui=${aui}&projectId=${projectId}`);
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
    const response = await baseApi.post<ProjectInfoResponse>(`/api/v1/project-info?aui=${aui}`, data, {
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
    const response = await baseApi.put<ProjectInfoResponse>(`/api/v1/project-info?aui=${aui}`, data, {
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
    const response = await baseApi.delete<DeleteResponse>(`/api/v1/project-info?aui=${aui}&projectInfoId=${data.id}`, {
      headers: { Authorization: `${authToken}` }
    });
    return response.data;
  } catch (error) {
    throw handleApiError(error);
  }
};