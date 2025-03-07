import { createCareer, deleteCareer, getCareerList, reorderCareer, updateCareer } from '../../api/careerApi';
import { useCareerListStore } from '../../store/careerStore';
import { CareerData } from '../../dto/EntityRepository';
import { CreateCareerReq, RemoveCareerReq, UpdateCareerReq, UpdateReorderListReq } from '../../dto/ReqDtoRepository';
import { CareerListResponse, CareerResponse } from '../../dto/ResDtoRepository';
import { useTempAlertStore } from '../../store/portal/tempAlertStore';
import { useApiWrapper } from './apiWrapper';


interface UseCareerResult {
  careerList: CareerData[];
  getCareerList: (aui: string) => Promise<void>;
  createCareer: (aui: string, data: CreateCareerReq) => Promise<void>;
  updateCareer: (aui: string, data: UpdateCareerReq) => Promise<void>;
  deleteCareer: (aui: string, data: RemoveCareerReq) => Promise<void>;
  reorderCareer: (aui: string, data: UpdateReorderListReq) => Promise<void>;
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
  const handleReorderCareerSuccess = (response: CareerListResponse) => {
    const careerListData = response.data;
    setCareers(careerListData);
  };

  const handleCareerRequest = async (
    aui: string,
    action: 'get' | 'create' | 'update' | 'delete' | 'reorder',
    data?: CreateCareerReq | UpdateCareerReq | RemoveCareerReq | UpdateReorderListReq
  ) => {
    const apiFunction = async () => {
      switch (action) {
        case 'create':
          return handleCreateCareerSuccess(await createCareer(aui, data as CreateCareerReq));
        case 'update':
          return handleUpdateCareerSuccess(await updateCareer(aui, data as UpdateCareerReq));
        case 'delete':
          return handleDeleteCareerSuccess(await deleteCareer(aui, data as RemoveCareerReq));
        case 'reorder':
          return handleReorderCareerSuccess(await reorderCareer(aui, data as UpdateReorderListReq));
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
  const reorderCareerHandler = (aui: string, data: UpdateReorderListReq) => handleCareerRequest(aui, 'reorder', data);

  return {
    careerList: careers,
    getCareerList: getCareerHandler,
    createCareer: createCareerHandler,
    updateCareer: updateCareerHandler,
    deleteCareer: deleteCareerHandler,
    reorderCareer: reorderCareerHandler,
  };
};