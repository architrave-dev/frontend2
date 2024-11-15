import { useState } from 'react';
import { getProjectElementList, updateProjectElementList } from '../../api/projectElementApi';
import { useProjectElementListStore, useProjectElementListStoreForUpdate } from '../../store/projectElementStore';
import { useGlobalErrStore } from '../../store/errorStore';
import { convertStringToErrorCode } from '../../api/errorCode';
import { ProjectElementData } from '../../dto/EntityRepository';
import { UpdateProjectElementListReq } from '../../dto/ReqDtoRepository';
import { ProjectElementListResponse } from '../../dto/ResDtoRepository';


interface UseProjectElementResult {
  isLoading: boolean;
  projectElementList: ProjectElementData[];
  getProjectElementList: (aui: string, projectId: string) => Promise<void>;
  updateProjectElementList: (aui: string, data: UpdateProjectElementListReq) => Promise<void>;
}

export const useProjectElement = (): UseProjectElementResult => {
  const [isLoading, setIsLoading] = useState(false);
  const { setManagedErr, clearErr } = useGlobalErrStore();
  const { projectElementList, setProjectElementList } = useProjectElementListStore();
  const { clearAll } = useProjectElementListStoreForUpdate();


  const handleProjectElementSuccess = (response: ProjectElementListResponse) => {
    const projectElementListData = response.data;
    const peIndex = projectElementListData.peIndex;
    console.log("peIndex: ", peIndex);
    setProjectElementList(projectElementListData.projectElementList);
    clearAll();
  };

  const handleProjectElementRequest = async (
    aui: string,
    action: 'get' | 'update',
    projectId: string | null,
    data?: UpdateProjectElementListReq
  ) => {
    setIsLoading(true);
    clearErr();
    try {
      if (data) {
        const response = await updateProjectElementList(aui, data);
        handleProjectElementSuccess(response);
      } else if (projectId) {
        const response = await getProjectElementList(aui, projectId);
        handleProjectElementSuccess(response);
      }
    } catch (err) {
      const errCode = err instanceof Error ? err.message : 'An unexpected error occurred';
      const convertedErrCode = convertStringToErrorCode(errCode);
      setManagedErr({
        errCode: convertedErrCode,
        retryFunction: () => handleProjectElementRequest(aui, action, projectId, data)
      });
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const getProjectElementHandler = (aui: string, projectId: string) => handleProjectElementRequest(aui, 'get', projectId);
  const updateProjectDetailHandler = (aui: string, data: UpdateProjectElementListReq) => handleProjectElementRequest(aui, 'update', null, data);


  return {
    isLoading,
    projectElementList,
    getProjectElementList: getProjectElementHandler,
    updateProjectElementList: updateProjectDetailHandler,
  };
};