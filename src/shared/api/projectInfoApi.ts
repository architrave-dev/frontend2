import { DeleteResponse, ProjectInfoListResponse, ProjectInfoResponse } from '../dto/ResDtoRepository';
import { CreateProjectInfoReq, UpdateProjectInfoReq, RemoveProjectInfoReq, UpdateReorderListReq } from '../dto/ReqDtoRepository';
import { baseApi, handleApiError, sendApiRequest, sendDeleteApiRequest } from './apiConfig';


export const getProjectInfoList = async (aui: string, projectId: string): Promise<ProjectInfoListResponse> => {
  try {
    const response = await baseApi.get<ProjectInfoListResponse>(`/api/v1/project-info?aui=${aui}&projectId=${projectId}`);
    return response.data;
  } catch (error) {
    throw handleApiError(error);
  }
};

export const createProjectInfo = async (aui: string, data: CreateProjectInfoReq): Promise<ProjectInfoResponse> => {
  return sendApiRequest('post', `/api/v1/project-info?aui=${aui}`, data);
};

export const updateProjectInfo = async (aui: string, data: UpdateProjectInfoReq): Promise<ProjectInfoResponse> => {
  return sendApiRequest('put', `/api/v1/project-info?aui=${aui}`, data);
};

export const deleteProjectInfo = async (aui: string, data: RemoveProjectInfoReq): Promise<DeleteResponse> => {
  return sendDeleteApiRequest(`/api/v1/project-info?aui=${aui}&projectInfoId=${data.id}`);
};

export const reorderProjectInfo = async (aui: string, data: UpdateReorderListReq): Promise<ProjectInfoListResponse> => {
  return sendApiRequest('put', `/api/v1/project-info/reorder?aui=${aui}`, data);
};