import { useState } from 'react';
import { WorkListResponse, getWorkList, updateWork, createWork, WorkResponse } from '../api/workListApi';
import { CreateWorkReq, useWorkListStore } from '../store/WorkListStore';
import { UpdateWorkReq, WorkData } from '../store/WorkListStore';


interface UseWorkListResult {
  isLoading: boolean;
  error: string | null;
  workList: WorkData[];
  getWorkList: (aui: string) => Promise<void>;
  updateWork: (aui: string, data: UpdateWorkReq) => Promise<void>;
  createWork: (aui: string, data: CreateWorkReq) => Promise<void>;
}

export const useWorkList = (): UseWorkListResult => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { workList, setWorkList } = useWorkListStore();


  const handleGetWorkSuccess = (response: WorkListResponse) => {
    const data = response.data;
    setWorkList(data);
  };

  const handleUpdateWorkRequest = (response: WorkResponse) => {
    const data = response.data;
    const newWorkList = workList.map((each) => each.id == data.id ? data : each);
    setWorkList(newWorkList);
  };

  const handleCreatWorkRequest = (response: WorkResponse) => {
    const data = response.data;
    setWorkList([...workList, data]);
  };

  const handleWorkRequest = async (
    aui: string,
    action: 'get' | 'update' | 'create',
    data?: UpdateWorkReq | CreateWorkReq
  ) => {
    setIsLoading(true);
    setError(null);
    try {
      switch (action) {
        case 'update':
          handleUpdateWorkRequest(await updateWork(aui, data as UpdateWorkReq));
          break;
        case 'create':
          handleCreatWorkRequest(await createWork(aui, data as CreateWorkReq));
          break;
        case 'get':
        default:
          handleGetWorkSuccess(await getWorkList(aui));
          break;
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unexpected error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  const getWorkHandler = (aui: string) => handleWorkRequest(aui, 'get');
  const updateWorkHandler = (aui: string, data: UpdateWorkReq) => handleWorkRequest(aui, 'update', data);
  const createWorkHandler = (aui: string, data: CreateWorkReq) => handleWorkRequest(aui, 'create', data);


  return {
    isLoading,
    error,
    workList,
    getWorkList: getWorkHandler,
    updateWork: updateWorkHandler,
    createWork: createWorkHandler,
  };
};