import { CreatedProjectResponse, DeleteResponse, ProjectListResponse, ProjectResponse } from '../dto/ResDtoRepository';
import { CreateProjectReq, RemoveProjectReq, UpdateProjectReq, UpdateReorderListReq } from '../dto/ReqDtoRepository';
import { baseApi, handleApiError, sendApiRequest, sendDeleteApiRequest } from './apiConfig';


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

export const createProject = async (aui: string, data: CreateProjectReq): Promise<CreatedProjectResponse> => {
  return sendApiRequest('post', `/api/v1/project?aui=${aui}`, data);
};

export const updateProject = async (aui: string, data: UpdateProjectReq): Promise<ProjectResponse> => {
  return sendApiRequest('put', `/api/v1/project?aui=${aui}`, data);
};

export const deleteProject = async (aui: string, data: RemoveProjectReq): Promise<DeleteResponse> => {
  return sendDeleteApiRequest(`/api/v1/project?aui=${aui}&projectId=${data.projectId}`);
};

export const reorderProject = async (aui: string, data: UpdateReorderListReq): Promise<ProjectListResponse> => {
  return sendApiRequest('put', `/api/v1/project/reorder?aui=${aui}`, data);
};