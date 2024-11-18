import { create } from 'zustand';
import { WorkDetailData } from '../dto/EntityRepository';


interface WorkDetailState {
  workDetailList: WorkDetailData[];
  setWorkDetailList: (workDetailList: WorkDetailData[]) => void;
}

export const useWorkDetailStore = create<WorkDetailState>((set) => ({
  workDetailList: [],
  setWorkDetailList: (workDetailList) => set({ workDetailList }),
}));