import { CareerListResponse, CareerResponse } from '../dto/ResDtoRepository';
import { CreateCareerReq, RemoveCareerReq, UpdateCareerReq, UpdateReorderListReq } from '../dto/ReqDtoRepository';
import { baseApi, handleApiError, sendApiRequest, sendDeleteApiRequest } from './apiConfig';


export const getCareerList = async (aui: string): Promise<CareerListResponse> => {
  try {
    const response = await baseApi.get<CareerListResponse>(`/api/v1/career?aui=${aui}`);
    return response.data;
  } catch (error) {
    throw handleApiError(error);
  }
};

export const createCareer = async (aui: string, data: CreateCareerReq): Promise<CareerResponse> => {
  return sendApiRequest('post', `/api/v1/career?aui=${aui}`, data);
};

export const updateCareer = async (aui: string, data: UpdateCareerReq): Promise<CareerResponse> => {
  return sendApiRequest('put', `/api/v1/career?aui=${aui}`, data);
};

export const deleteCareer = async (aui: string, data: RemoveCareerReq): Promise<CareerResponse> => {
  return sendDeleteApiRequest(`/api/v1/career?aui=${aui}&careerId=${data.careerId}`);
};

export const reorderCareer = async (aui: string, data: UpdateReorderListReq): Promise<CareerListResponse> => {
  return sendApiRequest('put', `/api/v1/career/reorder?aui=${aui}`, data);
};