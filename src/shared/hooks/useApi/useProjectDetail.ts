import { useState } from 'react';
import { useProjectStore, useProjectStoreForUpdate } from '../../store/projectStore';
import { getProjectDetail, updateProject } from '../../api/projectApi';
import { useProjectInfoListStore, useProjectInfoListStoreForUpdate } from '../../store/projectInfoListStore';
import { useGlobalErrStore } from '../../store/errorStore';
import { convertStringToErrorCode } from '../../api/errorCode';
import { ProjectData } from '../../dto/EntityRepository';
import { UpdateProjectReq } from '../../dto/ReqDtoRepository';
import { ProjectResponse } from '../../dto/ResDtoRepository';


interface UseProjectResult {
  isLoading: boolean;
  project: ProjectData | null;
  getProject: (aui: string, projectId: string) => Promise<void>;
  updateProject: (aui: string, data: UpdateProjectReq) => Promise<void>;
}

export const useProjectDetail = (): UseProjectResult => {
  const [isLoading, setIsLoading] = useState(false);
  const { setManagedErr, clearErr } = useGlobalErrStore();
  const { project, setProject } = useProjectStore();
  const { setUpdatedProjectDto } = useProjectStoreForUpdate();
  const { setProjectInfoList } = useProjectInfoListStore()
  const { clearAll } = useProjectInfoListStoreForUpdate()


  const handleProjectSuccess = (response: ProjectResponse) => {
    const projectData = response.data;
    setProject(projectData);
    setUpdatedProjectDto(projectData);
    setProjectInfoList(projectData.projectInfoList);
    clearAll();
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
        handleProjectSuccess(response);
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
    isLoading,
    project,
    getProject: getProjectHandler,
    updateProject: updateProjectHandler
  };
};