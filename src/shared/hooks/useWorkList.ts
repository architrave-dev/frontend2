import { useState } from 'react';
import { WorkListResponse, getWorkList, updateWork } from '../api/workListApi';
import { useWorkListStore } from '../store/WorkListStore';
import { UpdateWorkReq, WorkData } from '../store/WorkListStore';


interface UseWorkListResult {
  isLoading: boolean;
  error: string | null;
  workList: WorkData[];
  getWorkList: (aui: string) => Promise<void>;
  updateWork: (aui: string, data: UpdateWorkReq) => Promise<void>;
}

export const useWorkList = (): UseWorkListResult => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { workList, setWorkList } = useWorkListStore();


  const handleWorkSuccess = (response: WorkListResponse) => {
    const workListData = response.data;
    setWorkList(workListData);
  };

  const handleworkRequest = async (
    aui: string,
    data?: UpdateWorkReq
  ) => {
    setIsLoading(true);
    setError(null);
    try {
      if (data) {
        const response = await updateWork(aui, data);
        handleWorkSuccess(response);
      } else {
        const response = await getWorkList(aui);
        handleWorkSuccess(response);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unexpected error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  const getworkHandler = (aui: string) => handleworkRequest(aui);
  const updateProjectDetailHandler = (aui: string, data: UpdateWorkReq) => handleworkRequest(aui, data);


  return {
    isLoading,
    error,
    workList,
    getWorkList: getworkHandler,
    updateWork: updateProjectDetailHandler,
  };
};