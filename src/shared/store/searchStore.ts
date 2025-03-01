import { create } from 'zustand';
import { MemberSearchData } from '../dto/EntityRepository';

interface SearchState {
  searchList: MemberSearchData[];
  setSearchList: (value: MemberSearchData[]) => void;
}

export const useSearchStore = create<SearchState>((set) => ({
  searchList: [],
  setSearchList: (searchList) => set({ searchList }),
}));