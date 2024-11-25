import { create } from 'zustand';
import { WorkPropertyVisibleData } from '../dto/EntityRepository';

interface WorkPropertyVisibleState {
  workPropertyVisible: WorkPropertyVisibleData | null;
  setWorkPropertyVisible: (value: WorkPropertyVisibleData) => void;
}

export const useWorkPropertyVisibleStore = create<WorkPropertyVisibleState>((set) => ({
  workPropertyVisible: null,
  setWorkPropertyVisible: (value) => set({ workPropertyVisible: value }),
}));