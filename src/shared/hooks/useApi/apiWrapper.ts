import { useLoadingStore } from '../../store/loadingStore';
import { useGlobalErrStore } from '../../store/errorStore';
import { convertStringToErrorCode } from '../../api/errorCode';
import { isNetworkError } from '../../util/isNetworkError';

type ApiFunction<T> = (...args: any[]) => Promise<T>;

export const useApiWrapper = () => {
  const { setIsLoading } = useLoadingStore();
  const { setManagedErr, clearErr } = useGlobalErrStore();

  return async function withApiHandler<T>(
    apiFunction: ApiFunction<T>,
    retryParams: any[]
  ): Promise<T> {
    setIsLoading(true);
    clearErr();

    try {
      return await apiFunction(...retryParams);
    } catch (err) {
      if (isNetworkError(err)) {
        throw err;
      }
      const errCode = err instanceof Error ? err.message : 'An unexpected error occurred';
      const convertedErrCode = convertStringToErrorCode(errCode);
      setManagedErr({
        errCode: convertedErrCode,
        retryFunction: async () => {
          await withApiHandler(apiFunction, retryParams);
        }
      });
      throw err;
    } finally {
      setIsLoading(false);
    }
  };
};