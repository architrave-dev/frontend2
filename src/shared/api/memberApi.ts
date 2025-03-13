import { UpdateMemberReq, UpdatePasswordReq } from '../dto/ReqDtoRepository';
import { MemberResponse, MemberSimpleResponse, SearchResponse } from '../dto/ResDtoRepository';
import { baseApi, handleApiError, sendApiRequest } from './apiConfig';


export const checkAui = async (aui: string): Promise<MemberResponse> => {
  try {
    const response = await baseApi.get<MemberResponse>(`/api/v1/member?aui=${aui}`);
    return response.data;
  } catch (error) {
    throw handleApiError(error);
  }
};

export const searchMember = async (username: string): Promise<SearchResponse> => {
  try {
    const response = await baseApi.get<SearchResponse>(`/api/v1/member/search?query=${username}`);
    return response.data;
  } catch (error) {
    throw handleApiError(error);
  }
};

export const updateMember = async (aui: string, data: UpdateMemberReq): Promise<MemberSimpleResponse> => {
  return sendApiRequest('put', `/api/v1/member?aui=${aui}`, data);
};

export const updatePassword = async (aui: string, data: UpdatePasswordReq): Promise<MemberResponse> => {
  return sendApiRequest('put', `/api/v1/member/password?aui=${aui}`, data);
};