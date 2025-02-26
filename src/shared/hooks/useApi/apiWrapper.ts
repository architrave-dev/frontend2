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
      const rawErrorMessage = err instanceof Error ? err.message : 'An unexpected error occurred';

      let errorCode = 'WEF';
      let errorMessage = rawErrorMessage;

      if (rawErrorMessage.includes('::')) {
        [errorCode, errorMessage] = rawErrorMessage.split('::').map(str => str.trim());
      }

      const convertedErrCode = convertStringToErrorCode(errorCode);

      setManagedErr({
        errCode: convertedErrCode,
        value: errorMessage,
        retryFunction: async () => {
          await withApiHandler(apiFunction, retryParams);
        }
      });
    } finally {
      setIsLoading(false);
    }
  };
};