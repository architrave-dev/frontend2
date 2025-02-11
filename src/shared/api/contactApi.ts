import { ContactResponse } from '../dto/ResDtoRepository';
import { UpdateContactReq } from '../dto/ReqDtoRepository';
import { baseApi, handleApiError } from './apiConfig';



export const getContact = async (aui: string): Promise<ContactResponse> => {
  try {
    const response = await baseApi.get<ContactResponse>(`/api/v1/contact?aui=${aui}`);
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
    const response = await baseApi.put<ContactResponse>(`/api/v1/contact?aui=${aui}`, data, {
      headers: { Authorization: `${authToken}` }
    });
    return response.data;
  } catch (error) {
    throw handleApiError(error);
  }
};
