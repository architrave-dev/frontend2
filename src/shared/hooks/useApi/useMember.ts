import { useState } from 'react';
import { checkAui, searchMember, updateMember, updatePassword } from '../../api/memberApi';
import { MemberResponse, MemberSimpleResponse, SearchResponse } from '../../dto/ResDtoRepository';
import { useApiWrapper } from './apiWrapper';
import { useSearchStore } from '../../store/searchStore';
import { MemberSearchData, UserData } from '../../dto/EntityRepository';
import { UpdateMemberReq, UpdatePasswordReq } from '../../dto/ReqDtoRepository';
import { useAui } from '../useAui';
import { useAuthStore } from '../../store/authStore';
import { useTempAlertStore } from '../../store/portal/tempAlertStore';
import { useModalStore } from '../../store/portal/modalStore';

interface UseMemberResult {
  checkAui: (aui: string) => Promise<void>;
  result: boolean;
  search: (username: string) => Promise<void>;
  searchList: MemberSearchData[];
  updateMember: (aui: string, data: UpdateMemberReq) => Promise<void>;
  updatePassword: (aui: string, data: UpdatePasswordReq) => Promise<void>;
}

export const useMember = (): UseMemberResult => {
  const { aui } = useAui();
  const { user, setUser } = useAuthStore();
  const { clearModal } = useModalStore();
  const { searchList, setSearchList } = useSearchStore();
  const { setUpdatedTempAlert } = useTempAlertStore();
  const [result, setResult] = useState(false);
  const withApiHandler = useApiWrapper();

  const handleMemberSuccess = (response: MemberResponse) => {
    const data = response.data;
    if (data === "ok") setResult(true);
  };
  const handleSearchSuccess = (response: SearchResponse) => {
    const { memberSearchList } = response.data;
    setSearchList(memberSearchList);
  };
  const handleUpdateMemberSuccess = (response: MemberSimpleResponse) => {
    const data = response.data;
    const mergedUser: UserData = {
      ...user,
      ...data
    }
    setUser(mergedUser);
    setUpdatedTempAlert();
  };
  const handleUpdatePasswordSuccess = (response: MemberResponse) => {
    const data = response.data;
    console.log(data);
    clearModal();
    setUpdatedTempAlert();
  };

  const handleMemberRequest = async (
    action: 'get' | 'search' | 'update' | 'password',
    data?: string | UpdateMemberReq | UpdatePasswordReq
  ) => {
    const apiFunction = async () => {
      switch (action) {
        case 'search':
          return handleSearchSuccess(await searchMember(data as string));
        case 'update':
          return handleUpdateMemberSuccess(await updateMember(aui, data as UpdateMemberReq));
        case 'password':
          return handleUpdatePasswordSuccess(await updatePassword(aui, data as UpdatePasswordReq));
        case 'get':
        default:
          return handleMemberSuccess(await checkAui(data as string));
      }
    };

    await withApiHandler(apiFunction, [action, data]);
  };

  const checkAuiHandler = (aui: string) => handleMemberRequest('get', aui);
  const searchMemberHandler = (username: string) => handleMemberRequest('search', username);
  const updateMemberHandler = (aui: string, data: UpdateMemberReq) => handleMemberRequest('update', data);
  const updatePasswordHandler = (aui: string, data: UpdatePasswordReq) => handleMemberRequest('password', data);

  return {
    checkAui: checkAuiHandler,
    result,
    search: searchMemberHandler,
    searchList,
    updateMember: updateMemberHandler,
    updatePassword: updatePasswordHandler,
  };
}