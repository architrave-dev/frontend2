import { useState } from 'react';
import { getWorkList, updateWork, createWork, deleteWork, getWork, getSimpleWorkList } from '../../api/workListApi';
import { useWorkListStore } from '../../store/WorkListStore';
import { useWorkViewStore, useWorkViewStoreForUpdate } from '../../store/WorkViewStore';
import { convertStringToErrorCode } from '../../api/errorCode';
import { useGlobalErrStore } from '../../store/errorStore';
import { WorkData } from '../../dto/EntityRepository';
import { CreateWorkReq, DeleteWorkReq, UpdateWorkReq } from '../../dto/ReqDtoRepository';
import { DeleteResponse, WorkListResponse, WorkResponse, WorkSimpleListResponse, WorkWithDetailResponse } from '../../dto/ResDtoRepository';
import { useWorkStationStore } from '../../store/workStationStore';


interface UseWorkListResult {
  isLoading: boolean;
  workList: WorkData[];
  getWork: (workId: string) => Promise<void>;
  getWorkList: (aui: string) => Promise<void>;
  getSimpleWorkList: (aui: string) => Promise<void>;
  updateWork: (aui: string, data: UpdateWorkReq) => Promise<void>;
  createWork: (aui: string, data: CreateWorkReq) => Promise<void>;
  deleteWork: (aui: string, data: DeleteWorkReq) => Promise<void>;
}

export const useWorkList = (): UseWorkListResult => {
  const [isLoading, setIsLoading] = useState(false);
  const { setManagedErr, clearErr } = useGlobalErrStore();
  const { workList, setWorkList } = useWorkListStore();
  const { setSimpleWorkList } = useWorkStationStore();
  const { setActiveWork, setActiveWorkDetailList } = useWorkViewStore();
  const { setUpdatedActiveWork, setUpdateActiveWorkDetailList } = useWorkViewStoreForUpdate();

  const handleGetWorkSuccess = (response: WorkWithDetailResponse) => {
    const data = response.data;
    setActiveWork(data);
    setUpdatedActiveWork(data);
    setActiveWorkDetailList(data.workDetailList);
    setUpdateActiveWorkDetailList(data.workDetailList);
  };

  const handleGetSimpleWorkListSuccess = (response: WorkSimpleListResponse) => {
    const data = response.data;
    setSimpleWorkList(data);
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
    action: 'get' | 'get list' | 'get simple list' | 'update' | 'create' | 'delete',
    data?: UpdateWorkReq | CreateWorkReq | DeleteWorkReq
  ) => {
    setIsLoading(true);
    clearErr();
    try {
      switch (action) {
        case 'delete':
          handleDeleteWorkSuccess(await deleteWork(aui, data as DeleteWorkReq));
          getWorkListHandler(aui);
          break;
        case 'update':
          handleUpdateWorkSuccess(await updateWork(aui, data as UpdateWorkReq));
          break;
        case 'create':
          handleCreatWorkSuccess(await createWork(aui, data as CreateWorkReq));
          break;
        case 'get simple list':
          handleGetSimpleWorkListSuccess(await getSimpleWorkList(aui));
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

  const getWorkHandler = (workId: string) => handleWorkRequest(workId, 'get');
  const getWorkListHandler = (aui: string) => handleWorkRequest(aui, 'get list');
  const getSimpleWorkListHandler = (aui: string) => handleWorkRequest(aui, 'get simple list');
  const updateWorkHandler = (aui: string, data: UpdateWorkReq) => handleWorkRequest(aui, 'update', data);
  const createWorkHandler = (aui: string, data: CreateWorkReq) => handleWorkRequest(aui, 'create', data);
  const deleteWorkHandler = (aui: string, data: DeleteWorkReq) => handleWorkRequest(aui, 'delete', data);


  return {
    isLoading,
    workList,
    getWork: getWorkHandler,
    getWorkList: getWorkListHandler,
    getSimpleWorkList: getSimpleWorkListHandler,
    updateWork: updateWorkHandler,
    createWork: createWorkHandler,
    deleteWork: deleteWorkHandler,
  };
};

