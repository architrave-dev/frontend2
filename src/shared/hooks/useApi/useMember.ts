import { useState } from 'react';
import { checkAui, searchMember, updateMember } from '../../api/memberApi';
import { MemberResponse, MemberSimpleResponse, SearchResponse } from '../../dto/ResDtoRepository';
import { useApiWrapper } from './apiWrapper';
import { useSearchStore } from '../../store/searchStore';
import { MemberSearchData, UserData } from '../../dto/EntityRepository';
import { UpdateMemberReq } from '../../dto/ReqDtoRepository';
import { useAui } from '../useAui';
import { useAuthStore } from '../../store/authStore';
import { useTempAlertStore } from '../../store/portal/tempAlertStore';

interface UseMemberResult {
  checkAui: (aui: string) => Promise<void>;
  result: boolean;
  search: (username: string) => Promise<void>;
  searchList: MemberSearchData[];
  updateMember: (aui: string, data: UpdateMemberReq) => Promise<void>;
}

export const useMember = (): UseMemberResult => {
  const { aui } = useAui();
  const { user, setUser } = useAuthStore();
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

  const handleMemberRequest = async (
    action: 'get' | 'search' | 'update',
    data?: string | UpdateMemberReq
  ) => {
    const apiFunction = async () => {
      switch (action) {
        case 'search':
          return handleSearchSuccess(await searchMember(data as string));
        case 'update':
          return handleUpdateMemberSuccess(await updateMember(aui, data as UpdateMemberReq));
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

  return {
    checkAui: checkAuiHandler,
    result,
    search: searchMemberHandler,
    searchList,
    updateMember: updateMemberHandler,
  };
}