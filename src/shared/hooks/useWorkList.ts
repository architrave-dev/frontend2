import { useState } from 'react';
import { WorkListResponse, getWorkList, updateWork, createWork, WorkResponse, DeleteResponse, deleteWork } from '../api/workListApi';
import { CreateWorkReq, DeleteWorkReq, useWorkListStore } from '../store/WorkListStore';
import { UpdateWorkReq, WorkData } from '../store/WorkListStore';
import { useWorkViewStore, useWorkViewStoreForUpdate } from '../store/WorkViewStore';
import { ErrorCode } from '../api/errorCode';
import { useAuth } from './useAuth';


interface UseWorkListResult {
  isLoading: boolean;
  error: string | null;
  workList: WorkData[];
  getWorkList: (aui: string) => Promise<void>;
  updateWork: (aui: string, data: UpdateWorkReq) => Promise<void>;
  createWork: (aui: string, data: CreateWorkReq) => Promise<void>;
  deleteWork: (aui: string, data: DeleteWorkReq) => Promise<void>;
}

export const useWorkList = (): UseWorkListResult => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { workList, setWorkList } = useWorkListStore();
  const { setActiveWork } = useWorkViewStore();
  const { setUpdatedActiveWork } = useWorkViewStoreForUpdate();
  const { refresh } = useAuth();

  const handleGetWorkSuccess = (response: WorkListResponse) => {
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
    action: 'get' | 'update' | 'create' | 'delete',
    data?: UpdateWorkReq | CreateWorkReq | DeleteWorkReq,
    retryCount: number = 0
  ) => {
    setIsLoading(true);
    setError(null);
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
        case 'get':
        default:
          handleGetWorkSuccess(await getWorkList(aui));
          break;
      }
    } catch (err) {
      const errCode = err instanceof Error ? err.message : 'An unexpected error occurred';
      if (errCode === ErrorCode.ATX && retryCount < 1) {
        console.log("refresh it!!");
        const refreshToken = localStorage.getItem('refreshToken');
        if (refreshToken != null) {
          try {
            await refresh({ refreshToken });
            await handleWorkRequest(aui, action, data, retryCount + 1);
            setError(null);
            return;
          } catch (refreshError) {
            console.error("Error refreshing token:", refreshError);
          }
        }
      }
      // setError(err instanceof Error ? err.message : 'An unexpected error occurred');

    } finally {
      setIsLoading(false);
    }
  };

  const getWorkHandler = (aui: string) => handleWorkRequest(aui, 'get');
  const updateWorkHandler = (aui: string, data: UpdateWorkReq) => handleWorkRequest(aui, 'update', data);
  const createWorkHandler = (aui: string, data: CreateWorkReq) => handleWorkRequest(aui, 'create', data);
  const deleteWorkHandler = (aui: string, data: DeleteWorkReq) => handleWorkRequest(aui, 'delete', data);


  return {
    isLoading,
    error,
    workList,
    getWorkList: getWorkHandler,
    updateWork: updateWorkHandler,
    createWork: createWorkHandler,
    deleteWork: deleteWorkHandler,
  };
};

