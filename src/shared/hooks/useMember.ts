import { useState } from 'react';
import { checkAui, MemberResponse } from '../api/memberApi';


interface UseMemberResult {
  isLoading: boolean;
  error: string | null;
  checkAui: (aui: string) => Promise<void>;
  result: boolean;
}

export const useMember = (): UseMemberResult => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState(false);

  const handleMemberSuccess = (response: MemberResponse) => {
    const data = response.data;
    if (data === "ok") setResult(true);
  };

  const handleMemberRequest = async <T extends string>(
    memberFunction: (data: T) => Promise<MemberResponse>,
    data: T
  ) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await memberFunction(data);
      handleMemberSuccess(response);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unexpected error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  const checkAuiHandler = (aui: string) => handleMemberRequest(checkAui, aui);


  return {
    isLoading,
    error,
    checkAui: checkAuiHandler,
    result
  };
}

export const extractUsernameFromAui = (aui: string): string => {
  return aui.split("-")[0];
}