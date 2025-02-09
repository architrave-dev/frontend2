import { useWorkPropertyVisibleStore } from '../../store/workPropertyVisibleStore';
import { getWorkPropertyVisible, updateWorkPropertyVisible } from '../../api/workPropertyVisibleApi';
import { WorkPropertyVisibleData } from '../../dto/EntityRepository';
import { WorkPropertyVisibleResponse } from '../../dto/ResDtoRepository';
import { UpdateWorkPropertyVisibleReq } from '../../dto/ReqDtoRepository';
import { useTempAlertStore } from '../../store/portal/tempAlertStore';
import { useApiWrapper } from './apiWrapper';

interface UseWorkPropertyVisibleResult {
  workPropertyVisible: WorkPropertyVisibleData | null;
  getWorkPropertyVisible: (aui: string) => Promise<void>;
  updateWorkPropertyVisible: (aui: string, data: UpdateWorkPropertyVisibleReq) => Promise<void>;
}

export const useWorkPropertyVisible = (): UseWorkPropertyVisibleResult => {
  const { workPropertyVisible, setWorkPropertyVisible } = useWorkPropertyVisibleStore();
  const { setUpdatedTempAlert } = useTempAlertStore();
  const withApiHandler = useApiWrapper();

  const handleSuccess = (response: WorkPropertyVisibleResponse) => {
    const workPropertyVisible = response.data;
    setWorkPropertyVisible(workPropertyVisible);
  };
  const handleUpdateSuccess = (response: WorkPropertyVisibleResponse) => {
    const workPropertyVisible = response.data;
    setWorkPropertyVisible(workPropertyVisible);
    setUpdatedTempAlert();
  };

  const handleWorkPropertyVisibleRequest = async (
    aui: string,
    action: 'get' | 'update',
    data?: UpdateWorkPropertyVisibleReq | string
  ) => {
    const apiFunction = async () => {
      switch (action) {
        case 'update':
          return handleUpdateSuccess(await updateWorkPropertyVisible(aui, data as UpdateWorkPropertyVisibleReq));
        case 'get':
        default:
          return handleSuccess(await getWorkPropertyVisible(aui));
      }
    };

    await withApiHandler(apiFunction, [aui, action, data]);
  };


  const getWorkPropertyVisibleHandler = (aui: string) => handleWorkPropertyVisibleRequest(aui, 'get');
  const updateWorkPropertyVisibleHandler = (aui: string, data: UpdateWorkPropertyVisibleReq) => handleWorkPropertyVisibleRequest(aui, 'update', data);

  return {
    workPropertyVisible,
    getWorkPropertyVisible: getWorkPropertyVisibleHandler,
    updateWorkPropertyVisible: updateWorkPropertyVisibleHandler
  };
}