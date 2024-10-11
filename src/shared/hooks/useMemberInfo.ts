import { useState } from 'react';
import { MemberInfoResponse, getMemberInfo, updateMemberInfo } from '../api/memberInfoApi';
import { MemberInfoData, useMemberInfoStore, useMemberInfoStoreForUpdate } from '../store/memberInfoStore';
import { useGlobalErrStore } from '../store/errorStore';
import { convertStringToErrorCode } from '../api/errorCode';


interface UseMemberInfoResult {
  isLoading: boolean;
  memberInfo: MemberInfoData | null;
  getMemberInfo: (aui: string) => Promise<void>;
  updateMemberInfo: (aui: string, data: MemberInfoData) => Promise<void>;
}

export const useMemberInfo = (): UseMemberInfoResult => {
  const [isLoading, setIsLoading] = useState(false);
  const { setManagedErr, clearErr } = useGlobalErrStore();
  const { memberInfo, setMemberInfo } = useMemberInfoStore();
  const { setUpdateMemberInfoDto } = useMemberInfoStoreForUpdate();


  const handleMemberInfoSuccess = (response: MemberInfoResponse) => {
    const memberInfoData = response.data;
    setMemberInfo(memberInfoData);
    setUpdateMemberInfoDto(memberInfoData);
  };

  const handleMemberInfoRequest = async (
    aui: string,
    action: 'get' | 'update',
    data?: MemberInfoData
  ) => {
    setIsLoading(true);
    clearErr();
    try {
      if (!data) {
        const response = await getMemberInfo(aui);
        handleMemberInfoSuccess(response);
      } else {
        const response = await updateMemberInfo(aui, data);
        handleMemberInfoSuccess(response);
      }
    } catch (err) {
      const errCode = err instanceof Error ? err.message : 'An unexpected error occurred';
      const convertedErrCode = convertStringToErrorCode(errCode);
      setManagedErr({
        errCode: convertedErrCode,
        retryFunction: () => handleMemberInfoRequest(aui, action, data)
      });
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const getMemberInfoHandler = (aui: string) => handleMemberInfoRequest(aui, 'get');
  const updateMemberInfoHandler = (aui: string, data: MemberInfoData) => handleMemberInfoRequest(aui, 'update', data);


  return {
    isLoading,
    memberInfo,
    getMemberInfo: getMemberInfoHandler,
    updateMemberInfo: updateMemberInfoHandler,
  };
};