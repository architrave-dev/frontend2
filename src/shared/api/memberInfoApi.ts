import { MemberInfoResponse } from '../dto/ResDtoRepository';
import { UpdateMemberInfoReq } from '../dto/ReqDtoRepository';
import { baseApi, handleApiError } from './apiConfig';


export const getMemberInfo = async (aui: string): Promise<MemberInfoResponse> => {
  try {
    const response = await baseApi.get<MemberInfoResponse>(`/api/v1/member-info?aui=${aui}`);
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
    const response = await baseApi.put<MemberInfoResponse>(`/api/v1/member-info?aui=${aui}`, data, {
      headers: { Authorization: `${authToken}` }
    });
    return response.data;
  } catch (error) {
    throw handleApiError(error);
  }
};
