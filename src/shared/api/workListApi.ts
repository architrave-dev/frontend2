import { DeleteResponse, WorkListResponse, WorkResponse, WorkSimpleListResponse, WorkWithDetailResponse } from '../dto/ResDtoRepository';
import { CreateWorkReq, DeleteWorkReq, UpdateWorkReq, MetadataForQuery } from '../dto/ReqDtoRepository';
import { baseApi, handleApiError, sendApiRequest, sendDeleteApiRequest } from './apiConfig';


export const getWork = async (workId: string): Promise<WorkWithDetailResponse> => {
  try {
    const response = await baseApi.get<WorkWithDetailResponse>(`/api/v1/work?workId=${workId}`);
    return response.data;
  } catch (error) {
    throw handleApiError(error);
  }
};

export const getWorkList = async (aui: string, metaData: MetadataForQuery): Promise<WorkListResponse> => {
  try {
    const response = await baseApi.get<WorkListResponse>(
      `/api/v1/work/list?aui=${aui}&page=${metaData.page}&size=${metaData.size}&sortBy=${metaData.sortData.sort}&direction=${metaData.sortData.direction}`
    );
    return response.data;
  } catch (error) {
    throw handleApiError(error);
  }
};

export const getSimpleWorkList = async (aui: string): Promise<WorkSimpleListResponse> => {
  try {
    const response = await baseApi.get<WorkSimpleListResponse>(`/api/v1/work/list/simple?aui=${aui}`);
    return response.data;
  } catch (error) {
    throw handleApiError(error);
  }
};

export const createWork = async (aui: string, data: CreateWorkReq): Promise<WorkResponse> => {
  return sendApiRequest('post', `/api/v1/work?aui=${aui}`, data);
};

export const updateWork = async (aui: string, data: UpdateWorkReq): Promise<WorkResponse> => {
  return sendApiRequest('put', `/api/v1/work?aui=${aui}`, data);
};

export const deleteWork = async (aui: string, data: DeleteWorkReq): Promise<DeleteResponse> => {
  return sendDeleteApiRequest(`/api/v1/work?aui=${aui}&workId=${data.workId}`);
};