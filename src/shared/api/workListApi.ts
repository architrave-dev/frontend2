import axios, { AxiosError } from 'axios';
import { getConfig } from '../env/envManager';
import { DeleteResponse, ErrorResponse, WorkListResponse, WorkResponse, WorkWithDetailResponse } from '../dto/ResDtoRepository';
import { CreateWorkReq, DeleteWorkReq, UpdateWorkReq } from '../dto/ReqDtoRepository';

const config = getConfig();

const workListApi = axios.create({
  // baseURL: API_BASE_URL,
  baseURL: config.apiBaseUrl,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const getWork = async (workId: string): Promise<WorkWithDetailResponse> => {
  try {
    const response = await workListApi.get<WorkWithDetailResponse>(`/api/v1/work?workId=${workId}`);
    return response.data;
  } catch (error) {
    throw handleApiError(error);
  }
};

export const getWorkList = async (aui: string): Promise<WorkListResponse> => {
  try {
    const response = await workListApi.get<WorkListResponse>(`/api/v1/work/list?aui=${aui}`);
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
    const response = await workListApi.put<WorkResponse>(`/api/v1/work?aui=${aui}`, data, {
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
    const response = await workListApi.post<WorkResponse>(`/api/v1/work?aui=${aui}`, data, {
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
    const response = await workListApi.delete<DeleteResponse>(`/api/v1/work?aui=${aui}&workId=${data.workId}`, {
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

export default workListApi;