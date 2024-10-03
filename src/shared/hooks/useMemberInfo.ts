import { useState } from 'react';
import { MemberInfoResponse, getMemberInfo, updateMemberInfo } from '../api/memberInfoApi';
import { MemberInfoData, useMemberInfoStore } from '../store/memberInfoStore';


interface UseMemberInfoResult {
  isLoading: boolean;
  error: string | null;
  memberInfo: MemberInfoData | null;
  getMemberInfo: (aui: string) => Promise<void>;
  updateMemberInfo: (aui: string, data: MemberInfoData) => Promise<void>;
}

export const useMemberInfo = (): UseMemberInfoResult => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { memberInfo, setMemberInfo } = useMemberInfoStore();


  const handleMemberInfoSuccess = (response: MemberInfoResponse) => {
    const MemberInfoData = response.data;
    setMemberInfo(MemberInfoData);
  };

  const handleMemberInfoRequest = async (
    aui: string,
    data?: MemberInfoData
  ) => {
    setIsLoading(true);
    setError(null);
    try {
      if (!data) {
        const response = await getMemberInfo(aui);
        handleMemberInfoSuccess(response);
      } else {
        const response = await updateMemberInfo(aui, data);
        handleMemberInfoSuccess(response);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unexpected error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  const getMemberInfoHandler = (aui: string) => handleMemberInfoRequest(aui);
  const updateMemberInfoHandler = (aui: string, data: MemberInfoData) => handleMemberInfoRequest(aui, data);


  return {
    isLoading,
    error,
    memberInfo,
    getMemberInfo: getMemberInfoHandler,
    updateMemberInfo: updateMemberInfoHandler,
  };
};