import { WorkPropertyVisibleResponse, } from '../dto/ResDtoRepository';
import { UpdateWorkPropertyVisibleReq } from '../dto/ReqDtoRepository';
import { baseApi, handleApiError, sendApiRequest } from './apiConfig';


export const getWorkPropertyVisible = async (aui: string): Promise<WorkPropertyVisibleResponse> => {
  try {
    const response = await baseApi.get<WorkPropertyVisibleResponse>(`/api/v1/work-property?aui=${aui}`);
    return response.data;
  } catch (error) {
    throw handleApiError(error);
  }
};

export const updateWorkPropertyVisible = async (aui: string, data: UpdateWorkPropertyVisibleReq): Promise<WorkPropertyVisibleResponse> => {
  return sendApiRequest('put', `/api/v1/work-property?aui=${aui}`, data);
};
