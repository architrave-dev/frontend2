import axios, { AxiosError } from 'axios';
import { getConfig } from '../env/envManager';
import { CareerData, CreateCareerReq, RemoveCareerReq, UpdateCareerReq } from '../store/careerStore';

const config = getConfig();

const careerApi = axios.create({
  // baseURL: API_BASE_URL,
  baseURL: config.apiBaseUrl,
  headers: {
    'Content-Type': 'application/json',
  },
});

export interface UpdatedCareerListReq {
  createCareerReqList?: CreateCareerReq[];
  updateCareerReqList?: UpdateCareerReq[];
  removeCareerReqList?: RemoveCareerReq[];
}

export interface CareerListResponse {
  data: CareerData[];
}

export interface ErrorResponse {
  errorCode: string;
  timestamp: string;
}


export const getCareerList = async (aui: string): Promise<CareerListResponse> => {
  try {
    const response = await careerApi.get<CareerListResponse>(`/api/v1/career?aui=${aui}`);
    return response.data;
  } catch (error) {
    throw handleApiError(error);
  }
};

export const updateCareerList = async (aui: string, data: UpdatedCareerListReq): Promise<CareerListResponse> => {
  try {
    const authToken = localStorage.getItem('authToken');
    if (!authToken) {
      throw new Error('Authentication required');
    }
    const response = await careerApi.put<CareerListResponse>(`/api/v1/career?aui=${aui}`, data, {
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