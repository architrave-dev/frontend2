import axios, { AxiosError } from 'axios';
import { getConfig } from '../env/envManager';
import { CreateWorkReq, UpdateWorkReq, WorkData } from '../store/WorkListStore';

const config = getConfig();

const workListApi = axios.create({
  // baseURL: API_BASE_URL,
  baseURL: config.apiBaseUrl,
  headers: {
    'Content-Type': 'application/json',
  },
});

export interface WorkListResponse {
  data: WorkData[];
}

export interface WorkResponse {
  data: WorkData;
}

export interface ErrorResponse {
  errorCode: string;
  timestamp: string;
}


export const getWorkList = async (aui: string): Promise<WorkListResponse> => {
  try {
    const response = await workListApi.get<WorkListResponse>(`/api/v1/work?aui=${aui}`);
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