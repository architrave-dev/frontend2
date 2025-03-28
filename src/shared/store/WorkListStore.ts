import { create } from 'zustand';
import { WorkData } from '../dto/EntityRepository';
import { SortOrder } from '../enum/EnumRepository';


interface WorkListState {
  sortBy: SortOrder;
  setSortBy: (sortBy: SortOrder) => void;
  workList: WorkData[];
  setWorkList: (workList: WorkData[]) => void;
  addWork: (work: WorkData, pageSize: number) => void;
}

export const useWorkListStore = create<WorkListState>((set, get) => ({
  sortBy: SortOrder.TITLE_ASC,
  setSortBy: (sortBy) => set({ sortBy }),
  workList: [],
  setWorkList: (workList) => set({ workList }),
  addWork: (work, pageSize) => {
    const currentList = get().workList;
    const newList = [work, ...currentList].slice(0, pageSize);
    set({ workList: newList });
  },
}));