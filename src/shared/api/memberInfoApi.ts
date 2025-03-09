import { MemberInfoResponse } from '../dto/ResDtoRepository';
import { UpdateMemberInfoReq } from '../dto/ReqDtoRepository';
import { baseApi, handleApiError, sendApiRequest } from './apiConfig';


export const getMemberInfo = async (aui: string): Promise<MemberInfoResponse> => {
  try {
    const response = await baseApi.get<MemberInfoResponse>(`/api/v1/member-info?aui=${aui}`);
    return response.data;
  } catch (error) {
    throw handleApiError(error);
  }
};

export const updateMemberInfo = async (aui: string, data: UpdateMemberInfoReq): Promise<MemberInfoResponse> => {
  return sendApiRequest('put', `/api/v1/member-info?aui=${aui}`, data);
};
