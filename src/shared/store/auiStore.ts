import { create } from 'zustand';

interface AuiState {
  aui: string;
}

interface AuiActions {
  setAui: (value: string) => void;
}

type AuiStore = AuiState & AuiActions;

export const useAuiStore = create<AuiStore>((set) => ({
  aui: '',
  setAui: (value) => set({ aui: value }),
}));