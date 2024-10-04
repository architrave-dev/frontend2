import { useState } from 'react';
import { CareerListResponse, UpdatedCareerListReq, getCareerList, updateCareerList } from '../api/careerApi';
import { CareerData, useCareerListStore, useCareerListStoreForUpdate } from '../store/careerStore';


interface UseCareerResult {
  isLoading: boolean;
  error: string | null;
  careerList: CareerData[];
  getCareerList: (aui: string) => Promise<void>;
  updateCareerList: (aui: string, data: UpdatedCareerListReq) => Promise<void>;
}

export const useCareer = (): UseCareerResult => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { careers, setCareers } = useCareerListStore();
  const { clearAll } = useCareerListStoreForUpdate();


  const handleCareerSuccess = (response: CareerListResponse) => {
    const careerListData = response.data;
    setCareers(careerListData);
    clearAll();
  };

  const handleCareerRequest = async (
    aui: string,
    data?: UpdatedCareerListReq
  ) => {
    setIsLoading(true);
    setError(null);
    try {
      if (data) {
        const response = await updateCareerList(aui, data);
        handleCareerSuccess(response);
      } else {
        const response = await getCareerList(aui);
        handleCareerSuccess(response);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unexpected error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  const getCareerHandler = (aui: string) => handleCareerRequest(aui);
  const updateCareerHandler = (aui: string, data: UpdatedCareerListReq) => handleCareerRequest(aui, data);


  return {
    isLoading,
    error,
    careerList: careers,
    getCareerList: getCareerHandler,
    updateCareerList: updateCareerHandler,
  };
};