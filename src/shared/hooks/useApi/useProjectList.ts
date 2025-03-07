import { useProjectListStore } from '../../store/projectListStore';
import { createProject, deleteProject, getProjectList, reorderProject } from '../../api/projectApi';
import { ProjectSimpleData } from '../../dto/EntityRepository';
import { CreateProjectReq, RemoveProjectReq, UpdateReorderListReq } from '../../dto/ReqDtoRepository';
import { CreatedProjectResponse, DeleteResponse, ProjectListResponse } from '../../dto/ResDtoRepository';
import { useTempAlertStore } from '../../store/portal/tempAlertStore';
import { useApiWrapper } from './apiWrapper';


interface UseProjectListResult {
  projects: ProjectSimpleData[];
  getProjectList: (aui: string) => Promise<void>;
  createProject: (aui: string, data: CreateProjectReq) => Promise<void>;
  deleteProject: (aui: string, data: RemoveProjectReq) => Promise<void>;
  reorderProject: (aui: string, data: UpdateReorderListReq) => Promise<void>;
}

export const useProjectList = (): UseProjectListResult => {
  const { projects, setProjects } = useProjectListStore();
  const { setDeletedTempAlert } = useTempAlertStore();
  const withApiHandler = useApiWrapper();

  const handleProjectListSuccess = (response: ProjectListResponse) => {
    const projectListData = response.data;
    setProjects(projectListData);
  };

  const handleDeleteProjectSuccess = (response: DeleteResponse) => {
    console.log("deleted well");
    setDeletedTempAlert();
  };

  const handleCreateProjectSuccess = (response: CreatedProjectResponse) => {
    const createdProjectData = response.data;
    setProjects([...projects, createdProjectData]);
  };

  const handleReorderProjectSuccess = (response: ProjectListResponse) => {
    const projectListData = response.data;
    setProjects(projectListData);
  };

  const handleProjectRequest = async (
    aui: string,
    action: 'get' | 'create' | 'delete' | 'reorder',
    data?: CreateProjectReq | RemoveProjectReq | UpdateReorderListReq
  ) => {
    const apiFunction = async () => {
      switch (action) {
        case 'delete':
          handleDeleteProjectSuccess(await deleteProject(aui, data as RemoveProjectReq));
          return getProjectListHandler(aui);
        case 'create':
          return handleCreateProjectSuccess(await createProject(aui, data as CreateProjectReq));
        case 'reorder':
          return handleReorderProjectSuccess(await reorderProject(aui, data as UpdateReorderListReq));
        case 'get':
        default:
          return handleProjectListSuccess(await getProjectList(aui));
      }
    };

    await withApiHandler(apiFunction, [aui, action, data]);
  };

  const getProjectListHandler = (aui: string) => handleProjectRequest(aui, 'get');
  const createProjectHandler = (aui: string, data: CreateProjectReq) => handleProjectRequest(aui, 'create', data);
  const removeProjectHandler = (aui: string, data: RemoveProjectReq) => handleProjectRequest(aui, 'delete', data);
  const reorderProjectHandler = (aui: string, data: UpdateReorderListReq) => handleProjectRequest(aui, 'reorder', data);

  return {
    projects,
    getProjectList: getProjectListHandler,
    createProject: createProjectHandler,
    deleteProject: removeProjectHandler,
    reorderProject: reorderProjectHandler
  };
};