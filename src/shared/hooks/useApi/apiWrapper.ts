import { useLoadingStore } from '../../store/loadingStore';
import { useGlobalErrStore } from '../../store/errorStore';
import { convertStringToErrorCode } from '../../api/errorCode';

type ApiFunction<T> = (...args: any[]) => Promise<T>;

export const useApiWrapper = () => {
  const { setIsLoading } = useLoadingStore();
  const { setManagedErr, clearErr } = useGlobalErrStore();

  return async function withApiHandler<T>(
    apiFunction: ApiFunction<T>,
    retryParams: any[]
  ) {
    setIsLoading(true);
    clearErr();

    try {
      return await apiFunction(...retryParams);
    } catch (err) {
      const errCode = err instanceof Error ? err.message : 'An unexpected error occurred';
      const convertedErrCode = convertStringToErrorCode(errCode);
      setManagedErr({
        errCode: convertedErrCode,
        retryFunction: async () => {
          await withApiHandler(apiFunction, retryParams);
        }
      });
    } finally {
      setIsLoading(false);
    }
  };
};