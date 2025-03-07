import { CareerListResponse, CareerResponse } from '../dto/ResDtoRepository';
import { CreateCareerReq, RemoveCareerReq, UpdateCareerReq, UpdateReorderListReq } from '../dto/ReqDtoRepository';
import { baseApi, handleApiError } from './apiConfig';


export const getCareerList = async (aui: string): Promise<CareerListResponse> => {
  try {
    const response = await baseApi.get<CareerListResponse>(`/api/v1/career?aui=${aui}`);
    return response.data;
  } catch (error) {
    throw handleApiError(error);
  }
};

export const createCareer = async (aui: string, data: CreateCareerReq): Promise<CareerResponse> => {
  try {
    const authToken = localStorage.getItem('authToken');
    if (!authToken) {
      throw new Error('Authentication required');
    }
    const response = await baseApi.post<CareerResponse>(`/api/v1/career?aui=${aui}`, data, {
      headers: { Authorization: `${authToken}` }
    });
    return response.data;
  } catch (error) {
    throw handleApiError(error);
  }
};


export const updateCareer = async (aui: string, data: UpdateCareerReq): Promise<CareerResponse> => {
  try {
    const authToken = localStorage.getItem('authToken');
    if (!authToken) {
      throw new Error('Authentication required');
    }
    const response = await baseApi.put<CareerResponse>(`/api/v1/career?aui=${aui}`, data, {
      headers: { Authorization: `${authToken}` }
    });
    return response.data;
  } catch (error) {
    throw handleApiError(error);
  }
};

export const deleteCareer = async (aui: string, data: RemoveCareerReq): Promise<CareerResponse> => {
  try {
    const authToken = localStorage.getItem('authToken');
    if (!authToken) {
      throw new Error('Authentication required');
    }
    const response = await baseApi.delete<CareerResponse>(`/api/v1/career?aui=${aui}&careerId=${data.careerId}`, {
      headers: { Authorization: `${authToken}` }
    });
    return response.data;
  } catch (error) {
    throw handleApiError(error);
  }
};

export const reorderCareer = async (aui: string, data: UpdateReorderListReq): Promise<CareerListResponse> => {
  try {
    const authToken = localStorage.getItem('authToken');
    if (!authToken) {
      throw new Error('Authentication required');
    }
    const response = await baseApi.put<CareerListResponse>(`/api/v1/career/reorder?aui=${aui}`, data, {
      headers: { Authorization: `${authToken}` }
    });
    return response.data;
  } catch (error) {
    throw handleApiError(error);
  }
};