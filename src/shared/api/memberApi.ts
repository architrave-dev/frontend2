import axios, { AxiosError } from 'axios';
import { getConfig } from '../env/envManager';
import { ErrorResponse } from './workListApi';


const config = getConfig();

const memberApi = axios.create({
  // baseURL: API_BASE_URL,
  baseURL: config.apiBaseUrl,
  headers: {
    'Content-Type': 'application/json',
  },
});

export interface MemberResponse {
  data: string;
}

export const checkAui = async (aui: string): Promise<MemberResponse> => {
  try {
    const response = await memberApi.get<MemberResponse>(`/api/v1/member?aui=${aui}`);
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

export default memberApi;