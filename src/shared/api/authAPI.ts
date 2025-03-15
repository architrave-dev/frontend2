import { ActivateReq, LoginReq, RefreshReq, SignUpReq } from '../dto/ReqDtoRepository';
import { AuthResponse, SimpleStringResponse } from '../dto/ResDtoRepository';
import { baseApi, handleApiError } from './apiConfig';

export const findAui = async (data: LoginReq): Promise<SimpleStringResponse> => {
  try {
    const response = await baseApi.post<SimpleStringResponse>('/api/v1/auth/aui', data);
    return response.data;
  } catch (error) {
    throw handleApiError(error);
  }
};

export const signUp = async (data: SignUpReq): Promise<SimpleStringResponse> => {
  try {
    const response = await baseApi.post<SimpleStringResponse>('/api/v1/auth/signin', data);
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

export const activate = async (data: ActivateReq): Promise<AuthResponse> => {
  try {
    const response = await baseApi.post<AuthResponse>('/api/v1/auth/activate', data);
    return response.data;
  } catch (error) {
    throw handleApiError(error);
  }
};