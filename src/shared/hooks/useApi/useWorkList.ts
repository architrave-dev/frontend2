import { getWorkList, updateWork, createWork, deleteWork, getWork, getSimpleWorkList } from '../../api/workListApi';
import { useWorkListStore } from '../../store/WorkListStore';
import { useWorkViewStore } from '../../store/WorkViewStore';
import { WorkData } from '../../dto/EntityRepository';
import { CreateWorkReq, DeleteWorkReq, UpdateWorkReq, MetadataForQuery } from '../../dto/ReqDtoRepository';
import { DeleteResponse, WorkListResponse, WorkResponse, WorkSimpleListResponse, WorkWithDetailResponse } from '../../dto/ResDtoRepository';
import { useWorkStationStore } from '../../store/workStationStore';
import { useTempAlertStore } from '../../store/portal/tempAlertStore';
import { useApiWrapper } from './apiWrapper';
import { usePageStore } from '../../store/pageStore';


interface UseWorkListResult {
  workList: WorkData[];
  getWork: (workId: string) => Promise<void>;
  getWorkList: (aui: string, metaData: MetadataForQuery) => Promise<void>;
  getSimpleWorkList: (aui: string) => Promise<void>;
  updateWork: (aui: string, data: UpdateWorkReq) => Promise<void>;
  createWork: (aui: string, data: CreateWorkReq) => Promise<void>;
  deleteWork: (aui: string, data: DeleteWorkReq) => Promise<void>;
}

export const useWorkList = (): UseWorkListResult => {
  const { workList, setWorkList, addWork } = useWorkListStore();
  const { setSimpleWorkList } = useWorkStationStore();
  const { setActiveWork, setActiveWorkDetailList, afterDeleteActiveWork } = useWorkViewStore();
  const { setUpdatedTempAlert, setDeletedTempAlert } = useTempAlertStore();
  const { page, setPage } = usePageStore();
  const withApiHandler = useApiWrapper();

  const handleGetWorkSuccess = (response: WorkWithDetailResponse) => {
    const data = response.data;
    setActiveWork(data);
    setActiveWorkDetailList(data.workDetailList);
  };

  const handleGetSimpleWorkListSuccess = (response: WorkSimpleListResponse) => {
    const data = response.data;
    setSimpleWorkList(data);
  };

  const handleGetWorkListSuccess = (response: WorkListResponse) => {
    const data = response.data;
    setPage(data);
    setWorkList(data.content);
  };

  const handleUpdateWorkSuccess = (response: WorkResponse) => {
    const data = response.data;
    const newWorkList = workList.map((each) => each.id === data.id ? data : each);
    setUpdatedTempAlert();
    setActiveWork(data);
    setWorkList(newWorkList);
  };

  const handleDeleteWorkSuccess = (response: DeleteResponse) => {
    console.log("deleted well");
    afterDeleteActiveWork();
    setDeletedTempAlert();
  };

  const handleCreatWorkSuccess = (response: WorkResponse) => {
    const data = response.data;
    addWork(data, page.size);
    setActiveWork(data);
    setActiveWorkDetailList([]);
  };

  const handleWorkRequest = async (
    aui: string,
    action: 'get' | 'get list' | 'get simple list' | 'update' | 'create' | 'delete',
    data?: UpdateWorkReq | CreateWorkReq | DeleteWorkReq,
    metaData?: MetadataForQuery
  ) => {
    const apiFunction = async () => {
      switch (action) {
        case 'delete':
          handleDeleteWorkSuccess(await deleteWork(aui, data as DeleteWorkReq));
          getWorkListHandler(aui, { page: page.page, size: page.size });
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
          handleGetWorkListSuccess(await getWorkList(aui, metaData!));
          break;
        case 'get':
        default:
          handleGetWorkSuccess(await getWork(aui));
          break;
      }
    };

    await withApiHandler(apiFunction, [aui, action, data]);
  };


  const getWorkHandler = (workId: string) => handleWorkRequest(workId, 'get');
  const getWorkListHandler = (aui: string, metaData: MetadataForQuery) => handleWorkRequest(aui, 'get list', undefined, metaData);
  const getSimpleWorkListHandler = (aui: string) => handleWorkRequest(aui, 'get simple list');
  const updateWorkHandler = (aui: string, data: UpdateWorkReq) => handleWorkRequest(aui, 'update', data);
  const createWorkHandler = (aui: string, data: CreateWorkReq) => handleWorkRequest(aui, 'create', data);
  const deleteWorkHandler = (aui: string, data: DeleteWorkReq) => handleWorkRequest(aui, 'delete', data);


  return {
    workList,
    getWork: getWorkHandler,
    getWorkList: getWorkListHandler,
    getSimpleWorkList: getSimpleWorkListHandler,
    updateWork: updateWorkHandler,
    createWork: createWorkHandler,
    deleteWork: deleteWorkHandler,
  };
};

