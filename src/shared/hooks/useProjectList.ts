import { useState } from 'react';
import { ProjectSimpleData, useProjectListStore } from '../store/projectListStore';
import { CreateProjectReq, CreatedProjectResponse, ProjectListResponse, createProject, getProjectList } from '../api/projectApi';
import { useGlobalErrStore } from '../store/errorStore';
import { convertStringToErrorCode } from '../api/errorCode';


interface UseProjectListResult {
  isLoading: boolean;
  projects: ProjectSimpleData[];
  getProjectList: (aui: string) => Promise<void>;
  createProject: (aui: string, data: CreateProjectReq) => Promise<void>;
}

export const useProjectList = (): UseProjectListResult => {
  const [isLoading, setIsLoading] = useState(false);
  const { setManagedErr, clearErr } = useGlobalErrStore();
  const { projects, setProjects } = useProjectListStore();

  const handleProjectListSuccess = (response: ProjectListResponse) => {
    const projectListData = response.data;
    setProjects(projectListData);
  };

  const handleCreateProjectSuccess = (response: CreatedProjectResponse) => {
    const createdProjectData = response.data;
    setProjects([...projects, createdProjectData]);
  };

  const handleProjectRequest = async (
    aui: string,
    action: 'get' | 'create',
    data?: CreateProjectReq
  ) => {
    setIsLoading(true);
    clearErr();
    try {
      if (data) {
        const response = await createProject(aui, data);
        handleCreateProjectSuccess(response);
      } else {
        const response = await getProjectList(aui);
        handleProjectListSuccess(response);
      }
    } catch (err) {
      const errCode = err instanceof Error ? err.message : 'An unexpected error occurred';
      const convertedErrCode = convertStringToErrorCode(errCode);
      setManagedErr({
        errCode: convertedErrCode,
        retryFunction: () => handleProjectRequest(aui, action, data)
      });
      throw err;
    } finally {
      setIsLoading(false);
    }
  };


  const getProjectListHandler = (aui: string) => handleProjectRequest(aui, 'get');
  const createProjectHandler = (aui: string, data: CreateProjectReq) => handleProjectRequest(aui, 'create', data);


  return {
    isLoading,
    projects,
    getProjectList: getProjectListHandler,
    createProject: createProjectHandler
  };
};