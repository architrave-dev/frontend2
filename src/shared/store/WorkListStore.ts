import { create } from 'zustand';
import { WorkData, WorkSortData } from '../dto/EntityRepository';
import { SortDirection, SortOrder } from '../enum/EnumRepository';


interface WorkListState {
  sortData: WorkSortData;
  setSortData: (sortData: WorkSortData) => void;
  workList: WorkData[];
  setWorkList: (workList: WorkData[]) => void;
  addWork: (work: WorkData, pageSize: number) => void;
}

export const useWorkListStore = create<WorkListState>((set, get) => ({
  sortData: { sort: SortOrder.TITLE, direction: SortDirection.ASC },
  setSortData: (sortData) => set({ sortData }),
  workList: [],
  setWorkList: (workList) => set({ workList }),
  addWork: (work, pageSize) => {
    const currentList = get().workList;
    const newList = [work, ...currentList].slice(0, pageSize);
    set({ workList: newList });
  },
}));