import { create } from 'zustand';
import { WorkSimpleData } from '../dto/EntityRepository';

interface WorkStationState {
  simpleWorkList: WorkSimpleData[];
  setSimpleWorkList: (simpleWorkList: WorkSimpleData[]) => void;
}

export const useWorkStationStore = create<WorkStationState>((set) => ({
  simpleWorkList: [],
  setSimpleWorkList: (simpleWorkList) => set({ simpleWorkList }),
}));
