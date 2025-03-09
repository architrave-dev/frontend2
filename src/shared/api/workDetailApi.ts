import { DeleteResponse, WorkDetailListResponse, WorkDetailResponse, WorkDetailSimpleListResponse } from '../dto/ResDtoRepository';
import { CreateWorkDetailReq, DeleteWorkDetailReq, UpdateWorkDetailReq } from '../dto/ReqDtoRepository';
import { baseApi, handleApiError, sendApiRequest, sendDeleteApiRequest } from './apiConfig';


export const getWorkDetail = async (aui: string, workDetailId: string): Promise<WorkDetailResponse> => {
  try {
    const response = await baseApi.get<WorkDetailResponse>(`/api/v1/work-detail?aui=${aui}&workDetailId=${workDetailId}`);
    return response.data;
  } catch (error) {
    throw handleApiError(error);
  }
};

export const getSimpleWorkDetailList = async (aui: string, workId: string): Promise<WorkDetailSimpleListResponse> => {
  try {
    const response = await baseApi.get<WorkDetailSimpleListResponse>(`/api/v1/work-detail/list/simple?aui=${aui}&workId=${workId}`);
    return response.data;
  } catch (error) {
    throw handleApiError(error);
  }
};

export const getWorkDetailList = async (aui: string, workId: string): Promise<WorkDetailListResponse> => {
  try {
    const response = await baseApi.get<WorkDetailListResponse>(`/api/v1/work-detail/list?aui=${aui}&workId=${workId}`);
    return response.data;
  } catch (error) {
    throw handleApiError(error);
  }
};

export const createWorkDetail = async (aui: string, data: CreateWorkDetailReq): Promise<WorkDetailResponse> => {
  return sendApiRequest('post', `/api/v1/work-detail?aui=${aui}`, data);
};

export const updateWorkDetail = async (aui: string, data: UpdateWorkDetailReq): Promise<WorkDetailResponse> => {
  return sendApiRequest('put', `/api/v1/work-detail?aui=${aui}`, data);
};

export const deleteWorkDetail = async (aui: string, data: DeleteWorkDetailReq): Promise<DeleteResponse> => {
  return sendDeleteApiRequest(`/api/v1/work-detail?aui=${aui}&workDetailId=${data.workDetailId}`);
};


