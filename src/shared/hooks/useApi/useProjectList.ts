import { useState } from 'react';
import { useProjectListStore } from '../../store/projectListStore';
import { createProject, deleteProject, getProjectList } from '../../api/projectApi';
import { useGlobalErrStore } from '../../store/errorStore';
import { convertStringToErrorCode } from '../../api/errorCode';
import { ProjectSimpleData } from '../../dto/EntityRepository';
import { CreateProjectReq, RemoveProjectReq } from '../../dto/ReqDtoRepository';
import { CreatedProjectResponse, DeleteResponse, ProjectListResponse } from '../../dto/ResDtoRepository';


interface UseProjectListResult {
  isLoading: boolean;
  projects: ProjectSimpleData[];
  getProjectList: (aui: string) => Promise<void>;
  createProject: (aui: string, data: CreateProjectReq) => Promise<void>;
  deleteProject: (aui: string, data: RemoveProjectReq) => Promise<void>;
}

export const useProjectList = (): UseProjectListResult => {
  const [isLoading, setIsLoading] = useState(false);
  const { setManagedErr, clearErr } = useGlobalErrStore();
  const { projects, setProjects } = useProjectListStore();

  const handleProjectListSuccess = (response: ProjectListResponse) => {
    const projectListData = response.data;
    setProjects(projectListData);
  };

  const handleDeleteProjectSuccess = (response: DeleteResponse) => {
    console.log("deleted well");
  };

  const handleCreateProjectSuccess = (response: CreatedProjectResponse) => {
    const createdProjectData = response.data;
    setProjects([...projects, createdProjectData]);
  };

  const handleProjectRequest = async (
    aui: string,
    action: 'get' | 'create' | 'delete',
    data?: CreateProjectReq | RemoveProjectReq
  ) => {
    setIsLoading(true);
    clearErr();
    try {
      switch (action) {
        case 'delete':
          handleDeleteProjectSuccess(await deleteProject(aui, data as RemoveProjectReq));
          getProjectListHandler(aui);
          break;
        case 'create':
          handleCreateProjectSuccess(await createProject(aui, data as CreateProjectReq));
          break;
        case 'get':
        default:
          handleProjectListSuccess(await getProjectList(aui));
          break;
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
  const removeProjectHandler = (aui: string, data: RemoveProjectReq) => handleProjectRequest(aui, 'delete', data);


  return {
    isLoading,
    projects,
    getProjectList: getProjectListHandler,
    createProject: createProjectHandler,
    deleteProject: removeProjectHandler
  };
};