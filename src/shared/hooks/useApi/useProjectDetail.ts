import { useProjectStore } from '../../store/projectStore';
import { getProjectDetail, updateProject } from '../../api/projectApi';
import { ProjectData } from '../../dto/EntityRepository';
import { UpdateProjectReq } from '../../dto/ReqDtoRepository';
import { ProjectResponse } from '../../dto/ResDtoRepository';
import { useTempAlertStore } from '../../store/portal/tempAlertStore';
import { useApiWrapper } from './apiWrapper';


interface UseProjectResult {
  project: ProjectData | null;
  getProject: (aui: string, projectId: string) => Promise<void>;
  updateProject: (aui: string, data: UpdateProjectReq) => Promise<void>;
}

export const useProjectDetail = (): UseProjectResult => {
  const { project, setProject } = useProjectStore();
  const { setUpdatedTempAlert } = useTempAlertStore();
  const withApiHandler = useApiWrapper();

  const handleProjectSuccess = (response: ProjectResponse) => {
    const projectData = response.data;
    setProject(projectData);
  };

  const handleUpdateProjectSuccess = (response: ProjectResponse) => {
    const projectData = response.data;
    setProject(projectData);
    setUpdatedTempAlert();
  };

  const handleProjectRequest = async (
    aui: string,
    action: 'get' | 'update',
    data?: UpdateProjectReq | string
  ) => {
    const apiFunction = async () => {
      switch (action) {
        case 'update':
          return handleUpdateProjectSuccess(await updateProject(aui, data as UpdateProjectReq));
        case 'get':
        default:
          return handleProjectSuccess(await getProjectDetail(aui, data as string));
      }
    };

    await withApiHandler(apiFunction, [aui, action, data]);
  };

  const getProjectHandler = (aui: string, projectId: string) => handleProjectRequest(aui, 'get', projectId);
  const updateProjectHandler = (aui: string, data: UpdateProjectReq) => handleProjectRequest(aui, 'update', data);


  return {
    project,
    getProject: getProjectHandler,
    updateProject: updateProjectHandler
  };
};