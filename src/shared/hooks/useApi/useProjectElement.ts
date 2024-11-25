import { useState } from 'react';
import { createProjectElementWithWork, getProjectElementList, updateProjectElementList } from '../../api/projectElementApi';
import { useProjectElementListStore, useProjectElementListStoreForUpdate } from '../../store/projectElementStore';
import { useGlobalErrStore } from '../../store/errorStore';
import { convertStringToErrorCode } from '../../api/errorCode';
import { ProjectElementData } from '../../dto/EntityRepository';
import { CreateProjectElementWithWorkReq, UpdateProjectElementListReq } from '../../dto/ReqDtoRepository';
import { ProjectElementListResponse, ProjectElementResponse } from '../../dto/ResDtoRepository';


interface UseProjectElementResult {
  isLoading: boolean;
  projectElementList: ProjectElementData[];
  getProjectElementList: (aui: string, projectId: string) => Promise<void>;
  updateProjectElementList: (aui: string, data: UpdateProjectElementListReq) => Promise<void>;
  createProjectElementWithWork: (aui: string, data: CreateProjectElementWithWorkReq) => Promise<void>;
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

  const handleCreateProjectElementWithWorkSuccess = (response: ProjectElementResponse) => {
    const createdProjectElement = response.data;
    console.log("createdProjectElement: ", createdProjectElement);
    setProjectElementList([...projectElementList, createdProjectElement]);
    // clearAll();
  };

  const handleProjectElementRequest = async (
    aui: string,
    action: 'get' | 'update' | 'import',
    projectId: string | null,
    data?: UpdateProjectElementListReq | CreateProjectElementWithWorkReq
  ) => {
    setIsLoading(true);
    clearErr();
    try {
      switch (action) {
        case 'update':
          handleProjectElementSuccess(await updateProjectElementList(aui, data as UpdateProjectElementListReq));
          break;
        case 'import':
          handleCreateProjectElementWithWorkSuccess(await createProjectElementWithWork(aui, data as CreateProjectElementWithWorkReq));
          break;
        case 'get':
        default:
          handleProjectElementSuccess(await getProjectElementList(aui, projectId as string));
          break;
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
  const createProjectElementWithWorkHandler = (aui: string, data: CreateProjectElementWithWorkReq) => handleProjectElementRequest(aui, 'import', null, data);
  const updateProjectDetailHandler = (aui: string, data: UpdateProjectElementListReq) => handleProjectElementRequest(aui, 'update', null, data);


  return {
    isLoading,
    projectElementList,
    getProjectElementList: getProjectElementHandler,
    updateProjectElementList: updateProjectDetailHandler,
    createProjectElementWithWork: createProjectElementWithWorkHandler,
  };
};