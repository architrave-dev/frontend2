import axios, { AxiosError } from 'axios';
import { getConfig } from '../env/envManager';
import { ErrorResponse, BillboardResponse } from '../dto/ResDtoRepository';
import { UpdateBillboardReq } from '../dto/ReqDtoRepository';


const config = getConfig();

const billboardApi = axios.create({
  // baseURL: API_BASE_URL,
  baseURL: config.apiBaseUrl,
  headers: {
    'Content-Type': 'application/json',
  },
});


export const getBillboard = async (aui: string): Promise<BillboardResponse> => {
  try {
    const response = await billboardApi.get<BillboardResponse>(`/api/v1/billboard?aui=${aui}`);
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
    const response = await billboardApi.put<BillboardResponse>(`/api/v1/billboard?aui=${aui}`, data, {
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

export default billboardApi;