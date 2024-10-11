import { useState } from 'react';
import { ProjectElementListResponse, UpdateProjectElementListReq, getProjectElementList, updateProjectElementList } from '../api/projectElementApi';
import { ProjectElementData, useProjectElementListStore, useProjectElementListStoreForUpdate } from '../store/projectElementStore';
import { useGlobalErrStore } from '../store/errorStore';
import { convertStringToErrorCode } from '../api/errorCode';


interface UseProjectElementResult {
  isLoading: boolean;
  projectElementList: ProjectElementData[];
  getProjectElementList: (aui: string, title: string) => Promise<void>;
  updateProjectElementList: (aui: string, data: UpdateProjectElementListReq) => Promise<void>;
}

export const useProjectElement = (): UseProjectElementResult => {
  const [isLoading, setIsLoading] = useState(false);
  const { setManagedErr, clearErr } = useGlobalErrStore();
  const { projectElementList, setProjectElementList } = useProjectElementListStore();
  const { clearAll } = useProjectElementListStoreForUpdate();


  const handleProjectElementSuccess = (response: ProjectElementListResponse) => {
    const projectElementListData = response.data;
    setProjectElementList(projectElementListData);
    clearAll();
  };

  const handleProjectElementRequest = async (
    aui: string,
    action: 'get' | 'update',
    title: string | null,
    data?: UpdateProjectElementListReq
  ) => {
    setIsLoading(true);
    clearErr();
    try {
      if (data) {
        const response = await updateProjectElementList(aui, data);
        handleProjectElementSuccess(response);
      } else if (title) {
        const response = await getProjectElementList(aui, title);
        handleProjectElementSuccess(response);
      }
    } catch (err) {
      const errCode = err instanceof Error ? err.message : 'An unexpected error occurred';
      const convertedErrCode = convertStringToErrorCode(errCode);
      setManagedErr({
        errCode: convertedErrCode,
        retryFunction: () => handleProjectElementRequest(aui, action, title, data)
      });
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const getProjectElementHandler = (aui: string, projectTitle: string) => handleProjectElementRequest(aui, 'get', projectTitle);
  const updateProjectDetailHandler = (aui: string, data: UpdateProjectElementListReq) => handleProjectElementRequest(aui, 'update', null, data);


  return {
    isLoading,
    projectElementList,
    getProjectElementList: getProjectElementHandler,
    updateProjectElementList: updateProjectDetailHandler,
  };
};