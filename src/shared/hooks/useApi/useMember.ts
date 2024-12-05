import { useState } from 'react';
import { checkAui } from '../../api/memberApi';
import { MemberResponse } from '../../dto/ResDtoRepository';
import { useGlobalErrStore } from '../../store/errorStore';
import { convertStringToErrorCode } from '../../api/errorCode';


interface UseMemberResult {
  isLoading: boolean;
  checkAui: (aui: string) => Promise<void>;
  result: boolean;
}

export const useMember = (): UseMemberResult => {
  const [isLoading, setIsLoading] = useState(false);
  const { setManagedErr, clearErr } = useGlobalErrStore();
  const [result, setResult] = useState(false);

  const handleMemberSuccess = (response: MemberResponse) => {
    const data = response.data;
    if (data === "ok") setResult(true);
  };

  const handleMemberRequest = async (
    action: 'get',
    data?: string
  ) => {
    setIsLoading(true);
    clearErr();
    try {
      switch (action) {
        case 'get':
        default:
          handleMemberSuccess(await checkAui(data as string));
          break;
      }
    } catch (err) {
      const errCode = err instanceof Error ? err.message : 'An unexpected error occurred';
      const convertedErrCode = convertStringToErrorCode(errCode);
      setManagedErr({
        errCode: convertedErrCode,
        retryFunction: () => handleMemberRequest(action, data)
      });
    } finally {
      setIsLoading(false);
    }
  };

  const checkAuiHandler = (aui: string) => handleMemberRequest('get', aui);


  return {
    isLoading,
    checkAui: checkAuiHandler,
    result
  };
}