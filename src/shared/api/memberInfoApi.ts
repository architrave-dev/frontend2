import axios, { AxiosError } from 'axios';
import { getConfig } from '../env/envManager';
import { ErrorResponse, MemberInfoResponse } from '../dto/ResDtoRepository';
import { UpdateMemberInfoReq } from '../dto/ReqDtoRepository';

const config = getConfig();

const memberInfoApi = axios.create({
  // baseURL: API_BASE_URL,
  baseURL: config.apiBaseUrl,
  headers: {
    'Content-Type': 'application/json',
  },
});


export const getMemberInfo = async (aui: string): Promise<MemberInfoResponse> => {
  try {
    const response = await memberInfoApi.get<MemberInfoResponse>(`/api/v1/member-info?aui=${aui}`);
    return response.data;
  } catch (error) {
    throw handleApiError(error);
  }
};

export const updateMemberInfo = async (aui: string, data: UpdateMemberInfoReq): Promise<MemberInfoResponse> => {
  try {
    const authToken = localStorage.getItem('authToken');
    if (!authToken) {
      throw new Error('Authentication required');
    }
    const response = await memberInfoApi.put<MemberInfoResponse>(`/api/v1/member-info?aui=${aui}`, data, {
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

export default memberInfoApi;