import axios, { AxiosError } from 'axios';
import { getConfig } from '../env/envManager';
import { DeleteResponse, ErrorResponse, WorkDetailListResponse, WorkDetailResponse, WorkWithDetailResponse } from '../dto/ResDtoRepository';
import { CreateWorkDetailReq, DeleteWorkDetailReq, UpdateWorkDetailReq } from '../dto/ReqDtoRepository';


const config = getConfig();

const workDetailApi = axios.create({
  baseURL: config.apiBaseUrl,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const getWorkDetail = async (aui: string, workDetailId: string): Promise<WorkDetailResponse> => {
  try {
    const response = await workDetailApi.get<WorkWithDetailResponse>(`/api/v1/work-detail?aui=${aui}&workDetailId=${workDetailId}`);
    return response.data;
  } catch (error) {
    throw handleApiError(error);
  }
};

export const getWorkDetailList = async (aui: string, workId: string): Promise<WorkDetailListResponse> => {
  try {
    const response = await workDetailApi.get<WorkDetailListResponse>(`/api/v1/work-detail/list?aui=${aui}&workId=${workId}`);
    return response.data;
  } catch (error) {
    throw handleApiError(error);
  }
};

export const updateWorkDetail = async (aui: string, data: UpdateWorkDetailReq): Promise<WorkDetailResponse> => {
  try {
    const authToken = localStorage.getItem('authToken');
    if (!authToken) {
      throw new Error('Authentication required');
    }
    const response = await workDetailApi.put<WorkDetailResponse>(`/api/v1/work-detail?aui=${aui}`, data, {
      headers: { Authorization: `${authToken}` }
    });
    return response.data;
  } catch (error) {
    throw handleApiError(error);
  }
};

export const createWorkDetail = async (aui: string, data: CreateWorkDetailReq): Promise<WorkDetailResponse> => {
  try {
    const authToken = localStorage.getItem('authToken');
    if (!authToken) {
      throw new Error('Authentication required');
    }
    const response = await workDetailApi.post<WorkDetailResponse>(`/api/v1/work-detail?aui=${aui}`, data, {
      headers: { Authorization: `${authToken}` }
    });
    return response.data;
  } catch (error) {
    throw handleApiError(error);
  }
};

export const deleteWorkDetail = async (aui: string, data: DeleteWorkDetailReq): Promise<DeleteResponse> => {
  try {
    const authToken = localStorage.getItem('authToken');
    if (!authToken) {
      throw new Error('Authentication required');
    }
    const response = await workDetailApi.delete<DeleteResponse>(`/api/v1/work-detail?aui=${aui}&workId=${data.workDetailId}`, {
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

export default workDetailApi;