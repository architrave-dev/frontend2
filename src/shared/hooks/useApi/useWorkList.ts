import { useState } from 'react';
import { getWorkList, updateWork, createWork, deleteWork, getWork } from '../../api/workListApi';
import { useWorkListStore } from '../../store/WorkListStore';
import { useWorkViewStore, useWorkViewStoreForUpdate } from '../../store/WorkViewStore';
import { convertStringToErrorCode } from '../../api/errorCode';
import { useGlobalErrStore } from '../../store/errorStore';
import { WorkData } from '../../dto/EntityRepository';
import { CreateWorkReq, DeleteWorkReq, UpdateWorkReq } from '../../dto/ReqDtoRepository';
import { DeleteResponse, WorkListResponse, WorkResponse, WorkWithDetailResponse } from '../../dto/ResDtoRepository';


interface UseWorkListResult {
  isLoading: boolean;
  workList: WorkData[];
  getWork: (aui: string) => Promise<void>;
  getWorkList: (aui: string) => Promise<void>;
  updateWork: (aui: string, data: UpdateWorkReq) => Promise<void>;
  createWork: (aui: string, data: CreateWorkReq) => Promise<void>;
  deleteWork: (aui: string, data: DeleteWorkReq) => Promise<void>;
}

export const useWorkList = (): UseWorkListResult => {
  const [isLoading, setIsLoading] = useState(false);
  const { setManagedErr, clearErr } = useGlobalErrStore();
  const { workList, setWorkList } = useWorkListStore();
  const { setActiveWork } = useWorkViewStore();
  const { setUpdatedActiveWork } = useWorkViewStoreForUpdate();

  const handleGetWorkSuccess = (response: WorkWithDetailResponse) => {
    const data = response.data;
    // data.workDetailList
    // setWorkList(data);
  };

  const handleGetWorkListSuccess = (response: WorkListResponse) => {
    const data = response.data;
    setWorkList(data);
  };

  const handleUpdateWorkSuccess = (response: WorkResponse) => {
    const data = response.data;
    const newWorkList = workList.map((each) => each.id === data.id ? data : each);
    setWorkList(newWorkList);
  };

  const handleDeleteWorkSuccess = (response: DeleteResponse) => {
    console.log("deleted well");
  };

  const handleCreatWorkSuccess = (response: WorkResponse) => {
    const data = response.data;
    setWorkList([...workList, data]);
    setActiveWork(data);
    setUpdatedActiveWork(data);
  };

  const handleWorkRequest = async (
    aui: string,
    action: 'get' | 'get list' | 'update' | 'create' | 'delete',
    data?: UpdateWorkReq | CreateWorkReq | DeleteWorkReq
  ) => {
    setIsLoading(true);
    clearErr();
    try {
      switch (action) {
        case 'delete':
          handleDeleteWorkSuccess(await deleteWork(aui, data as DeleteWorkReq));
          getWorkHandler(aui);
          break;
        case 'update':
          handleUpdateWorkSuccess(await updateWork(aui, data as UpdateWorkReq));
          break;
        case 'create':
          handleCreatWorkSuccess(await createWork(aui, data as CreateWorkReq));
          break;
        case 'get list':
          handleGetWorkListSuccess(await getWorkList(aui));
          break;
        case 'get':
        default:
          handleGetWorkSuccess(await getWork(aui));
          break;
      }
    } catch (err) {
      const errCode = err instanceof Error ? err.message : 'An unexpected error occurred';
      const convertedErrCode = convertStringToErrorCode(errCode);
      setManagedErr({
        errCode: convertedErrCode,
        retryFunction: () => handleWorkRequest(aui, action, data)
      });
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const getWorkHandler = (aui: string) => handleWorkRequest(aui, 'get');
  const getWorkListHandler = (aui: string) => handleWorkRequest(aui, 'get list');
  const updateWorkHandler = (aui: string, data: UpdateWorkReq) => handleWorkRequest(aui, 'update', data);
  const createWorkHandler = (aui: string, data: CreateWorkReq) => handleWorkRequest(aui, 'create', data);
  const deleteWorkHandler = (aui: string, data: DeleteWorkReq) => handleWorkRequest(aui, 'delete', data);


  return {
    isLoading,
    workList,
    getWork: getWorkHandler,
    getWorkList: getWorkListHandler,
    updateWork: updateWorkHandler,
    createWork: createWorkHandler,
    deleteWork: deleteWorkHandler,
  };
};

