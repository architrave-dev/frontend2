import { BillboardResponse } from '../dto/ResDtoRepository';
import { UpdateBillboardReq } from '../dto/ReqDtoRepository';
import { baseApi, handleApiError, sendApiRequest } from './apiConfig';


export const getBillboard = async (aui: string): Promise<BillboardResponse> => {
  try {
    const response = await baseApi.get<BillboardResponse>(`/api/v1/billboard?aui=${aui}`);
    return response.data;
  } catch (error) {
    throw handleApiError(error);
  }
};

export const updateBillboard = async (aui: string, data: UpdateBillboardReq): Promise<BillboardResponse> => {
  return sendApiRequest('put', `/api/v1/billboard?aui=${aui}`, data);
};