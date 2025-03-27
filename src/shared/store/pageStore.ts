import { create } from 'zustand';
import { PageData } from '../dto/EntityRepository';

interface PageState {
  page: PageData;
  setPage: (value: PageData) => void;
}

export const usePageStore = create<PageState>((set) => ({
  page: {
    page: 1,
    size: 10,
    totalElements: 0,
    totalPages: 0,
  },
  setPage: (value) => set({ page: value }),
}));