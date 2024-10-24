import { create } from 'zustand';
import { WorkData } from '../dto/EntityRepository';
import { SortOrder } from '../enum/EnumRepository';


interface WorkListState {
  sortBy: SortOrder;
  setSortBy: (sortBy: SortOrder) => void;
  workList: WorkData[];
  setWorkList: (workList: WorkData[]) => void;
}

export const useWorkListStore = create<WorkListState>((set) => ({
  sortBy: SortOrder.TITLE_ASC,
  setSortBy: (sortBy) => set({ sortBy }),
  workList: [],
  setWorkList: (workList) => set({ workList }),
}));