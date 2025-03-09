import { useLoadingStore } from '../../store/loadingStore';
import { useGlobalErrStore } from '../../store/errorStore';
import { convertStringToErrorCode } from '../../api/errorCode';

type ApiFunction<T> = (...args: any[]) => Promise<T>;

interface RetryOptions {
  maxRetries?: number;
  retryableErrorCodes?: string[];
  backoffMs?: number;
}

export const useApiWrapper = () => {
  const { setIsLoading } = useLoadingStore();
  const { setManagedErr, clearErr } = useGlobalErrStore();

  return async function withApiHandler<T>(
    apiFunction: ApiFunction<T>,
    params: any[],
    options: RetryOptions = {}
  ): Promise<T | undefined> {
    const {
      maxRetries = 3,
      retryableErrorCodes = ['NETWORK', 'TIMEOUT', 'SERVER'],
      backoffMs = 300
    } = options;

    let currentAttempt = 0;

    const executeWithRetry = async (): Promise<T | undefined> => {
      currentAttempt++;
      setIsLoading(true);
      clearErr();

      try {
        return await apiFunction(...params);
      } catch (err) {
        const rawErrorMessage = err instanceof Error ? err.message : 'An unexpected error occurred';

        let errorCode = 'WEF';
        let errorMessage = rawErrorMessage;

        if (rawErrorMessage.includes('::')) {
          [errorCode, errorMessage] = rawErrorMessage.split('::').map(str => str.trim());
        }

        const convertedErrCode = convertStringToErrorCode(errorCode);
        const canRetry = currentAttempt < maxRetries && retryableErrorCodes.includes(convertedErrCode);

        setManagedErr({
          errCode: convertedErrCode,
          value: errorMessage,
          retryFunction: canRetry ? async () => {
            const delay = backoffMs * Math.pow(2, currentAttempt - 1);
            await new Promise(resolve => setTimeout(resolve, delay));
            await executeWithRetry();
            return;
          } : undefined
        });

        return undefined;
      } finally {
        setIsLoading(false);
      }
    };

    return executeWithRetry();
  };
};