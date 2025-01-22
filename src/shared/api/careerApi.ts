import axios, { AxiosError } from 'axios';
import { getConfig } from '../env/envManager';
import { CareerListResponse, CareerResponse, ErrorResponse } from '../dto/ResDtoRepository';
import { CreateCareerReq, RemoveCareerReq, UpdateCareerReq } from '../dto/ReqDtoRepository';

const config = getConfig();

const careerApi = axios.create({
  // baseURL: API_BASE_URL,
  baseURL: config.apiBaseUrl,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const getCareerList = async (aui: string): Promise<CareerListResponse> => {
  try {
    const response = await careerApi.get<CareerListResponse>(`/api/v1/career?aui=${aui}`);
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
    const response = await careerApi.post<CareerResponse>(`/api/v1/career?aui=${aui}`, data, {
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
    const response = await careerApi.put<CareerResponse>(`/api/v1/career?aui=${aui}`, data, {
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
    const response = await careerApi.delete<CareerResponse>(`/api/v1/career?aui=${aui}&careerId=${data.careerId}`, {
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

export default careerApi;