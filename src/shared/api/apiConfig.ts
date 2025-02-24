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

export const handleApiError = (error: unknown): Error => {
  if (isNetworkError(error)) {
    return new Error(`${ErrorCode.NCE}:: Network Error`)
  }
  if (axios.isAxiosError(error)) {
    if (error.code === 'ERR_NETWORK') {
      return new Error(`${ErrorCode.SDN}:: Something wrong in Server`);
    }
    const axiosError = error as AxiosError<ErrorResponse>;
    if (axiosError.response?.data) {
      return new Error(`${axiosError.response.data.errorCode}:: ${axiosError.response.data.message}`);
    }
  }
  return new Error(`${ErrorCode.WEF}:: Unexpected Error`);
};