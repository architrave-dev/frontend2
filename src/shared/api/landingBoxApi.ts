import axios, { AxiosError } from 'axios';
import { getConfig } from '../env/envManager';
import { LandingBoxData } from '../store/landingBoxStore';


const config = getConfig();

const langindBoxApi = axios.create({
  // baseURL: API_BASE_URL,
  baseURL: config.apiBaseUrl,
  headers: {
    'Content-Type': 'application/json',
  },
});


export interface LandingBoxResponse {
  data: LandingBoxData;
}

export interface ErrorResponse {
  message: string;
  timestamp: string;
}

export const getLandingBox = async (data: string): Promise<LandingBoxResponse> => {
  try {
    const response = await langindBoxApi.get<LandingBoxResponse>('/api/v1/landing-box?aui=' + data);
    return response.data;
  } catch (error) {
    throw handleApiError(error);
  }
};

export const updateLandingBox = async (data: LandingBoxData): Promise<LandingBoxResponse> => {
  try {
    const response = await langindBoxApi.post<LandingBoxResponse>('/api/v1/landing-box', data);
    return response.data;
  } catch (error) {
    throw handleApiError(error);
  }
};

const handleApiError = (error: unknown): Error => {
  if (axios.isAxiosError(error)) {
    const axiosError = error as AxiosError<ErrorResponse>;
    if (axiosError.response?.data) {
      return new Error(axiosError.response.data.message);
    }
  }
  return new Error('An unexpected error occurred');
};

export default langindBoxApi;