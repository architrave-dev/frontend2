import { MemberResponse, SearchResponse } from '../dto/ResDtoRepository';
import { baseApi, handleApiError } from './apiConfig';


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
