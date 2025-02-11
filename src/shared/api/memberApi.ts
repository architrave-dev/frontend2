import { MemberResponse } from '../dto/ResDtoRepository';
import { baseApi, handleApiError } from './apiConfig';


export const checkAui = async (aui: string): Promise<MemberResponse> => {
  try {
    const response = await baseApi.get<MemberResponse>(`/api/v1/member?aui=${aui}`);
    return response.data;
  } catch (error) {
    throw handleApiError(error);
  }
};
