import axios, { AxiosError } from 'axios';
import { getConfig } from '../env/envManager';
import { ErrorResponse, WorkPropertyVisibleResponse, } from '../dto/ResDtoRepository';
import { UpdateWorkPropertyVisibleReq } from '../dto/ReqDtoRepository';


const config = getConfig();

const workPropertyVisibleApi = axios.create({
  // baseURL: API_BASE_URL,
  baseURL: config.apiBaseUrl,
  headers: {
    'Content-Type': 'application/json',
  },
});


export const getWorkPropertyVisible = async (aui: string): Promise<WorkPropertyVisibleResponse> => {
  try {
    const response = await workPropertyVisibleApi.get<WorkPropertyVisibleResponse>(`/api/v1/work-property?aui=${aui}`);
    return response.data;
  } catch (error) {
    throw handleApiError(error);
  }
};

export const updateWorkPropertyVisible = async (aui: string, data: UpdateWorkPropertyVisibleReq): Promise<WorkPropertyVisibleResponse> => {
  try {
    const authToken = localStorage.getItem('authToken');
    if (!authToken) {
      throw new Error('Authentication required');
    }
    const response = await workPropertyVisibleApi.put<WorkPropertyVisibleResponse>(`/api/v1/work-property?aui=${aui}`, data, {
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

export default workPropertyVisibleApi;