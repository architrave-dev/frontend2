import { createCareer, deleteCareer, getCareerList, updateCareer } from '../../api/careerApi';
import { useCareerListStore } from '../../store/careerStore';
import { useGlobalErrStore } from '../../store/errorStore';
import { convertStringToErrorCode } from '../../api/errorCode';
import { CareerData } from '../../dto/EntityRepository';
import { CreateCareerReq, RemoveCareerReq, UpdateCareerReq } from '../../dto/ReqDtoRepository';
import { CareerListResponse, CareerResponse } from '../../dto/ResDtoRepository';
import { useLoadingStore } from '../../store/loadingStore';


interface UseCareerResult {
  careerList: CareerData[];
  getCareerList: (aui: string) => Promise<void>;
  createCareer: (aui: string, data: CreateCareerReq) => Promise<void>;
  updateCareer: (aui: string, data: UpdateCareerReq) => Promise<void>;
  deleteCareer: (aui: string, data: RemoveCareerReq) => Promise<void>;
}

export const useCareer = (): UseCareerResult => {
  const { setIsLoading } = useLoadingStore();
  const { setManagedErr, clearErr } = useGlobalErrStore();
  const { careers, setCareers, setOnlyCareers } = useCareerListStore();


  const handleGetCareerListSuccess = (response: CareerListResponse) => {
    const careerListData = response.data;
    setCareers(careerListData);
  };
  const handleCreateCareerSuccess = (response: CareerResponse) => {
    const careerData = response.data;
    setCareers([...careers, careerData]);
  };
  const handleUpdateCareerSuccess = (response: CareerResponse) => {
    const updatedCareerData = response.data;
    const careerListData = careers.map((c) => c.id === updatedCareerData.id ? updatedCareerData : c);
    setOnlyCareers(careerListData);
  };
  const handleDeleteCareerSuccess = (response: CareerResponse) => {
    console.log("deleted well");
  };

  const handleCareerRequest = async (
    aui: string,
    action: 'get' | 'create' | 'update' | 'delete',
    data?: CreateCareerReq | UpdateCareerReq | RemoveCareerReq
  ) => {
    setIsLoading(true);
    clearErr();
    try {
      switch (action) {
        case 'create':
          handleCreateCareerSuccess(await createCareer(aui, data as CreateCareerReq));
          break;
        case 'update':
          handleUpdateCareerSuccess(await updateCareer(aui, data as UpdateCareerReq));
          break;
        case 'delete':
          handleDeleteCareerSuccess(await deleteCareer(aui, data as RemoveCareerReq));
          break;
        case 'get':
        default:
          handleGetCareerListSuccess(await getCareerList(aui));
          break;
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
  const createCareerHandler = (aui: string, data: CreateCareerReq) => handleCareerRequest(aui, 'create', data);
  const updateCareerHandler = (aui: string, data: UpdateCareerReq) => handleCareerRequest(aui, 'update', data);
  const deleteCareerHandler = (aui: string, data: RemoveCareerReq) => handleCareerRequest(aui, 'delete', data);


  return {
    careerList: careers,
    getCareerList: getCareerHandler,
    createCareer: createCareerHandler,
    updateCareer: updateCareerHandler,
    deleteCareer: deleteCareerHandler,
  };
};