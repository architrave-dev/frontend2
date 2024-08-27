import axios, { AxiosError } from 'axios';
import { getConfig } from '../env/envManager';
import { UserData } from '../store/authStore';


const config = getConfig();

const authApi = axios.create({
  // baseURL: API_BASE_URL,
  baseURL: config.apiBaseUrl,
  headers: {
    'Content-Type': 'application/json',
  },
});

export interface SignUpData {
  email: string;
  password: string;
  username: string;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface AuthResponse {
  data: UserData;
  authToken: string
}

export interface ErrorResponse {
  message: string;
  timestamp: string;
}

export const signUp = async (data: SignUpData): Promise<AuthResponse> => {
  try {
    const response = await authApi.post<AuthResponse>('/api/v1/auth/signin', data);
    return response.data;
  } catch (error) {
    throw handleApiError(error);
  }
};

export const login = async (data: LoginData): Promise<AuthResponse> => {
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

const handleApiError = (error: unknown): Error => {
  if (axios.isAxiosError(error)) {
    const axiosError = error as AxiosError<ErrorResponse>;
    if (axiosError.response?.data) {
      return new Error(axiosError.response.data.message);
    }
  }
  return new Error('An unexpected error occurred');
};

export default authApi;