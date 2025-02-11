import { DeleteResponse, WorkListResponse, WorkResponse, WorkSimpleListResponse, WorkWithDetailResponse } from '../dto/ResDtoRepository';
import { CreateWorkReq, DeleteWorkReq, UpdateWorkReq } from '../dto/ReqDtoRepository';
import { baseApi, handleApiError } from './apiConfig';


export const getWork = async (workId: string): Promise<WorkWithDetailResponse> => {
  try {
    const response = await baseApi.get<WorkWithDetailResponse>(`/api/v1/work?workId=${workId}`);
    return response.data;
  } catch (error) {
    throw handleApiError(error);
  }
};

export const getWorkList = async (aui: string): Promise<WorkListResponse> => {
  try {
    const response = await baseApi.get<WorkListResponse>(`/api/v1/work/list?aui=${aui}`);
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

export const updateWork = async (aui: string, data: UpdateWorkReq): Promise<WorkResponse> => {
  try {
    const authToken = localStorage.getItem('authToken');
    if (!authToken) {
      throw new Error('Authentication required');
    }
    const response = await baseApi.put<WorkResponse>(`/api/v1/work?aui=${aui}`, data, {
      headers: { Authorization: `${authToken}` }
    });
    return response.data;
  } catch (error) {
    throw handleApiError(error);
  }
};
export const createWork = async (aui: string, data: CreateWorkReq): Promise<WorkResponse> => {
  try {
    const authToken = localStorage.getItem('authToken');
    if (!authToken) {
      throw new Error('Authentication required');
    }
    const response = await baseApi.post<WorkResponse>(`/api/v1/work?aui=${aui}`, data, {
      headers: { Authorization: `${authToken}` }
    });
    return response.data;
  } catch (error) {
    throw handleApiError(error);
  }
};
export const deleteWork = async (aui: string, data: DeleteWorkReq): Promise<DeleteResponse> => {
  try {
    const authToken = localStorage.getItem('authToken');
    if (!authToken) {
      throw new Error('Authentication required');
    }
    const response = await baseApi.delete<DeleteResponse>(`/api/v1/work?aui=${aui}&workId=${data.workId}`, {
      headers: { Authorization: `${authToken}` }
    });
    return response.data;
  } catch (error) {
    throw handleApiError(error);
  }
};