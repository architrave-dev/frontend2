import { SettingResponse } from '../dto/ResDtoRepository';
import { UpdateSettingReq } from '../dto/ReqDtoRepository';
import { baseApi, handleApiError, sendApiRequest } from './apiConfig';


//get해오는 것도 authToken 필요!!! => 아니!! 필요없다!!!
export const getSetting = async (aui: string): Promise<SettingResponse> => {
  try {
    const response = await baseApi.get<SettingResponse>(`/api/v1/setting?aui=${aui}`);
    return response.data;
  } catch (error) {
    throw handleApiError(error);
  }
};

export const updateSetting = async (aui: string, data: UpdateSettingReq): Promise<SettingResponse> => {
  return sendApiRequest('put', `/api/v1/setting?aui=${aui}`, data);
};
