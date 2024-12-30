import axios, { AxiosError } from 'axios';
import { getConfig } from '../env/envManager';
import { ErrorResponse, ContactResponse } from '../dto/ResDtoRepository';
import { UpdateContactReq } from '../dto/ReqDtoRepository';

const config = getConfig();

const contactApi = axios.create({
  // baseURL: API_BASE_URL,
  baseURL: config.apiBaseUrl,
  headers: {
    'Content-Type': 'application/json',
  },
});


export const getContact = async (aui: string): Promise<ContactResponse> => {
  try {
    const response = await contactApi.get<ContactResponse>(`/api/v1/contact?aui=${aui}`);
    return response.data;
  } catch (error) {
    throw handleApiError(error);
  }
};

export const updateContact = async (aui: string, data: UpdateContactReq): Promise<ContactResponse> => {
  try {
    const authToken = localStorage.getItem('authToken');
    if (!authToken) {
      throw new Error('Authentication required');
    }
    const response = await contactApi.put<ContactResponse>(`/api/v1/contact?aui=${aui}`, data, {
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

export default contactApi;