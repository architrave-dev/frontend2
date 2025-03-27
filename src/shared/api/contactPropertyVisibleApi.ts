import { ContactPropertyVisibleResponse, } from '../dto/ResDtoRepository';
import { UpdateContactPropertyVisibleReq } from '../dto/ReqDtoRepository';
import { baseApi, handleApiError, sendApiRequest } from './apiConfig';


export const getContactPropertyVisible = async (aui: string): Promise<ContactPropertyVisibleResponse> => {
  try {
    const response = await baseApi.get<ContactPropertyVisibleResponse>(`/api/v1/contact-property?aui=${aui}`);
    return response.data;
  } catch (error) {
    throw handleApiError(error);
  }
};

export const updateContactPropertyVisible = async (aui: string, data: UpdateContactPropertyVisibleReq): Promise<ContactPropertyVisibleResponse> => {
  return sendApiRequest('put', `/api/v1/contact-property?aui=${aui}`, data);
};
