import axios, { AxiosError } from 'axios';
import { getConfig } from '../env/envManager';
import { ErrorResponse, LandingBoxResponse } from '../dto/ResDtoRepository';
import { LandingBoxData } from '../dto/EntityRepository';


const config = getConfig();

const langingBoxApi = axios.create({
  // baseURL: API_BASE_URL,
  baseURL: config.apiBaseUrl,
  headers: {
    'Content-Type': 'application/json',
  },
});


export const getLandingBox = async (aui: string): Promise<LandingBoxResponse> => {
  try {
    const response = await langingBoxApi.get<LandingBoxResponse>(`/api/v1/landing-box?aui=${aui}`);
    return response.data;
  } catch (error) {
    throw handleApiError(error);
  }
};

export const updateLandingBox = async (aui: string, data: LandingBoxData): Promise<LandingBoxResponse> => {
  try {
    const authToken = localStorage.getItem('authToken');
    if (!authToken) {
      throw new Error('Authentication required');
    }
    const response = await langingBoxApi.put<LandingBoxResponse>(`/api/v1/landing-box?aui=${aui}`, data, {
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

export default langingBoxApi;