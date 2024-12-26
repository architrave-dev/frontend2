import { create } from 'zustand';
import { WorkDetailSimpleData, WorkSimpleData } from '../dto/EntityRepository';

interface WorkStationState {
  simpleList: { simpleWork: WorkSimpleData, simpleWorkDetail: WorkDetailSimpleData[] }[];
  setSimpleWorkList: (simpleWorkList: WorkSimpleData[]) => void;
  setSimpleWorkDetailList: (workId: string, simpleWorkDetail: WorkDetailSimpleData[]) => void;
  clearSimpleList: () => void;
}

export const useWorkStationStore = create<WorkStationState>((set) => ({
  simpleList: [],
  setSimpleWorkList: (simpleWorkList) => {
    set(() => ({
      simpleList: simpleWorkList.map((work) => ({
        simpleWork: work,
        simpleWorkDetail: [],
      })),
    }));
  },
  setSimpleWorkDetailList: (workId, simpleWorkDetail) => {
    set((state) => ({
      simpleList: state.simpleList.map((item) =>
        item.simpleWork.id === workId
          ? { ...item, simpleWorkDetail }
          : item
      ),
    }));
  },
  clearSimpleList: () => {
    set(() => ({
      simpleList: [],
    }));
  },
}));