import { baseApi, handleApiError } from './apiConfig';
import { EmailRequest } from '../dto/ReqDtoRepository';


export const sendEmail = async (aui: string, data: EmailRequest): Promise<string> => {
  try {
    const authToken = localStorage.getItem('authToken');
    if (!authToken) {
      throw new Error('Authentication required');
    }
    const response = await baseApi.post<string>(`/send-email?aui=${aui}`, data, {
      headers: { Authorization: `${authToken}` }
    });
    return response.data;
  } catch (error) {
    throw handleApiError(error);
  }
};
