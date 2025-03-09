import { sendApiRequest } from './apiConfig';
import { EmailRequest } from '../dto/ReqDtoRepository';


export const sendEmail = async (aui: string, data: EmailRequest): Promise<string> => {
  return sendApiRequest('post', `/send-email?aui=${aui}`, data);
};
