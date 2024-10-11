import { useState } from 'react';
import { ProjectData, useProjectStore } from '../store/projectStore';
import { ProjectResponse, UpdateProjectReq, getProjectDetail, updateProject } from '../api/projectApi';
import { useProjectInfoListStore, useProjectInfoListStoreForUpdate } from '../store/projectInfoListStore';
import { useGlobalErrStore } from '../store/errorStore';
import { convertStringToErrorCode } from '../api/errorCode';


interface UseProjectResult {
  isLoading: boolean;
  project: ProjectData | null;
  getProject: (aui: string, title: string) => Promise<void>;
  updateProject: (aui: string, data: UpdateProjectReq) => Promise<void>;
}

export const useProjectDetail = (): UseProjectResult => {
  const [isLoading, setIsLoading] = useState(false);
  const { setManagedErr, clearErr } = useGlobalErrStore();
  const { project, setProject } = useProjectStore();
  const { setProjectInfoList } = useProjectInfoListStore()
  const { clearAll } = useProjectInfoListStoreForUpdate()


  const handleProjectSuccess = (response: ProjectResponse) => {
    const projectData = response.data;
    setProject(projectData);
    setProjectInfoList(projectData.projectInfoList);
    clearAll();
  };

  const handleProjectRequest = async (
    aui: string,
    action: 'get' | 'update',
    title: string | null,
    data?: UpdateProjectReq
  ) => {
    setIsLoading(true);
    clearErr();
    try {
      if (data) {
        const response = await updateProject(aui, data);
        handleProjectSuccess(response);
      } else if (title) {
        const response = await getProjectDetail(aui, title);
        handleProjectSuccess(response);
      }
    } catch (err) {
      const errCode = err instanceof Error ? err.message : 'An unexpected error occurred';
      const convertedErrCode = convertStringToErrorCode(errCode);
      setManagedErr({
        errCode: convertedErrCode,
        retryFunction: () => handleProjectRequest(aui, action, title, data)
      });
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const getProjectHandler = (aui: string, title: string) => handleProjectRequest(aui, 'get', title);
  const updateProjectHandler = (aui: string, data: UpdateProjectReq) => handleProjectRequest(aui, 'update', null, data);


  return {
    isLoading,
    project,
    getProject: getProjectHandler,
    updateProject: updateProjectHandler
  };
};