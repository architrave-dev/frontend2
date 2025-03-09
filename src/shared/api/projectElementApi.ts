import { ProjectElementListResponse, ProjectElementResponse } from '../dto/ResDtoRepository';
import { CreateProjectElementReq, CreateProjectElementWithWorkDetailReq, CreateProjectElementWithWorkReq, DeleteProjectElementReq, UpdateProjectElementReq, UpdateReorderListReq } from '../dto/ReqDtoRepository';
import { baseApi, handleApiError, sendApiRequest, sendDeleteApiRequest } from './apiConfig';


export const getProjectElementList = async (aui: string, projectId: string): Promise<ProjectElementListResponse> => {
  try {
    const response = await baseApi.get<ProjectElementListResponse>(`/api/v1/project-element?aui=${aui}&projectId=${projectId}`);
    return response.data;
  } catch (error) {
    throw handleApiError(error);
  }
};

export const createProjectElement = async (aui: string, data: CreateProjectElementReq): Promise<ProjectElementResponse> => {
  return sendApiRequest('post', `/api/v1/project-element?aui=${aui}`, data);
};

export const updateProjectElement = async (aui: string, data: UpdateProjectElementReq): Promise<ProjectElementResponse> => {
  return sendApiRequest('put', `/api/v1/project-element?aui=${aui}`, data);
};

export const deleteProjectElement = async (aui: string, data: DeleteProjectElementReq): Promise<ProjectElementResponse> => {
  return sendDeleteApiRequest(`/api/v1/project-element?aui=${aui}&peId=${data.projectElementId}`);
};

export const createProjectElementWithWork = async (aui: string, data: CreateProjectElementWithWorkReq): Promise<ProjectElementResponse> => {
  return sendApiRequest('post', `/api/v1/project-element/import?aui=${aui}`, data);
};

export const createProjectElementWithWorkDetail = async (aui: string, data: CreateProjectElementWithWorkDetailReq): Promise<ProjectElementResponse> => {
  return sendApiRequest('post', `/api/v1/project-element/import/detail?aui=${aui}`, data);
};

export const reorderProjectElement = async (aui: string, data: UpdateReorderListReq): Promise<ProjectElementListResponse> => {
  return sendApiRequest('put', `/api/v1/project-element/reorder?aui=${aui}`, data);
};