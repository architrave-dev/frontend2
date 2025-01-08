import { getCareerList, updateCareerList } from '../../api/careerApi';
import { useCareerListStore, useCareerListStoreForUpdate } from '../../store/careerStore';
import { useGlobalErrStore } from '../../store/errorStore';
import { convertStringToErrorCode } from '../../api/errorCode';
import { CareerData } from '../../dto/EntityRepository';
import { UpdatedCareerListReq } from '../../dto/ReqDtoRepository';
import { CareerListResponse } from '../../dto/ResDtoRepository';
import { useLoadingStore } from '../../store/loadingStore';


interface UseCareerResult {
  careerList: CareerData[];
  getCareerList: (aui: string) => Promise<void>;
  updateCareerList: (aui: string, data: UpdatedCareerListReq) => Promise<void>;
}

export const useCareer = (): UseCareerResult => {
  const { setIsLoading } = useLoadingStore();
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
    careerList: careers,
    getCareerList: getCareerHandler,
    updateCareerList: updateCareerHandler,
  };
};