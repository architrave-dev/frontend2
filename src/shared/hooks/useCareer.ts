import { useState } from 'react';
import { CareerListResponse, UpdatedCareerListReq, getCareerList, updateCareerList } from '../api/careerApi';
import { CareerData, useCareerListStore, useCareerListStoreForUpdate } from '../store/careerStore';
import { useGlobalErrStore } from '../store/errorStore';
import { convertStringToErrorCode } from '../api/errorCode';


interface UseCareerResult {
  isLoading: boolean;
  careerList: CareerData[];
  getCareerList: (aui: string) => Promise<void>;
  updateCareerList: (aui: string, data: UpdatedCareerListReq) => Promise<void>;
}

export const useCareer = (): UseCareerResult => {
  const [isLoading, setIsLoading] = useState(false);
  const { setManagedErr, clearErr } = useGlobalErrStore();
  const { careers, setCareers } = useCareerListStore();
  const { clearAll } = useCareerListStoreForUpdate();


  const handleCareerSuccess = (response: CareerListResponse) => {
    const careerListData = response.data;
    setCareers(careerListData);
    clearAll();
  };

  const handleCareerRequest = async (
    aui: string,
    action: 'get' | 'update',
    data?: UpdatedCareerListReq
  ) => {
    setIsLoading(true);
    clearErr();
    try {
      if (data) {
        const response = await updateCareerList(aui, data);
        handleCareerSuccess(response);
      } else {
        const response = await getCareerList(aui);
        handleCareerSuccess(response);
      }
    } catch (err) {
      const errCode = err instanceof Error ? err.message : 'An unexpected error occurred';
      const convertedErrCode = convertStringToErrorCode(errCode);
      setManagedErr({
        errCode: convertedErrCode,
        retryFunction: () => handleCareerRequest(aui, action, data)
      });
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const getCareerHandler = (aui: string) => handleCareerRequest(aui, 'get');
  const updateCareerHandler = (aui: string, data: UpdatedCareerListReq) => handleCareerRequest(aui, 'update', data);


  return {
    isLoading,
    careerList: careers,
    getCareerList: getCareerHandler,
    updateCareerList: updateCareerHandler,
  };
};