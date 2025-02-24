// 글로벌 에러 처리를 위한 store
import { create } from 'zustand';
import { ErrorCode } from '../api/errorCode';

export interface ManagedErr {
  errCode: ErrorCode | null;
  value?: string;
  retryFunction?: () => Promise<void>;
}

interface globalErrState {
  managedErr: ManagedErr | null;
  setManagedErr: (errCode: ManagedErr) => void;
  clearErr: () => void;
}

export const useGlobalErrStore = create<globalErrState>((set) => ({
  managedErr: null,
  setManagedErr: (managedErr: ManagedErr) => set({ managedErr }),
  clearErr: () => set({ managedErr: null })
}));