import { useProjectStore } from '../../store/projectStore';
import { getProjectDetail, updateProject } from '../../api/projectApi';
import { useGlobalErrStore } from '../../store/errorStore';
import { convertStringToErrorCode } from '../../api/errorCode';
import { ProjectData } from '../../dto/EntityRepository';
import { UpdateProjectReq } from '../../dto/ReqDtoRepository';
import { ProjectResponse } from '../../dto/ResDtoRepository';
import { useLoadingStore } from '../../store/loadingStore';
import { useTempAlertStore } from '../../store/portal/tempAlertStore';


interface UseProjectResult {
  project: ProjectData | null;
  getProject: (aui: string, projectId: string) => Promise<void>;
  updateProject: (aui: string, data: UpdateProjectReq) => Promise<void>;
}

export const useProjectDetail = (): UseProjectResult => {
  const { setIsLoading } = useLoadingStore();
  const { setManagedErr, clearErr } = useGlobalErrStore();
  const { project, setProject } = useProjectStore();
  const { setUpdatedTempAlert } = useTempAlertStore();

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
    projectId: string | null,
    data?: UpdateProjectReq
  ) => {
    setIsLoading(true);
    clearErr();
    try {
      if (data) {
        const response = await updateProject(aui, data);
        handleUpdateProjectSuccess(response);
      } else if (projectId) {
        const response = await getProjectDetail(aui, projectId);
        handleProjectSuccess(response);
      }
    } catch (err) {
      const errCode = err instanceof Error ? err.message : 'An unexpected error occurred';
      const convertedErrCode = convertStringToErrorCode(errCode);
      setManagedErr({
        errCode: convertedErrCode,
        retryFunction: () => handleProjectRequest(aui, action, projectId, data)
      });
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const getProjectHandler = (aui: string, projectId: string) => handleProjectRequest(aui, 'get', projectId);
  const updateProjectHandler = (aui: string, data: UpdateProjectReq) => handleProjectRequest(aui, 'update', null, data);


  return {
    project,
    getProject: getProjectHandler,
    updateProject: updateProjectHandler
  };
};