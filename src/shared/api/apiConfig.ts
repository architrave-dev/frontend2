import axios, { AxiosError } from 'axios';
import { ErrorCode } from './errorCode';
import { ErrorResponse } from '../dto/ResDtoRepository';
import { getConfig } from '../env/envManager';
import { isNetworkError } from '../util/isNetworkError';


const config = getConfig();

export const baseApi = axios.create({
  baseURL: config.apiBaseUrl,
  headers: {
    'Content-Type': 'application/json',
  },
});

const formatErrorMessage = (code: string, message: string): string => {
  return `${code}:: ${message}`;
};

export const handleApiError = (error: unknown): Error => {
  if (isNetworkError(error)) {
    return new Error(formatErrorMessage(ErrorCode.NCE, 'Network Error'));
  }
  if (axios.isAxiosError(error)) {
    if (error.code === 'ERR_NETWORK') {
      return new Error(formatErrorMessage(ErrorCode.SDN, 'Something wrong in Server'));
    }
    const axiosError = error as AxiosError<ErrorResponse>;
    if (axiosError.response?.data) {
      return new Error(formatErrorMessage(
        axiosError.response.data.errorCode,
        axiosError.response.data.message
      ));
    }
  }
  return new Error(formatErrorMessage(ErrorCode.WEF, 'Unexpected Error'));
};