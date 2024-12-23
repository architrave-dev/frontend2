import { useState } from 'react';
import { convertStringToErrorCode } from '../../api/errorCode';
import { useGlobalErrStore } from '../../store/errorStore';
import { CreateWorkDetailReq, DeleteWorkDetailReq, UpdateWorkDetailReq } from '../../dto/ReqDtoRepository';
import { DeleteResponse, WorkDetailListResponse, WorkDetailResponse } from '../../dto/ResDtoRepository';
import { createWorkDetail, deleteWorkDetail, getWorkDetail, getWorkDetailList, updateWorkDetail } from '../../api/workDetailApi';
import { useWorkViewStore, useWorkViewStoreForUpdate } from '../../store/WorkViewStore';


interface UseWorkListResult {
  isLoading: boolean;
  // workDetailList: WorkDetailData[];
  getWorkDetail: (aui: string, workDetailId: string) => Promise<void>;
  getWorkDetailList: (aui: string, workId: string) => Promise<void>;
  updateWorkDetail: (aui: string, data: UpdateWorkDetailReq) => Promise<void>;
  createWorkDetail: (aui: string, data: CreateWorkDetailReq) => Promise<void>;
  deleteWorkDetail: (aui: string, data: DeleteWorkDetailReq) => Promise<void>;
}

export const useWorkDetail = (): UseWorkListResult => {
  const [isLoading, setIsLoading] = useState(false);
  const { setManagedErr, clearErr } = useGlobalErrStore();
  const { activeWorkDetailList, setActiveWorkDetailList } = useWorkViewStore();
  const { updateActiveWorkDetailList, setUpdateActiveWorkDetailList } = useWorkViewStoreForUpdate();

  const handleGetWorkDetailSuccess = (response: WorkDetailResponse) => {
    const data = response.data;
  };

  const handleGetWorkDetailListSuccess = (response: WorkDetailListResponse) => {
    const data = response.data;
    setUpdateActiveWorkDetailList(data);
  };

  const handleUpdateWorkDetailSuccess = (response: WorkDetailResponse) => {
    const data = response.data;
    const newUpdateWorkDetailList = updateActiveWorkDetailList.map((wd) => wd.id === data.id ? data : wd);
    const newWorkDetailList = activeWorkDetailList.map((wd) => wd.id === data.id ? data : wd);
    setUpdateActiveWorkDetailList(newUpdateWorkDetailList);
    setActiveWorkDetailList(newWorkDetailList);
  };

  const handleDeleteWorkDetailSuccess = (response: DeleteResponse) => {
    console.log("deleted well");
  };

  const handleCreateWorkDetailSuccess = (response: WorkDetailResponse) => {
    const data = response.data;
    setUpdateActiveWorkDetailList([...updateActiveWorkDetailList, data]);
    setActiveWorkDetailList([...activeWorkDetailList, data]);
  };

  const handleWorkDetailRequest = async (
    aui: string,
    action: 'get' | 'get list' | 'update' | 'create' | 'delete',
    data: UpdateWorkDetailReq | CreateWorkDetailReq | DeleteWorkDetailReq | string
  ) => {
    setIsLoading(true);
    clearErr();
    try {
      switch (action) {
        case 'delete':
          handleDeleteWorkDetailSuccess(await deleteWorkDetail(aui, data as DeleteWorkDetailReq));
          break;
        case 'update':
          handleUpdateWorkDetailSuccess(await updateWorkDetail(aui, data as UpdateWorkDetailReq));
          break;
        case 'create':
          handleCreateWorkDetailSuccess(await createWorkDetail(aui, data as CreateWorkDetailReq));
          break;
        case 'get list':
          handleGetWorkDetailListSuccess(await getWorkDetailList(aui, data as string));
          break;
        case 'get':
        default:
          handleGetWorkDetailSuccess(await getWorkDetail(aui, data as string));
          break;
      }
    } catch (err) {
      const errCode = err instanceof Error ? err.message : 'An unexpected error occurred';
      const convertedErrCode = convertStringToErrorCode(errCode);
      setManagedErr({
        errCode: convertedErrCode,
        retryFunction: () => handleWorkDetailRequest(aui, action, data)
      });
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const getWorkDetailHandler = (aui: string, data: string) => handleWorkDetailRequest(aui, 'get', data);
  const getWorkDetailListHandler = (aui: string, data: string) => handleWorkDetailRequest(aui, 'get list', data);
  const updateWorkDetailHandler = (aui: string, data: UpdateWorkDetailReq) => handleWorkDetailRequest(aui, 'update', data);
  const createWorkDetailHandler = (aui: string, data: CreateWorkDetailReq) => handleWorkDetailRequest(aui, 'create', data);
  const deleteWorkDetailHandler = (aui: string, data: DeleteWorkDetailReq) => handleWorkDetailRequest(aui, 'delete', data);


  return {
    isLoading,
    getWorkDetail: getWorkDetailHandler,
    getWorkDetailList: getWorkDetailListHandler,
    updateWorkDetail: updateWorkDetailHandler,
    createWorkDetail: createWorkDetailHandler,
    deleteWorkDetail: deleteWorkDetailHandler,
  };
};

