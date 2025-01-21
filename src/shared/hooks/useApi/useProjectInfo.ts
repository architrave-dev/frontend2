import { useGlobalErrStore } from '../../store/errorStore';
import { convertStringToErrorCode } from '../../api/errorCode';
import { ProjectInfoData } from '../../dto/EntityRepository';
import { CreateProjectInfoReq, RemoveProjectInfoReq, UpdateProjectInfoReq } from '../../dto/ReqDtoRepository';
import { DeleteResponse, ProjectInfoListResponse, ProjectInfoResponse } from '../../dto/ResDtoRepository';
import { useLoadingStore } from '../../store/loadingStore';
import { createProjectInfo, deleteProjectInfo, getProjectInfoList, updateProjectInfo } from '../../api/projectInfoApi';
import { useProjectInfoListStore } from '../../store/projectInfoStore';


interface UseProjectInfoResult {
  projectInfoList: ProjectInfoData[];
  getProjectInfoList: (aui: string, projectId: string) => Promise<void>;
  createProjectInfo: (aui: string, data: CreateProjectInfoReq) => Promise<void>;
  updateProjectInfo: (aui: string, data: UpdateProjectInfoReq) => Promise<void>;
  deleteProjectInfo: (aui: string, data: RemoveProjectInfoReq) => Promise<void>;
}

export const useProjectInfo = (): UseProjectInfoResult => {
  const { setIsLoading } = useLoadingStore();
  const { setManagedErr, clearErr } = useGlobalErrStore();
  const { projectInfoList, setProjectInfoList, setOnlyProjectInfoList } = useProjectInfoListStore();

  const handleProjectInfoListSuccess = (response: ProjectInfoListResponse) => {
    const projectInfoListData = response.data;
    setProjectInfoList(projectInfoListData);
  };

  const handleCreateProjectInfoSuccess = (response: ProjectInfoResponse) => {
    const createdProjectElement = response.data;
    setProjectInfoList([...projectInfoList, createdProjectElement]);

  };
  const handleUpdateProjectInfoSuccess = (response: ProjectInfoResponse) => {
    const updatedProjectInfo = response.data;
    const newPiList = projectInfoList.map((pi) => pi.id === updatedProjectInfo.id ? updatedProjectInfo : pi);
    setOnlyProjectInfoList(newPiList);
  };

  const handleDeleteProjectInfoSuccess = (response: DeleteResponse) => {
    console.log("deleted well");
  };

  const handleProjectElementRequest = async (
    aui: string,
    action: 'get' | 'create' | 'update' | 'delete',
    projectId: string | null,
    data?: CreateProjectInfoReq | UpdateProjectInfoReq | RemoveProjectInfoReq
  ) => {
    setIsLoading(true);
    clearErr();
    try {
      switch (action) {
        case 'create':
          handleCreateProjectInfoSuccess(await createProjectInfo(aui, data as CreateProjectInfoReq));
          break;
        case 'update':
          handleUpdateProjectInfoSuccess(await updateProjectInfo(aui, data as UpdateProjectInfoReq));
          break;
        case 'delete':
          handleDeleteProjectInfoSuccess(await deleteProjectInfo(aui, data as RemoveProjectInfoReq));
          break;
        case 'get':
        default:
          handleProjectInfoListSuccess(await getProjectInfoList(aui, projectId as string));
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
  const createProjectInfoHandler = (aui: string, data: CreateProjectInfoReq) => handleProjectElementRequest(aui, 'create', null, data);
  const updateProjectInfoHandler = (aui: string, data: UpdateProjectInfoReq) => handleProjectElementRequest(aui, 'update', null, data);
  const deleteProjectInfoHandler = (aui: string, data: RemoveProjectInfoReq) => handleProjectElementRequest(aui, 'delete', null, data);


  return {
    projectInfoList,
    getProjectInfoList: getProjectElementHandler,
    createProjectInfo: createProjectInfoHandler,
    updateProjectInfo: updateProjectInfoHandler,
    deleteProjectInfo: deleteProjectInfoHandler
  };
};