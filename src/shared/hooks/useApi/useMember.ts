import { useState } from 'react';
import { checkAui } from '../../api/memberApi';
import { MemberResponse } from '../../dto/ResDtoRepository';
import { useApiWrapper } from './apiWrapper';


interface UseMemberResult {
  checkAui: (aui: string) => Promise<void>;
  result: boolean;
}

export const useMember = (): UseMemberResult => {
  const withApiHandler = useApiWrapper();
  const [result, setResult] = useState(false);

  const handleMemberSuccess = (response: MemberResponse) => {
    const data = response.data;
    if (data === "ok") setResult(true);
  };

  const handleMemberRequest = async (
    action: 'get',
    data?: string
  ) => {
    const apiFunction = async () => {
      switch (action) {
        case 'get':
        default:
          return handleMemberSuccess(await checkAui(data as string));
      }
    };

    await withApiHandler(apiFunction, [action, data]);
  };

  const checkAuiHandler = (aui: string) => handleMemberRequest('get', aui);

  return {
    checkAui: checkAuiHandler,
    result
  };
}