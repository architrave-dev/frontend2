import { useWorkPropertyVisibleStore } from '../../store/workPropertyVisibleStore';
import { getWorkPropertyVisible, updateWorkPropertyVisible } from '../../api/workPropertyVisibleApi';
import { useGlobalErrStore } from '../../store/errorStore';
import { convertStringToErrorCode } from '../../api/errorCode';
import { WorkPropertyVisibleData } from '../../dto/EntityRepository';
import { WorkPropertyVisibleResponse } from '../../dto/ResDtoRepository';
import { UpdateWorkPropertyVisibleReq } from '../../dto/ReqDtoRepository';
import { useLoadingStore } from '../../store/loadingStore';


interface UseWorkPropertyVisibleResult {
  workPropertyVisible: WorkPropertyVisibleData | null;
  getWorkPropertyVisible: (aui: string) => Promise<void>;
  updateWorkPropertyVisible: (aui: string, data: UpdateWorkPropertyVisibleReq) => Promise<void>;
}

export const useWorkPropertyVisible = (): UseWorkPropertyVisibleResult => {
  const { setIsLoading } = useLoadingStore();
  const { setManagedErr, clearErr } = useGlobalErrStore();
  const { workPropertyVisible, setWorkPropertyVisible } = useWorkPropertyVisibleStore();

  const handleSuccess = (response: WorkPropertyVisibleResponse) => {
    const workPropertyVisible = response.data;
    setWorkPropertyVisible(workPropertyVisible);
  };

  const handleWorkPropertyVisibleRequest = async (
    aui: string,
    action: 'get' | 'update',
    data?: UpdateWorkPropertyVisibleReq
  ) => {
    setIsLoading(true);
    clearErr();
    try {
      if (!data) {
        const response = await getWorkPropertyVisible(aui);
        handleSuccess(response);
      } else {
        const response = await updateWorkPropertyVisible(aui, data);
        handleSuccess(response);
      }
    } catch (err) {
      const errCode = err instanceof Error ? err.message : 'An unexpected error occurred';
      const convertedErrCode = convertStringToErrorCode(errCode);
      setManagedErr({
        errCode: convertedErrCode,
        retryFunction: () => handleWorkPropertyVisibleRequest(aui, action, data)
      });
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const getWorkPropertyVisibleHandler = (aui: string) => handleWorkPropertyVisibleRequest(aui, 'get');
  const updateWorkPropertyVisibleHandler = (aui: string, data: UpdateWorkPropertyVisibleReq) => handleWorkPropertyVisibleRequest(aui, 'update', data);

  return {
    workPropertyVisible,
    getWorkPropertyVisible: getWorkPropertyVisibleHandler,
    updateWorkPropertyVisible: updateWorkPropertyVisibleHandler
  };
}