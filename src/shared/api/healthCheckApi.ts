import axios, { AxiosError } from 'axios';
import { getConfig } from '../env/envManager';
import { ErrorResponse } from '../dto/ResDtoRepository';

const config = getConfig();

const healthCheckApi = axios.create({
  // baseURL: API_BASE_URL,
  baseURL: config.apiBaseUrl,
  headers: {
    'Content-Type': 'application/json',
  },
});


export const healthCheck = async (): Promise<void> => {
  try {
    const response = await healthCheckApi.get<void>('/health-check');
    console.log("response: ", response);
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

export default healthCheckApi;



