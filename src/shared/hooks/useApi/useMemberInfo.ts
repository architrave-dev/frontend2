import { getMemberInfo, updateMemberInfo } from '../../api/memberInfoApi';
import { useMemberInfoStore } from '../../store/memberInfoStore';
import { MemberInfoData } from '../../dto/EntityRepository';
import { MemberInfoResponse } from '../../dto/ResDtoRepository';
import { UpdateMemberInfoReq } from '../../dto/ReqDtoRepository';
import { useTempAlertStore } from '../../store/portal/tempAlertStore';
import { useApiWrapper } from './apiWrapper';


interface UseMemberInfoResult {
  memberInfo: MemberInfoData | null;
  getMemberInfo: (aui: string) => Promise<void>;
  updateMemberInfo: (aui: string, data: UpdateMemberInfoReq) => Promise<void>;
}

export const useMemberInfo = (): UseMemberInfoResult => {
  const { memberInfo, setMemberInfo } = useMemberInfoStore();
  const { setUpdatedTempAlert } = useTempAlertStore();
  const withApiHandler = useApiWrapper();


  const handleMemberInfoSuccess = (response: MemberInfoResponse) => {
    const memberInfoData = response.data;
    setMemberInfo(memberInfoData);
  };

  const handleUpdateMemberInfoSuccess = (response: MemberInfoResponse) => {
    const memberInfoData = response.data;
    setMemberInfo(memberInfoData);
    setUpdatedTempAlert();
  };

  const handleMemberInfoRequest = async (
    aui: string,
    action: 'get' | 'update',
    data?: UpdateMemberInfoReq
  ) => {
    const apiFunction = async () => {
      switch (action) {
        case 'update':
          return handleUpdateMemberInfoSuccess(await updateMemberInfo(aui, data as UpdateMemberInfoReq));
        case 'get':
          return handleMemberInfoSuccess(await getMemberInfo(aui));
      }
    };

    await withApiHandler(apiFunction, [aui, action, data]);
  };


  const getMemberInfoHandler = (aui: string) => handleMemberInfoRequest(aui, 'get');
  const updateMemberInfoHandler = (aui: string, data: UpdateMemberInfoReq) => handleMemberInfoRequest(aui, 'update', data);


  return {
    memberInfo,
    getMemberInfo: getMemberInfoHandler,
    updateMemberInfo: updateMemberInfoHandler,
  };
};