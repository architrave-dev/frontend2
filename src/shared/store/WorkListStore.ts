import { create } from 'zustand';
import { WorkData } from '../dto/EntityRepository';


interface WorkListState {
  workList: WorkData[];
  setWorkList: (workList: WorkData[]) => void;
}

export const useWorkListStore = create<WorkListState>((set) => ({
  workList: [],
  setWorkList: (workList) => set({ workList }),
}));