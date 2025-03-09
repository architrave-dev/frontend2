import { ContactResponse } from '../dto/ResDtoRepository';
import { UpdateContactReq } from '../dto/ReqDtoRepository';
import { baseApi, handleApiError, sendApiRequest } from './apiConfig';


export const getContact = async (aui: string): Promise<ContactResponse> => {
  try {
    const response = await baseApi.get<ContactResponse>(`/api/v1/contact?aui=${aui}`);
    return response.data;
  } catch (error) {
    throw handleApiError(error);
  }
};

export const updateContact = async (aui: string, data: UpdateContactReq): Promise<ContactResponse> => {
  return sendApiRequest('put', `/api/v1/contact?aui=${aui}`, data);
};
