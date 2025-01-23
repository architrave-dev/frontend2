import { createProjectElement, createProjectElementWithWork, createProjectElementWithWorkDetail, deleteProjectElement, getProjectElementList, updateProjectElement } from '../../api/projectElementApi';
import { useProjectElementListStore } from '../../store/projectElementStore';
import { useGlobalErrStore } from '../../store/errorStore';
import { convertStringToErrorCode } from '../../api/errorCode';
import { ProjectElementData } from '../../dto/EntityRepository';
import { CreateProjectElementReq, CreateProjectElementWithWorkDetailReq, CreateProjectElementWithWorkReq, DeleteProjectElementReq, UpdateProjectElementListReq, UpdateProjectElementReq } from '../../dto/ReqDtoRepository';
import { ProjectElementListResponse, ProjectElementResponse } from '../../dto/ResDtoRepository';
import { useLoadingStore } from '../../store/loadingStore';
import { useTempAlertStore } from '../../store/portal/tempAlertStore';


interface UseProjectElementResult {
  projectElementList: ProjectElementData[];
  getProjectElementList: (aui: string, projectId: string) => Promise<void>;
  createProjectElement: (aui: string, data: CreateProjectElementReq) => Promise<void>;
  updateProjectElement: (aui: string, data: UpdateProjectElementReq) => Promise<void>;
  deleteProjectElement: (aui: string, data: DeleteProjectElementReq) => Promise<void>;
  createProjectElementWithWork: (aui: string, data: CreateProjectElementWithWorkReq) => Promise<void>;
  createProjectElementWithWorkDetail: (aui: string, data: CreateProjectElementWithWorkDetailReq) => Promise<void>;
}

export const useProjectElement = (): UseProjectElementResult => {
  const { setIsLoading } = useLoadingStore();
  const { setManagedErr, clearErr } = useGlobalErrStore();
  const { projectElementList, setProjectElementList } = useProjectElementListStore();
  const { setUpdatedTempAlert, setDeletedTempAlert } = useTempAlertStore();


  const handleProjectElementSuccess = (response: ProjectElementListResponse) => {
    const projectElementListData = response.data;
    const peIndex = projectElementListData.peIndex;
    console.log("peIndex: ", peIndex);
    setProjectElementList(projectElementListData.projectElementList);
  };

  const handleCreateProjectElementSuccess = (response: ProjectElementResponse) => {
    const createdProjectElement = response.data;
    setProjectElementList([...projectElementList, createdProjectElement]);
  };

  const handleUpdateProjectElementSuccess = (response: ProjectElementResponse) => {
    const updated = response.data;
    const peListData = projectElementList.map((pe) => pe.id === updated.id ? updated : pe);
    setProjectElementList(peListData);
    setUpdatedTempAlert();
  };

  const handleDeleteProjectElementSuccess = (response: ProjectElementResponse) => {
    console.log("deleted well");
    setDeletedTempAlert();
  };



  const handleProjectElementRequest = async (
    aui: string,
    action: 'get' | 'create' | 'update' | 'delete' | 'import work' | 'import detail',
    projectId: string | null,
    data?: CreateProjectElementReq | UpdateProjectElementReq | DeleteProjectElementReq |
      CreateProjectElementWithWorkReq | CreateProjectElementWithWorkDetailReq
  ) => {
    setIsLoading(true);
    clearErr();
    try {
      switch (action) {
        case 'create':
          handleCreateProjectElementSuccess(await createProjectElement(aui, data as CreateProjectElementReq));
          break;
        case 'update':
          handleUpdateProjectElementSuccess(await updateProjectElement(aui, data as UpdateProjectElementReq));
          break;
        case 'delete':
          handleDeleteProjectElementSuccess(await deleteProjectElement(aui, data as DeleteProjectElementReq));
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
  const updateProjectElementHandler = (aui: string, data: UpdateProjectElementReq) => handleProjectElementRequest(aui, 'update', null, data);
  const deleteProjectElementHandler = (aui: string, data: DeleteProjectElementReq) => handleProjectElementRequest(aui, 'delete', null, data);
  const createProjectElementWithWorkHandler = (aui: string, data: CreateProjectElementWithWorkReq) => handleProjectElementRequest(aui, 'import work', null, data);
  const createProjectElementWithWorkDetailHandler = (aui: string, data: CreateProjectElementWithWorkDetailReq) => handleProjectElementRequest(aui, 'import detail', null, data);


  return {
    projectElementList,
    getProjectElementList: getProjectElementHandler,
    createProjectElement: createProjectElementHandler,
    updateProjectElement: updateProjectElementHandler,
    deleteProjectElement: deleteProjectElementHandler,
    createProjectElementWithWork: createProjectElementWithWorkHandler,
    createProjectElementWithWorkDetail: createProjectElementWithWorkDetailHandler,
  };
};