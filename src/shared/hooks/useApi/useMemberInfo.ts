import { getMemberInfo, updateMemberInfo } from '../../api/memberInfoApi';
import { useMemberInfoStore, useMemberInfoStoreForUpdate } from '../../store/memberInfoStore';
import { useGlobalErrStore } from '../../store/errorStore';
import { convertStringToErrorCode } from '../../api/errorCode';
import { MemberInfoData } from '../../dto/EntityRepository';
import { MemberInfoResponse } from '../../dto/ResDtoRepository';
import { UpdateMemberInfoReq } from '../../dto/ReqDtoRepository';
import { useLoadingStore } from '../../store/loadingStore';


interface UseMemberInfoResult {
  memberInfo: MemberInfoData | null;
  getMemberInfo: (aui: string) => Promise<void>;
  updateMemberInfo: (aui: string, data: UpdateMemberInfoReq) => Promise<void>;
}

export const useMemberInfo = (): UseMemberInfoResult => {
  const { setIsLoading } = useLoadingStore();
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
    data?: UpdateMemberInfoReq
  ) => {
    setIsLoading(true);
    clearErr();
    try {
      if (!data) {
        const response = await getMemberInfo(aui);
        handleMemberInfoSuccess(response);
      } else {
        const response = await updateMemberInfo(aui, data as UpdateMemberInfoReq);
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
  const updateMemberInfoHandler = (aui: string, data: UpdateMemberInfoReq) => handleMemberInfoRequest(aui, 'update', data);


  return {
    memberInfo,
    getMemberInfo: getMemberInfoHandler,
    updateMemberInfo: updateMemberInfoHandler,
  };
};