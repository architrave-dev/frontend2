import { ProjectInfoData } from '../../dto/EntityRepository';
import { CreateProjectInfoReq, RemoveProjectInfoReq, UpdateProjectInfoReq, UpdateReorderListReq } from '../../dto/ReqDtoRepository';
import { DeleteResponse, ProjectInfoListResponse, ProjectInfoResponse } from '../../dto/ResDtoRepository';
import { createProjectInfo, deleteProjectInfo, getProjectInfoList, reorderProjectInfo, updateProjectInfo } from '../../api/projectInfoApi';
import { useProjectInfoListStore } from '../../store/projectInfoStore';
import { useTempAlertStore } from '../../store/portal/tempAlertStore';
import { useApiWrapper } from './apiWrapper';

interface UseProjectInfoResult {
  projectInfoList: ProjectInfoData[];
  getProjectInfoList: (aui: string, projectId: string) => Promise<void>;
  createProjectInfo: (aui: string, data: CreateProjectInfoReq) => Promise<void>;
  updateProjectInfo: (aui: string, data: UpdateProjectInfoReq) => Promise<void>;
  deleteProjectInfo: (aui: string, data: RemoveProjectInfoReq) => Promise<void>;
  reorderProjectInfo: (aui: string, data: UpdateReorderListReq) => Promise<void>;
}

export const useProjectInfo = (): UseProjectInfoResult => {
  const { projectInfoList, setProjectInfoList, setOnlyProjectInfoList } = useProjectInfoListStore();
  const { setUpdatedTempAlert, setDeletedTempAlert } = useTempAlertStore();
  const withApiHandler = useApiWrapper();

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
    setUpdatedTempAlert();
  };

  const handleDeleteProjectInfoSuccess = (response: DeleteResponse) => {
    console.log("deleted well");
    setDeletedTempAlert();
  };

  const handleReorderProjectInfoSuccess = (response: ProjectInfoListResponse) => {
    const projectInfoListData = response.data;
    setProjectInfoList(projectInfoListData);
  };

  const handleProjectElementRequest = async (
    aui: string,
    action: 'get' | 'create' | 'update' | 'delete' | 'reorder',
    projectId: string | null,
    data?: CreateProjectInfoReq | UpdateProjectInfoReq | RemoveProjectInfoReq | UpdateReorderListReq
  ) => {
    const apiFunction = async () => {
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
        case 'reorder':
          handleReorderProjectInfoSuccess(await reorderProjectInfo(aui, data as UpdateReorderListReq));
          break;
        case 'get':
        default:
          handleProjectInfoListSuccess(await getProjectInfoList(aui, projectId as string));
          break;
      }
    };

    await withApiHandler(apiFunction, [aui, action, projectId, data]);
  };

  const getProjectElementHandler = (aui: string, projectId: string) => handleProjectElementRequest(aui, 'get', projectId);
  const createProjectInfoHandler = (aui: string, data: CreateProjectInfoReq) => handleProjectElementRequest(aui, 'create', null, data);
  const updateProjectInfoHandler = (aui: string, data: UpdateProjectInfoReq) => handleProjectElementRequest(aui, 'update', null, data);
  const deleteProjectInfoHandler = (aui: string, data: RemoveProjectInfoReq) => handleProjectElementRequest(aui, 'delete', null, data);
  const reorderProjectInfoHandler = (aui: string, data: UpdateReorderListReq) => handleProjectElementRequest(aui, 'reorder', null, data);

  return {
    projectInfoList,
    getProjectInfoList: getProjectElementHandler,
    createProjectInfo: createProjectInfoHandler,
    updateProjectInfo: updateProjectInfoHandler,
    deleteProjectInfo: deleteProjectInfoHandler,
    reorderProjectInfo: reorderProjectInfoHandler
  };
};