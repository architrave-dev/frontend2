import { baseApi, handleApiError } from './apiConfig';


export const healthCheck = async (): Promise<void> => {
  try {
    const response = await baseApi.get<void>('/health-check');
    console.log("response: ", response);
  } catch (error) {
    throw handleApiError(error);
  }
};
