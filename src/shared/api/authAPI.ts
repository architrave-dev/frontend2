import { LoginReq, RefreshReq, SignUpReq } from '../dto/ReqDtoRepository';
import { AuthResponse } from '../dto/ResDtoRepository';
import { baseApi, handleApiError } from './apiConfig';


export const signUp = async (data: SignUpReq): Promise<AuthResponse> => {
  try {
    const response = await baseApi.post<AuthResponse>('/api/v1/auth/signin', data);
    return response.data;
  } catch (error) {
    throw handleApiError(error);
  }
};

export const login = async (data: LoginReq): Promise<AuthResponse> => {
  try {
    const response = await baseApi.post<AuthResponse>('/api/v1/auth/login', data);
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
    const response = await baseApi.post<AuthResponse>('/api/v1/auth/refresh', data);
    const authToken = response.headers['authorization'] || null;
    return {
      ...response.data,
      authToken
    };
  } catch (error) {
    throw handleApiError(error);
  }
};
