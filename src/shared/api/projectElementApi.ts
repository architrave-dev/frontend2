import { ProjectElementListResponse, ProjectElementResponse } from '../dto/ResDtoRepository';
import { CreateProjectElementReq, CreateProjectElementWithWorkDetailReq, CreateProjectElementWithWorkReq, DeleteProjectElementReq, UpdateProjectElementReq } from '../dto/ReqDtoRepository';
import { baseApi, handleApiError } from './apiConfig';


export const getProjectElementList = async (aui: string, projectId: string): Promise<ProjectElementListResponse> => {
  try {
    const response = await baseApi.get<ProjectElementListResponse>(`/api/v1/project-element?aui=${aui}&projectId=${projectId}`);
    return response.data;
  } catch (error) {
    throw handleApiError(error);
  }
};

export const createProjectElement = async (aui: string, data: CreateProjectElementReq): Promise<ProjectElementResponse> => {
  try {
    const authToken = localStorage.getItem('authToken');
    if (!authToken) {
      throw new Error('Authentication required');
    }
    const response = await baseApi.post<ProjectElementResponse>(`/api/v1/project-element?aui=${aui}`, data, {
      headers: { Authorization: `${authToken}` }
    });
    return response.data;
  } catch (error) {
    throw handleApiError(error);
  }
};
export const updateProjectElement = async (aui: string, data: UpdateProjectElementReq): Promise<ProjectElementResponse> => {
  try {
    const authToken = localStorage.getItem('authToken');
    if (!authToken) {
      throw new Error('Authentication required');
    }
    const response = await baseApi.put<ProjectElementResponse>(`/api/v1/project-element?aui=${aui}`, data, {
      headers: { Authorization: `${authToken}` }
    });
    return response.data;
  } catch (error) {
    throw handleApiError(error);
  }
};
export const deleteProjectElement = async (aui: string, data: DeleteProjectElementReq): Promise<ProjectElementResponse> => {
  try {
    const authToken = localStorage.getItem('authToken');
    if (!authToken) {
      throw new Error('Authentication required');
    }
    const response = await baseApi.delete<ProjectElementResponse>(`/api/v1/project-element?aui=${aui}&peId=${data.projectElementId}`, {
      headers: { Authorization: `${authToken}` }
    });
    return response.data;
  } catch (error) {
    throw handleApiError(error);
  }
};

export const createProjectElementWithWork = async (aui: string, data: CreateProjectElementWithWorkReq): Promise<ProjectElementResponse> => {
  try {
    const authToken = localStorage.getItem('authToken');
    if (!authToken) {
      throw new Error('Authentication required');
    }
    const response = await baseApi.post<ProjectElementResponse>(`/api/v1/project-element/import?aui=${aui}`, data, {
      headers: { Authorization: `${authToken}` }
    });
    return response.data;
  } catch (error) {
    throw handleApiError(error);
  }
};

export const createProjectElementWithWorkDetail = async (aui: string, data: CreateProjectElementWithWorkDetailReq): Promise<ProjectElementResponse> => {
  try {
    const authToken = localStorage.getItem('authToken');
    if (!authToken) {
      throw new Error('Authentication required');
    }
    const response = await baseApi.post<ProjectElementResponse>(`/api/v1/project-element/import/detail?aui=${aui}`, data, {
      headers: { Authorization: `${authToken}` }
    });
    return response.data;
  } catch (error) {
    throw handleApiError(error);
  }
};

// export const updateProjectElementList = async (aui: string, data: UpdateProjectElementListReq): Promise<ProjectElementListResponse> => {
//   try {
//     const authToken = localStorage.getItem('authToken');
//     if (!authToken) {
//       throw new Error('Authentication required');
//     }
//     const response = await baseApi.put<ProjectElementListResponse>(`/api/v1/project-element?aui=${aui}`, data, {
//       headers: { Authorization: `${authToken}` }
//     });
//     return response.data;
//   } catch (error) {
//     throw handleApiError(error);
//   }
// };