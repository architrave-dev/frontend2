import { useState } from 'react';
import { createProjectElement, createProjectElementWithWork, createProjectElementWithWorkDetail, getProjectElementList, updateProjectElementList } from '../../api/projectElementApi';
import { useProjectElementListStore, useProjectElementListStoreForUpdate } from '../../store/projectElementStore';
import { useGlobalErrStore } from '../../store/errorStore';
import { convertStringToErrorCode } from '../../api/errorCode';
import { ProjectElementData } from '../../dto/EntityRepository';
import { CreateProjectElementReq, CreateProjectElementWithWorkDetailReq, CreateProjectElementWithWorkReq, UpdateProjectElementListReq } from '../../dto/ReqDtoRepository';
import { ProjectElementListResponse, ProjectElementResponse } from '../../dto/ResDtoRepository';


interface UseProjectElementResult {
  isLoading: boolean;
  projectElementList: ProjectElementData[];
  getProjectElementList: (aui: string, projectId: string) => Promise<void>;
  updateProjectElementList: (aui: string, data: UpdateProjectElementListReq) => Promise<void>;
  createProjectElement: (aui: string, data: CreateProjectElementReq) => Promise<void>;
  createProjectElementWithWork: (aui: string, data: CreateProjectElementWithWorkReq) => Promise<void>;
  createProjectElementWithWorkDetail: (aui: string, data: CreateProjectElementWithWorkDetailReq) => Promise<void>;
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

  const handleCreateProjectElementSuccess = (response: ProjectElementResponse) => {
    const createdProjectElement = response.data;
    setProjectElementList([...projectElementList, createdProjectElement]);
  };

  const handleProjectElementRequest = async (
    aui: string,
    action: 'get' | 'create' | 'update' | 'import work' | 'import detail',
    projectId: string | null,
    data?: UpdateProjectElementListReq | CreateProjectElementReq | CreateProjectElementWithWorkReq | CreateProjectElementWithWorkDetailReq
  ) => {
    setIsLoading(true);
    clearErr();
    try {
      switch (action) {
        case 'create':
          handleCreateProjectElementSuccess(await createProjectElement(aui, data as CreateProjectElementReq));
          break;
        case 'update':
          handleProjectElementSuccess(await updateProjectElementList(aui, data as UpdateProjectElementListReq));
          break;
        case 'import work':
          handleCreateProjectElementSuccess(await createProjectElementWithWork(aui, data as CreateProjectElementWithWorkReq));
          break;
        case 'import detail':
          handleCreateProjectElementSuccess(await createProjectElementWithWorkDetail(aui, data as CreateProjectElementWithWorkDetailReq));
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
  const createProjectElementHandler = (aui: string, data: CreateProjectElementReq) => handleProjectElementRequest(aui, 'create', null, data);
  const createProjectElementWithWorkHandler = (aui: string, data: CreateProjectElementWithWorkReq) => handleProjectElementRequest(aui, 'import work', null, data);
  const createProjectElementWithWorkDetailHandler = (aui: string, data: CreateProjectElementWithWorkDetailReq) => handleProjectElementRequest(aui, 'import detail', null, data);
  const updateProjectDetailHandler = (aui: string, data: UpdateProjectElementListReq) => handleProjectElementRequest(aui, 'update', null, data);


  return {
    isLoading,
    projectElementList,
    getProjectElementList: getProjectElementHandler,
    updateProjectElementList: updateProjectDetailHandler,
    createProjectElement: createProjectElementHandler,
    createProjectElementWithWork: createProjectElementWithWorkHandler,
    createProjectElementWithWorkDetail: createProjectElementWithWorkDetailHandler,
  };
};