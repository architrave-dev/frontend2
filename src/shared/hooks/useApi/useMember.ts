import { useState } from 'react';
import { checkAui, searchMember } from '../../api/memberApi';
import { MemberResponse, SearchResponse } from '../../dto/ResDtoRepository';
import { useApiWrapper } from './apiWrapper';
import { useSearchStore } from '../../store/searchStore';
import { MemberSearchData } from '../../dto/EntityRepository';

interface UseMemberResult {
  checkAui: (aui: string) => Promise<void>;
  result: boolean;
  search: (username: string) => Promise<void>;
  searchList: MemberSearchData[];
}

export const useMember = (): UseMemberResult => {
  const withApiHandler = useApiWrapper();
  const [result, setResult] = useState(false);
  const { searchList, setSearchList } = useSearchStore();

  const handleMemberSuccess = (response: MemberResponse) => {
    const data = response.data;
    if (data === "ok") setResult(true);
  };
  const handleSearchSuccess = (response: SearchResponse) => {
    const { memberSearchList } = response.data;
    setSearchList(memberSearchList);
  };

  const handleMemberRequest = async (
    action: 'get' | 'search',
    data?: string
  ) => {
    const apiFunction = async () => {
      switch (action) {
        case 'search':
          return handleSearchSuccess(await searchMember(data as string));
        case 'get':
        default:
          return handleMemberSuccess(await checkAui(data as string));
      }
    };

    await withApiHandler(apiFunction, [action, data]);
  };

  const checkAuiHandler = (aui: string) => handleMemberRequest('get', aui);
  const searchMemberHandler = (username: string) => handleMemberRequest('search', username);

  return {
    checkAui: checkAuiHandler,
    result,
    search: searchMemberHandler,
    searchList,
  };
}