import axios, { AxiosError } from 'axios';
import { getConfig } from '../env/envManager';
import { ErrorResponse, SettingResponse } from '../dto/ResDtoRepository';
import { UpdateSettingReq } from '../dto/ReqDtoRepository';


const config = getConfig();

const settingApi = axios.create({
  // baseURL: API_BASE_URL,
  baseURL: config.apiBaseUrl,
  headers: {
    'Content-Type': 'application/json',
  },
});

//get해오는 것도 authToken 필요!!!
export const getSetting = async (aui: string): Promise<SettingResponse> => {
  try {
    const authToken = localStorage.getItem('authToken');
    if (!authToken) {
      throw new Error('Authentication required');
    }
    const response = await settingApi.get<SettingResponse>(`/api/v1/setting?aui=${aui}`, {
      headers: { Authorization: `${authToken}` }
    });
    return response.data;
  } catch (error) {
    throw handleApiError(error);
  }
};

export const updateSetting = async (aui: string, data: UpdateSettingReq): Promise<SettingResponse> => {
  try {
    const authToken = localStorage.getItem('authToken');
    if (!authToken) {
      throw new Error('Authentication required');
    }
    const response = await settingApi.put<SettingResponse>(`/api/v1/setting?aui=${aui}`, data, {
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

export default settingApi;