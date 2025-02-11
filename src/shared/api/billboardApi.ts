import { BillboardResponse } from '../dto/ResDtoRepository';
import { UpdateBillboardReq } from '../dto/ReqDtoRepository';
import { baseApi, handleApiError } from './apiConfig';


export const getBillboard = async (aui: string): Promise<BillboardResponse> => {
  try {
    const response = await baseApi.get<BillboardResponse>(`/api/v1/billboard?aui=${aui}`);
    return response.data;
  } catch (error) {
    throw handleApiError(error);
  }
};

export const updateBillboard = async (aui: string, data: UpdateBillboardReq): Promise<BillboardResponse> => {
  try {
    const authToken = localStorage.getItem('authToken');
    if (!authToken) {
      throw new Error('Authentication required');
    }
    const response = await baseApi.put<BillboardResponse>(`/api/v1/billboard?aui=${aui}`, data, {
      headers: { Authorization: `${authToken}` }
    });
    return response.data;
  } catch (error) {
    throw handleApiError(error);
  }
};