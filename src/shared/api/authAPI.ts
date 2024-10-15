import axios, { AxiosError } from 'axios';
import { getConfig } from '../env/envManager';
import { LoginReq, RefreshReq, SignUpReq } from '../dto/ReqDtoRepository';
import { AuthResponse, ErrorResponse } from '../dto/ResDtoRepository';


const config = getConfig();

const authApi = axios.create({
  // baseURL: API_BASE_URL,
  baseURL: config.apiBaseUrl,
  headers: {
    'Content-Type': 'application/json',
  },
});


export const signUp = async (data: SignUpReq): Promise<AuthResponse> => {
  try {
    const response = await authApi.post<AuthResponse>('/api/v1/auth/signin', data);
    return response.data;
  } catch (error) {
    throw handleApiError(error);
  }
};

export const login = async (data: LoginReq): Promise<AuthResponse> => {
  try {
    const response = await authApi.post<AuthResponse>('/api/v1/auth/login', data);
    const authToken = response.headers['authorization'] || null;
    return {
      ...response.data,
      authToken
    };
  } catch (error) {
    throw handleApiError(error);
  }
};

export const refresh = async (data: RefreshReq): Promise<AuthResponse> => {
  try {
    const response = await authApi.post<AuthResponse>('/api/v1/auth/refresh', data);
    const authToken = response.headers['authorization'] || null;
    return {
      ...response.data,
      authToken
    };
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

export default authApi;