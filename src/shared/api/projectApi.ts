import { CreatedProjectResponse, DeleteResponse, ProjectListResponse, ProjectResponse } from '../dto/ResDtoRepository';
import { CreateProjectReq, RemoveProjectReq, UpdateProjectReq } from '../dto/ReqDtoRepository';
import { baseApi, handleApiError } from './apiConfig';


export const getProjectList = async (aui: string): Promise<ProjectListResponse> => {
  try {
    const response = await baseApi.get<ProjectListResponse>('/api/v1/project/list?aui=' + aui);
    return response.data;
  } catch (error) {
    throw handleApiError(error);
  }
};

export const getProjectDetail = async (aui: string, projectId: string): Promise<ProjectResponse> => {
  try {
    const response = await baseApi.get<ProjectResponse>(`/api/v1/project?aui=${aui}&projectId=${projectId}`);
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
    const response = await baseApi.put<ProjectResponse>(`/api/v1/project?aui=${aui}`, data, {
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
    const response = await baseApi.post<CreatedProjectResponse>(`/api/v1/project?aui=${aui}`, data, {
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
    const response = await baseApi.delete<DeleteResponse>(`/api/v1/project?aui=${aui}&projectId=${data.projectId}`, {
      headers: { Authorization: `${authToken}` }
    });
    return response.data;
  } catch (error) {
    throw handleApiError(error);
  }
};
