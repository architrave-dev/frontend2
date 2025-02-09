import { createCareer, deleteCareer, getCareerList, updateCareer } from '../../api/careerApi';
import { useCareerListStore } from '../../store/careerStore';
import { CareerData } from '../../dto/EntityRepository';
import { CreateCareerReq, RemoveCareerReq, UpdateCareerReq } from '../../dto/ReqDtoRepository';
import { CareerListResponse, CareerResponse } from '../../dto/ResDtoRepository';
import { useTempAlertStore } from '../../store/portal/tempAlertStore';
import { useApiWrapper } from './apiWrapper';


interface UseCareerResult {
  careerList: CareerData[];
  getCareerList: (aui: string) => Promise<void>;
  createCareer: (aui: string, data: CreateCareerReq) => Promise<void>;
  updateCareer: (aui: string, data: UpdateCareerReq) => Promise<void>;
  deleteCareer: (aui: string, data: RemoveCareerReq) => Promise<void>;
}

export const useCareer = (): UseCareerResult => {
  const { careers, setCareers, setOnlyCareers } = useCareerListStore();
  const { setUpdatedTempAlert, setDeletedTempAlert } = useTempAlertStore();
  const withApiHandler = useApiWrapper();

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
    setUpdatedTempAlert();
  };
  const handleDeleteCareerSuccess = (response: CareerResponse) => {
    console.log("deleted well");
    setDeletedTempAlert();
  };

  const handleCareerRequest = async (
    aui: string,
    action: 'get' | 'create' | 'update' | 'delete',
    data?: CreateCareerReq | UpdateCareerReq | RemoveCareerReq
  ) => {
    const apiFunction = async () => {
      switch (action) {
        case 'create':
          return handleCreateCareerSuccess(await createCareer(aui, data as CreateCareerReq));
        case 'update':
          return handleUpdateCareerSuccess(await updateCareer(aui, data as UpdateCareerReq));
        case 'delete':
          return handleDeleteCareerSuccess(await deleteCareer(aui, data as RemoveCareerReq));
        case 'get':
        default:
          return handleGetCareerListSuccess(await getCareerList(aui));
      }
    };

    await withApiHandler(apiFunction, [aui, action, data]);
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